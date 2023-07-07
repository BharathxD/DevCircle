import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import updateVoteCount from "@/helpers/voteCountUpdater";
import database from "@/lib/database";
import { PostVoteValidator } from "@/lib/validators/vote";

/**
 * Handles the PATCH request to update a vote on a post.
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse>} The Next.js response.
 */
const patchVotes = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // If no user is found, return unauthorized response
    if (!currentUser)
      return NextResponse.json(
        { message: "Authentication required. Please log in." },
        { status: StatusCodes.UNAUTHORIZED }
      );

    const { id: userId } = currentUser;
    const { postId, voteType } = PostVoteValidator.parse(await req.json());

    // Retrieve the post with author and votes details
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
        tags: true,
      },
    });

    // If the post doesn't exist, return not found response
    if (!post)
      return NextResponse.json(
        { message: "Post not found." },
        { status: StatusCodes.NOT_FOUND }
      );

    // Check if the user has already voted on the post
    const existingVote = await database.vote.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (!existingVote) {
      // If no existing vote, create a new vote and update the vote count concurrently
      await Promise.all([
        database.vote.create({ data: { type: voteType, userId, postId } }),
        updateVoteCount({ id: postId, voteType, post }),
      ]);
      return NextResponse.json(
        { message: "Vote created successfully." },
        { status: StatusCodes.OK }
      );
    }

    // If an existing vote is found
    const updatePromise =
      existingVote.type === voteType
        ? // If the existing vote is of the same type as the new vote, delete the vote and update vote count
          Promise.all([
            database.vote.delete({
              where: { userId_postId: { userId, postId } },
            }),
            updateVoteCount({ id: postId, voteType: null, post }),
          ])
        : // If the existing vote is of a different type, update the vote and update vote count
          Promise.all([
            database.vote.update({
              where: { userId_postId: { userId, postId } },
              data: { type: voteType },
            }),
            updateVoteCount({ id: postId, voteType, post }),
          ]);

    await updatePromise;

    return NextResponse.json(
      {
        message:
          existingVote.type === voteType
            ? "Vote removed."
            : "Vote updated successfully.",
      },
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
      { message: "Internal server error, please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { patchVotes as PATCH };
