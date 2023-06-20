import getCurrentUser from "@/actions/getCurrentUser";
import database from "@/libs/database";
import { PostValidator } from "@/libs/validators/post";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.json({ message: "This action requires authentication" }, { status: StatusCodes.UNAUTHORIZED });
        const body = await req.json();
        const { title, content, forumId } = PostValidator.parse(body);
        const subscription = await database.subscription.findFirst({
            where: {
                forumId,
                userId: currentUser.id,
            },
        });
        if (!subscription) return NextResponse.json({ message: "You are not subscribed to this forum" }, { status: StatusCodes.UNAUTHORIZED });
        const post = await database.post.create({
            data: {
                title,
                content,
                authorId: currentUser.id,
                forumId,
            },
        });
        return NextResponse.json(post, { status: StatusCodes.CREATED });
    } catch (error: any) {
        if (error instanceof ZodError) {
            return new Response(error.message, { status: StatusCodes.BAD_REQUEST });
        }
        return NextResponse.json({ message: "Cannot create the post" }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
}