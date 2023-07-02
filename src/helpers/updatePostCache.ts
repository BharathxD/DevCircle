import type { Post, Tag, User, Vote } from "@prisma/client";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

type updatePostCacheParams = Post & {
    votes: Vote[];
    author: User;
    tags: Tag[];
};


async function updatePostCache(post: updatePostCacheParams) {
    const existingCachedPayload: CachedPost | null = await redis.hgetall(`post:${post.id}`);
    const updatedCachedPayload: CachedPost = {
        id: post.id,
        title: post.title,
        authorUsername: post.author.name ?? "",
        authorImage: post.author.image ?? "",
        authorId: post.authorId,
        content: JSON.stringify(post.content),
        tags: post.tags,
        currentVote: existingCachedPayload?.currentVote || null,
        createdAt: post.createdAt,
    };
    await redis.hmset(`post:${post.id}`, updatedCachedPayload);
    return true
}

export default updatePostCache;
