import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

import type { ExtendedForum } from "@/types/database";
import database from "@/lib/database";

/**
 * Retrieves a forum and its associated posts from the database.
 * @param {string} forumName - The name of the forum to retrieve.
 * @param {number} [limit] - The maximum number of posts to retrieve (optional).
 * @returns {Promise<ExtendedForum | null>} A promise that resolves to the forum object with the specified forumName, or null if not found.
 */
const getForum = async (
  forumName: string,
  limit?: number
): Promise<ExtendedForum | null> => {
  try {
    // Retrieve the forum from the database, including posts
    const forum = await database.forum.findFirst({
      where: { name: forumName },
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
            comments: true,
            forum: true,
            tags: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: limit ?? INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    });
    return forum;
  } catch (error: unknown) {
    return null;
  }
};

export default getForum;
