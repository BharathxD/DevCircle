import { NextResponse, type NextRequest } from "next/server"
import getCurrentUser from "@/actions/getCurrentUser"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"

import database from "@/lib/database"
import { CommentValidator, DeleteCommentValidator } from "@/lib/validators/comments"

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { message: "This action require authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      )
    }
    const body = await req.json()
    const { postId, text, replyToId } = CommentValidator.parse(body)
    await database.comment.create({
      data: {
        authorId: currentUser.id,
        postId,
        text,
        replyToId,
      },
    })
    return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      )
    }
    return NextResponse.json(
      {
        message: "Something went wrong, comment cannot be posted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { message: "This action require authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      )
    }
    const url = new URL(req.url)
    const { commentId } = DeleteCommentValidator.parse({ commentId: url.searchParams.get("commentId") })
    const comment = await database.comment.findFirst({
      where: {
        id: commentId,
        authorId: currentUser.id
      }
    })
    if (!comment) {
      return NextResponse.json(
        { message: "This action require authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      )
    }
    await database.comment.delete({
      where: {
        id: comment.id
      }
    })
    return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      )
    }
    return NextResponse.json(
      {
        message: "Something went wrong, comment cannot be posted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

