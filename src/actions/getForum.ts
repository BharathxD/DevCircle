"use server";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import type { Forum } from "@prisma/client";

import type { ExtendedForum } from "@/types/database";
import database from "@/lib/database";

/**
 * Retrieves a forum from the database.
 *
 * @param {string} forumName - The name of the forum to retrieve.
 * @returns {Promise<Forum | null>} - A promise that resolves to the forum object with the specified forumName, or null if not found.
 */
const getForum = async (forumName: string): Promise<Forum | null> => {
  try {
    const forum = await database.forum.findFirst({
      where: { name: forumName },
    });
    return forum ?? null;
  } catch (error) {
    throw new Error("Failed to retrieve the forum.");
  }
};

/**
 * Retrieves a forum and its associated posts from the database.
 *
 * @param {string} forumName - The name of the forum to retrieve.
 * @param {number} [limit] - The maximum number of posts to retrieve (optional).
 * @returns {Promise<ExtendedForum | null>} - A promise that resolves to the forum object with the specified forumName, or null if not found.
 * @throws {Error} - If an error occurs while retrieving the forum.
 */
const getForumWithPosts = async (
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
            tags: true,
            _count: true,
          },
          orderBy: { createdAt: "desc" },
          take: limit ?? INFINITE_SCROLL_PAGINATION_RESULTS,
        },
        creator: true,
      },
    });
    return forum ?? null;
  } catch (error) {
    return null;
  }
};

export { getForumWithPosts, getForum };
