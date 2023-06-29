import getCurrentUser from "@/actions/getCurrentUser";
import database from "@/lib/database";
import { CommentValidator } from "@/lib/validators/comments";
import { StatusCodes } from "http-status-codes";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

export async function PATCH(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "This action require authentication" }, { status: StatusCodes.UNAUTHORIZED });
        }
        const body = await req.json();
        const { postId, text, replyToId } = CommentValidator.parse(body);
        await database.comment.create({
            data: {
                authorId: currentUser.id,
                postId,
                text,
                replyToId
            }
        })
        return NextResponse.json({ message: "OK" }, { status: StatusCodes.OK });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: `Invalid request parameters: ${error.message}` }, { status: StatusCodes.BAD_REQUEST });
        }
        return NextResponse.json({ message: "Something went wrong, comment cannot be posted at the moment" }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
}