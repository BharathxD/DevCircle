"use server";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

const getCachedPost = async (postId: string): Promise<CachedPost | null> => {
  try {
    const cachedPost = (await redis.hgetall(
      `post:${postId}`
    )) as CachedPost | null;
    return cachedPost;
  } catch (error: unknown) {
    return null;
  }
};

export default getCachedPost;
