import { NextResponse, type NextRequest } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import {
  CommentValidator,
  DeleteCommentValidator,
  EditCommentValidator,
} from "@/lib/validators/comments";

/**
 * Handles the PATCH request for creating a comment.
 *
 * @param req - The NextRequest object representing the HTTP request.
 * @returns A NextResponse object representing the HTTP response.
 */
const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { postId, text, replyToId } = CommentValidator.parse(await req.json());

    await database.comment.create({
      data: {
        authorId: currentUser.id,
        postId,
        text,
        replyToId,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong, the comment cannot be posted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Handles the DELETE request for deleting a comment.
 *
 * @param req - The NextRequest object representing the HTTP request.
 * @returns A NextResponse object representing the HTTP response.
 */
const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const isAdmin = currentUser.role === "admin";

    const url = new URL(req.url);
    const { commentId } = DeleteCommentValidator.parse({
      commentId: url.searchParams.get("commentId"),
    });

    const comment = await database.comment.findFirst({
      where: {
        id: commentId,
      },
      include: {
        replies: true,
      },
    });

    if (comment?.authorId !== currentUser.id && !isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to delete it" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    if (comment.replies.length > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete a comment that has replies. Delete the replies first.",
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    await database.comment.delete({
      where: {
        id: comment.id,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong, the comment cannot be deleted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

/**
 * Handles the EDIT request for editing a comment.
 *
 * @param req - The NextRequest object representing the HTTP request.
 * @returns A NextResponse object representing the HTTP response.
 */
const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const body = await req.json();
    const { commentId, text } = EditCommentValidator.parse(body);

    const comment = await database.comment.findFirst({
      where: {
        id: commentId,
        authorId: currentUser.id,
      },
      include: {
        replies: true,
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found or you are not authorized to edit it" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    await database.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        text,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong, the comment cannot be deleted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { PATCH, POST, DELETE };
