import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import { CommentVoteValidator } from "@/lib/validators/vote";

/**
 * Handles the PATCH request to update a vote on a comment.
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse>} The Next.js response.
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
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
    const { commentId, voteType } = CommentVoteValidator.parse(
      await req.json()
    );

    // Check if the user has already voted on the comment
    const existingVote = await database.commentVote.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (!existingVote) {
      // If no existing vote, create a new vote and update the vote count concurrently
      await database.commentVote.create({
        data: { type: voteType, userId, commentId },
      });
      return NextResponse.json(
        { message: "Vote created successfully." },
        { status: StatusCodes.OK }
      );
    }

    // If an existing vote is found
    const updatePromise =
      existingVote.type === voteType
        ? // If the existing vote is of the same type as the new vote, delete the vote and update vote count
          database.commentVote.delete({
            where: { userId_commentId: { userId, commentId } },
          })
        : // If the existing vote is of a different type, update the vote and update vote count
          database.commentVote.update({
            where: { userId_commentId: { userId, commentId } },
            data: { type: voteType },
          });

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
      // If there's a validation error, return a bad request response
      return NextResponse.json(
        { message: "Invalid request. Please provide valid data." },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // If an error occurs, return an internal server error response
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
