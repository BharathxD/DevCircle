"use server"

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"

import { ExtendedPost } from "@/types/database"
import database from "@/lib/database"

/**
 * Retrieves posts from the database
 * @param {number} [limit] The maximum number of posts to retrieve (optional).
 * @returns {Promise<ExtendedPost[] | null>} A promise that resolves to an array of fetched posts.
 * @throws {Error} If an error occurs during the database operation.
 */
const getPosts = async (limit?: number): Promise<ExtendedPost[] | null> => {
  try {
    const allPosts = await database.post.findMany({
      include: {
        votes: true,
        author: true,
        comments: true,
        forum: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit ?? INFINITE_SCROLL_PAGINATION_RESULTS,
    })
    return allPosts
  } catch (error: unknown) {
    return null
  }
}
export default getPosts
