"use server"

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"

import type { ExtendedForum } from "@/types/database"
import database from "@/lib/database"

/**
 * This function retrieves a forum and its associated posts from a database, with an optional limit on
 * the number of posts returned.
 * @param {string} forumName - A string representing the name of the forum to retrieve from the
 * database.
 * @param {number} [limit] - The `limit` parameter is an optional parameter that specifies the maximum
 * number of posts to be included in the forum object. If it is not provided, the default value is set
 * to `INFINITE_SCROLL_PAGINATION_RESULTS` which is defined in the `config` file.
 * @returns The `getForum` function is returning a Promise that resolves to a forum object with the
 * specified `forumName`, or a `null`
 */
const getForum = async (
  forumName: string,
  limit?: number
): Promise<ExtendedForum | null> => {
  try {
    const forum = await database.forum.findFirst({
      where: { name: forumName },
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
            comments: true,
            forum: true,
            tags: true
          },
          orderBy: {
            createdAt: "desc",
          },
          take: limit ?? INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    })

    return forum;
  } catch (error: unknown) {
    console.log(error);
    return null
  }
}
export default getForum
