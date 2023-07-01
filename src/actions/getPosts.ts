import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

import type { ExtendedPost } from "@/types/database";
import database from "@/lib/database";

/**
 * Retrieves posts from the database.
 * @param {string} [tag] The tag to filter posts by (optional).
 * @param {number} [limit] The maximum number of posts to retrieve (optional).
 * @returns {Promise<ExtendedPost[] | null>} A promise that resolves to an array of fetched posts, or null if an error occurs.
 */
const getPosts = async (
  tag?: string,
  limit?: number
): Promise<ExtendedPost[] | null> => {
  try {
    let whereClause = {};
    if (tag) whereClause = { tags: { some: { name: tag } } };

    // Retrieve posts from the database, including associated data
    const allPosts = await database.post.findMany({
      where: whereClause,
      include: {
        votes: true,
        author: true,
        comments: true,
        forum: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit ?? INFINITE_SCROLL_PAGINATION_RESULTS,
    });

    return allPosts;
  } catch (error: unknown) {
    return null;
  }
};

export default getPosts;
