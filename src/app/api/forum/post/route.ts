import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import deletePostCache from "@/helpers/deletePostCache";
import updatePostCache from "@/helpers/updatePostCache";
import database from "@/lib/database";
import {
  CreatePostValidator,
  DeletePostValidator,
  UpdatePostValidator,
} from "@/lib/validators/post";

/**
 * Handles the HTTP POST request for creating a new post.
 * @param req - The Next.js request object.
 * @returns The Next.js response object.
 */
const createPost = async (req: NextRequest): Promise<NextResponse> => {
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

    // Check if the post content is empty
    if (content.blocks.length === 0) {
      return NextResponse.json(
        { message: "Post content cannot be empty" },
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
      // Return a JSON response with a 400 status code if there's a ZodError
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Return a JSON response with a 500 status code for other errors
    return NextResponse.json(
      { message: "Could not create the post." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Handles the HTTP PATCH request for editing an existing post.
 * @param req - The Next.js request object.
 * @returns The Next.js response object.
 */
const editPost = async (req: NextRequest): Promise<NextResponse> => {
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

    const isAdmin = currentUser.role === "admin";

    // Parse the request body
    const body = await req.json();
    const { title, content, tags, postId } = UpdatePostValidator.parse(body);

    // Check if the post content is empty
    if (content.blocks.length === 0) {
      return NextResponse.json(
        { message: "Post content cannot be empty" },
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

    if (!postExists && !isAdmin) {
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
    const updatedPost = await database.post.update({
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
        tags: true,
      },
    });

    await updatePostCache(updatedPost);

    return NextResponse.json(updatedPost, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Return a JSON response with a 400 status code if there's a ZodError
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Return a JSON response with a 500 status code for other errors
    return NextResponse.json(
      { message: "Could not update the post." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Handles the HTTP DELETE request to delete a post.
 * @param req - The Next.js request object.
 * @returns The Next.js response object.
 */
const deletePost = async (req: NextRequest): Promise<NextResponse> => {
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

    const isAdmin = currentUser.role === "admin";

    // Parse the request body
    const url = new URL(req.url);
    const { postId } = DeletePostValidator.parse({
      postId: url.searchParams.get("postId"),
    });

    // Check if the user is authorized to delete the post
    const postExists = await database.post.findFirst({
      where: {
        id: postId,
        authorId: currentUser.id,
      },
    });

    if (!postExists && !isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to delete this post" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Delete all existing tags
    await database.tag.deleteMany({ where: { postId: postId } });
    await database.post.delete({ where: { id: postId } });

    await deletePostCache(postId);

    return NextResponse.json(
      { message: `Deleted the post with id:${postId}` },
      { status: StatusCodes.OK }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Return a JSON response with a 400 status code if there's a ZodError
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Return a JSON response with a 500 status code for other errors
    return NextResponse.json(
      { message: "Could not delete the post." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { createPost as POST, editPost as PATCH, deletePost as DELETE };
