import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession, getCurrentUser } from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import {
  forumDeleteValidator,
  forumUpdateValidator,
  forumValidator,
} from "@/lib/validators/forum";

/**
 * Creates a new forum based on the provided request.
 * @param req - The NextRequest object containing the request details.
 * @returns A NextResponse object indicating the result of the forum creation.
 */
const createForum = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Check if the request comes from an authenticated source
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      // Return unauthorized response
      return NextResponse.json(
        { message: "This action requires authentication." },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse the request body and validate it using the forumValidator schema
    const requestBody = await req.json();
    const { forumName, description } = forumValidator.parse(requestBody);

    // Convert the forum name to lowercase
    const name = forumName.toLowerCase();

    // Check if the forum already exists
    const forumExists = await database.forum.findFirst({ where: { name } });
    if (forumExists || name === "create") {
      // Return conflict response if the forum exists or the name is invalid
      return NextResponse.json(
        { message: "The forum with the given name already exists." },
        { status: StatusCodes.CONFLICT }
      );
    }

    // Create the new forum
    const forum = await database.forum.create({
      data: { name, creatorId: currentUser.id, description },
    });

    // Create a subscription for the current user
    await database.subscription.create({
      data: { userId: currentUser.id, forumId: forum.id },
    });

    // Return the forum name as the response
    return NextResponse.json(forum.name, { status: StatusCodes.CREATED });
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
      { message: "Could not create the community, please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Edits an existing forum based on the provided request.
 * @param req - The NextRequest object containing the request details.
 * @returns A NextResponse object indicating the result of the forum creation.
 */
const editForum = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Check if the request comes from an authenticated source
    const session = await getAuthSession();
    if (!session?.user) {
      // Return unauthorized response
      return NextResponse.json(
        { message: "This action requires authentication." },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse the request body and validate it using the forumUpdateValidator schema
    const requestBody = await req.json();
    const { forumId, forumName, description } =
      forumUpdateValidator.parse(requestBody);

    // Convert the forum name to lowercase
    const name = forumName.toLowerCase();

    // Check if the forum exists
    const forum = await database.forum.findFirst({ where: { id: forumId } });

    if (!forum) {
      // Return conflict response if the forum exists or the name is invalid
      return NextResponse.json(
        { message: "The forum with the given id doesn't exist." },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Check if the user trying to make this operation is authorized to do so
    const isCreator = forum.creatorId === session.user.id;

    if (!isCreator) {
      // Return forbidden response if the user is unauthorized
      return NextResponse.json(
        { message: "Only creator of this forum can make changes to the forum" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // Updated the forum with the given request payload
    const updatedForum = await database.forum.update({
      where: {
        id: forumId,
      },
      data: {
        name,
        description,
      },
    });

    // Return the updated forum as the response
    return NextResponse.json(updatedForum, { status: StatusCodes.CREATED });
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
      { message: "Could not create the community, please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Deletes an existing forum.
 * @param req - The NextRequest object containing the request details.
 * @returns A NextResponse object indicating the result of the forum creation.
 */
const deleteForum = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Check if the request comes from an authenticated source
    const session = await getAuthSession();
    // Return unauthorized response
    if (!session?.user) {
      return NextResponse.json(
        { message: "This action requires authentication." },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse the request body and validate it using the forumValidator schema
    const url = new URL(req.url);
    const { forumId } = forumDeleteValidator.parse({
      forumId: url.searchParams.get("forumId"),
    });

    // Check if the forum exists
    const forum = await database.forum.findFirst({ where: { id: forumId } });

    if (!forum) {
      // Return conflict response if the forum exists or the name is invalid
      return NextResponse.json(
        { message: "The forum with the given id doesn't exist." },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Check if the user trying to make this operation is authorized to do so
    const isCreator = forum.creatorId === session.user.id;

    if (!isCreator) {
      // Return forbidden response if the user is unauthorized
      return NextResponse.json(
        { message: "Only creator of this forum can make changes to the forum" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // Define the promises for deleting posts and subscriptions
    const deletePostsPromise = database.post.deleteMany({
      where: { forumId: forumId },
    });
    const deleteSubscriptionsPromise = database.subscription.deleteMany({
      where: { forumId: forumId },
    });

    // Use Promise.all to execute both promises in parallel
    await Promise.all([deletePostsPromise, deleteSubscriptionsPromise]);

    // Delete the forum
    await database.forum.delete({ where: { id: forumId } });

    // Return the forum name as the response
    return NextResponse.json(
      { message: "Deleted the forum successfully" },
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
      { message: "Could not create the community, please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { createForum as POST, editForum as PATCH, deleteForum as DELETE };
