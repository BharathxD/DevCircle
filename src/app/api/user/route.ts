import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession } from "@/actions/getCurrentUser";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import database from "@/lib/database";
import { profileFormSchema } from "@/lib/validators/profile";



/**
 * Update user profile.
 *
 * @param req - The NextRequest object.
 * @returns A NextResponse containing the updated user data or an error message.
 */
const updateUser = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Check if user is authorized
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse request body
    const requestBody = await req.json();
    const { username, bio, urls } = profileFormSchema.parse(requestBody);

    // const username = await database.user.findFirst({ where: { username } });

    // Update user in the database
    await database.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username,
        bio,
        socialMedia: {
          create: {
            linkedIn: urls?.linkedIn,
            github: urls?.github,
            facebook: urls?.facebook,
          },
        },
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "User has been successfully updated" },
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
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == "P2002"
    ) {
      return NextResponse.json(
        { message: "User with the username already exists." },
        { status: StatusCodes.CONFLICT }
      );
    }
    // Return a JSON response with a 500 status code for other errors
    return NextResponse.json(
      {
        message: "Could not update the user, please try again later",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { updateUser as PATCH };
