import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { array, object, string, ZodError } from "zod";

import database from "@/lib/database";

/**
 * Handles the GET request for retrieving posts.
 * @param req The NextRequest object representing the incoming request.
 * @returns The NextResponse object representing the server's response.
 */
const retrievePosts = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the URL from the request
    const url = new URL(req.url);
    // Parse and validate query parameters
    const { forumName, limit, page, tag } = object({
      limit: string(),
      page: string(),
      forumName: string().nullish().optional(),
      tag: array(string()).nullish().optional(),
    }).parse({
      forumName: url.searchParams.get("forumName"),
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
      tag: url.searchParams.get("tag"),
    });

    let whereClause = {};

    // Filter posts by forum name if provided
    if (forumName) whereClause = { forum: { name: forumName } };

    // Filter posts by tag if provided
    if (tag) whereClause = { ...whereClause, tags: { some: { name: tag } } };

    // Fetch posts from the database
    const posts = await database.post.findMany({
      take: +limit,
      skip: (+page - 1) * +limit,
      orderBy: { createdAt: "desc" },
      include: {
        forum: true,
        votes: true,
        author: true,
        comments: true,
        tags: true,
      },
      where: whereClause,
    });

    // Return a not found response if no posts are found
    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found with the given forum name" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Return the retrieved posts
    return NextResponse.json(posts, { status: StatusCodes.OK });
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
      { message: "Could not retrieve the posts, please try again later" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export { retrievePosts as GET }