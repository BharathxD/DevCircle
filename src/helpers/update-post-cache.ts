import type { Post, Tag, User, Vote } from "@prisma/client";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

/**
 * Updates the cached post information.
 * @param post - Post data to update the cache.
 */
async function updatePostCache(
  post: Post & {
    votes: Vote[];
    author: User;
    tags: Tag[];
  }
) {
  const existingCachedPayload: CachedPost | null = await redis.hgetall(
    `post:${post.id}`
  );

  const updatedCachedPayload: CachedPost = {
    id: post.id,
    title: post.title,
    authorUsername: post.author.username ?? "",
    authorImage: post.author.image ?? "",
    authorId: post.authorId,
    content: JSON.stringify(post.content),
    tags: post.tags,
    currentVote: existingCachedPayload?.currentVote || null,
    createdAt: post.createdAt,
  };

  await redis.hmset(`post:${post.id}`, updatedCachedPayload);
}

export default updatePostCache;
