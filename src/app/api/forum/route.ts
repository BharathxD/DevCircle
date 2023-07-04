import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import { forumValidator } from "@/lib/validators/forum";

const createForum = async (req: NextRequest) => {
  try {
    // Check if the request comes from authenticated source
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json(
        { message: "This action requires authentication." },
        { status: StatusCodes.UNAUTHORIZED }
      );
    // Parse the request and validate it using a predefined zod schema
    const body = await req.json();
    const data = forumValidator.parse(body);
    // Convert the `forumName` to a lowercase string
    const name = data.forumName.toLowerCase();
    // Check if the forum already exists
    const forumExists = await database.forum.findFirst({ where: { name } });
    if (forumExists || name === "create")
      return NextResponse.json(
        { message: "The forum with the given name already exists." },
        { status: StatusCodes.CONFLICT }
      );
    // Create forum with the given name
    const forum = await database.forum.create({
      data: { name, creatorId: currentUser.id },
    });
    // Create a subscription
    await database.subscription.create({
      data: { userId: currentUser.id, forumId: forum.id },
    });
    return NextResponse.json(forum.name, { status: StatusCodes.CREATED });
  } catch (error: unknown) {
    // Handle specific error instance
    if (error instanceof ZodError)
      return NextResponse.json(
        { message: error.message },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );
    // Handle generic error
    return NextResponse.json(
      { message: "Could not create the community." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { createForum as POST };
