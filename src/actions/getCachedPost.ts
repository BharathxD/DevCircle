"use server";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

/**
 * Retrieves a cached post from Redis based on the post ID.
 * @param postId - The ID of the post.
 * @returns A promise that resolves to the cached post or null if it doesn't exist.
 */
const getCachedPost = async (postId: string): Promise<CachedPost | null> => {
  try {
    const cachedPost = (await redis.hgetall(`post:${postId}`)) as CachedPost | null;
    return cachedPost;
  } catch (error) {
    return null;
  }
}

export default getCachedPost;
