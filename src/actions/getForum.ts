"use server";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

import type { ExtendedForum } from "@/types/database";
import database from "@/lib/database";
import type { Forum, User } from "@prisma/client";

/**
 * Retrieves a forum from the database.
 * @param forumName - The name of the forum to retrieve.
 * @returns A promise that resolves to the forum object with the specified forumName, or null if not found.
 */
const getForum = async (
  forumName: string,
): Promise<Forum | null> => {
  try {
    const forum = await database.forum.findFirst({
      where: { name: forumName },
    });
    return forum ?? null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a forum and its associated posts from the database.
 * @param forumName - The name of the forum to retrieve.
 * @param limit - The maximum number of posts to retrieve (optional).
 * @returns A promise that resolves to the forum object with the specified forumName, or null if not found.
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
