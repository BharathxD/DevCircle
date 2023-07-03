import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import {
  CreatePostValidator,
  UpdatePostValidator,
} from "@/lib/validators/post";
import updatePostCache from "@/helpers/updatePostCache";

/**
 * Handles the HTTP POST request for creating a new post.
 * @param req - The Next.js request object.
 * @returns The Next.js response object.
 */
const createPost = async (req: NextRequest) => {
  try {
    // Retrieve the current user
    const currentUser = await getCurrentUser();

    // Check if the user is authenticated
    if (!currentUser) {
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { title, content, forumId, tags } = CreatePostValidator.parse(body);

    if (content.blocks.length === 0) {
      return NextResponse.json(
        { message: "Post can't be empty" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check if the user is subscribed to the forum
    const subscription = await database.subscription.findFirst({
      where: {
        forumId,
        userId: currentUser.id,
      },
    });
    if (!subscription) {
      return NextResponse.json(
        { message: "You are not subscribed to this forum" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // Create the new post
    const post = await database.post.create({
      data: {
        forumId,
        authorId: currentUser.id,
        title,
        content,
        tags: {
          create: tags.map((name) => ({ name })),
        },
      },
    });

    return NextResponse.json(post, { status: StatusCodes.CREATED });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Handle validation errors
      return new Response(error.message, { status: StatusCodes.BAD_REQUEST });
    }
    // Handle other errors
    return NextResponse.json(
      { message: "Cannot create the post" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Handles the HTTP PATCH request for editing an existing post.
 * @param req - The Next.js request object.
 * @returns The Next.js response object.
 */
const editPost = async (req: NextRequest) => {
  try {
    // Retrieve the current user
    const currentUser = await getCurrentUser();

    // Check if the user is authenticated
    if (!currentUser) {
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { title, content, tags, postId } = UpdatePostValidator.parse(body);

    if (content.blocks.length === 0) {
      return NextResponse.json(
        { message: "Post can't be empty" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check if the user is authorized to update the post
    const postExists = await database.post.findFirst({
      where: {
        id: postId,
        authorId: currentUser.id,
      },
    });
    if (!postExists) {
      return NextResponse.json(
        { message: "You are not authorized to update this post" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // Delete all existing tags
    await database.tag.deleteMany({
      where: {
        postId: postId,
      },
    });

    // Update the post
    const post = await database.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        tags: {
          create: tags.map((name) => ({ name })),
        },
      },
      include: {
        votes: true,
        author: true,
        tags: true
      }
    });

    await updatePostCache(post);

    return NextResponse.json(post, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Handle validation errors
      return new Response(error.message, { status: StatusCodes.BAD_REQUEST });
    }
    // Handle other errors
    return NextResponse.json(
      { message: "Cannot update the post" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { createPost as POST, editPost as PATCH };
