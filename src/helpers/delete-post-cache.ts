import redis from "@/lib/redis";

/**
 * Deletes the cache for a specific post.
 * @param postId - ID of the post to delete the cache for.
 */
const deletePostCache = async (postId: string) => {
  await redis.del(`post:${postId}`);
};

export default deletePostCache;
