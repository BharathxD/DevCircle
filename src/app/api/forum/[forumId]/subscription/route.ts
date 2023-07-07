import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { StatusCodes } from "http-status-codes";

import database from "@/lib/database";

interface searchParams {
  params: {
    forumId: string;
  };
}

export async function PATCH(_: NextRequest, searchParams: searchParams) {
  try {
    // Check if the request comes from authenticated source
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json(
        { message: "This action requires authentication" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    const {
      params: { forumId },
    } = searchParams;
    // Check if the forum already exists
    const forum = await database.forum.findFirst({ where: { id: forumId } });
    if (!forum)
      return NextResponse.json(
        { message: "No forum found with the given id" },
        { status: StatusCodes.NOT_FOUND }
      );
    const subscriptionExists = await database.subscription.findFirst({
      where: { forumId, userId: currentUser.id },
    });
    if (!subscriptionExists) {
      await database.subscription.create({
        data: { forumId, userId: currentUser.id },
      });
      return NextResponse.json(
        { message: "Unsubscribed" },
        { status: StatusCodes.OK }
      );
    }
    await database.subscription.delete({
      where: { userId_forumId: { forumId, userId: currentUser.id } },
    });
    return NextResponse.json("Unsubscribed", { status: StatusCodes.ACCEPTED });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Cannot proccess the subscription" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
