import getCurrentUser from "@/actions/getCurrentUser";
import database from "@/libs/database";
import { forumValidator } from "@/libs/validators/forum";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        // Check if the request comes from authenticated source
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.json({ message: "This action requires authentication." }, { status: StatusCodes.UNAUTHORIZED });
        // Parse the request and validate it using a predefined zod schema
        const body = await req.json();
        const { forumName } = forumValidator.parse(body);
        // Check if the forum already exists
        const forumExists = await database.forum.findFirst({ where: { name: forumName } });
        if (forumExists) return NextResponse.json({ message: "The forum with the given name already exists." })
        // Create forum with the given name
        const forum = await database.forum.create({ data: { name: forumName, creatorId: currentUser.id } });
        // Create a subscription
        await database.subscription.create({ data: { userId: currentUser.id, forumId: forum.id } })
        return NextResponse.json({ message: `Successfully created a community/forum named ${forum.name}.` }, { status: StatusCodes.CREATED });
    } catch (error: any) {
        // Handle specific error instance
        if (error instanceof ZodError) return NextResponse.json({ message: error.message }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
        // Handle generic error
        return NextResponse.json({ message: "Could not create the community." }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}