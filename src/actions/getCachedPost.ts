"use server";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

/**
 * Retrieves a cached post from Redis based on the post ID.
 *
 * @param {string} postId - The ID of the post.
 * @returns {Promise<CachedPost | null>} - A promise that resolves to the cached post or null if it doesn't exist.
 * @throws {Error} - If an error occurs while retrieving the cached post.
 */
const getCachedPost = async (postId: string): Promise<CachedPost | null> => {
  try {
    const cachedPost = (await redis.hgetall(
      `post:${postId}`
    )) as CachedPost | null;
    return cachedPost;
  } catch (error) {
    throw new Error("Failed to retrieve the cached post.");
  }
};

export default getCachedPost;
