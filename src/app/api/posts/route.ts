import { NextRequest, NextResponse } from "next/server"
import getCurrentUser from "@/actions/getCurrentUser"
import { StatusCodes } from "http-status-codes"
import { object, string, ZodError } from "zod"

import database from "@/lib/database"

/**
 * Handles the GET request for retrieving posts.
 * @param req The NextRequest object representing the incoming request.
 * @returns The NextResponse object representing the server's response.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url)

    // Retrieve the current user
    const currentUser = await getCurrentUser()

    let followedCommunitiesIds: string[] = []

    // Fetch the ids of communities followed by the current user
    if (currentUser) {
      const followedCommunities = await database.subscription.findMany({
        where: {
          userId: currentUser.id,
        },
      })

      followedCommunitiesIds = followedCommunities.map(({ forumId }) => forumId)
    }

    // Parse and validate query parameters
    const { forumName, limit, page } = object({
      limit: string(),
      page: string(),
      forumName: string().nullish().optional(),
    }).parse({
      forumName: url.searchParams.get("forumName"),
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
    })

    let whereClause = {}

    // Filter posts by forum name if provided
    if (forumName) {
      whereClause = { forum: { name: forumName } }
    }

    // Fetch posts from the database
    const posts = await database.post.findMany({
      take: +limit,
      skip: (+page - 1) * +limit,
      orderBy: { createdAt: "desc" },
      include: { forum: true, votes: true, author: true, comments: true },
      where: whereClause,
    })

    // Return a not found response if no posts are found
    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found with the given forum name" },
        { status: StatusCodes.NOT_FOUND }
      )
    }

    // Return the retrieved posts
    return NextResponse.json(posts, { status: StatusCodes.OK })
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.message },
        { status: StatusCodes.BAD_REQUEST }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
