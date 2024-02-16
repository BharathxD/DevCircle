import type { Post, Tag, User, Vote, VoteType } from "@prisma/client";

import type { CachedPost } from "@/types/redis";
import redis from "@/lib/redis";

interface UpdateVoteCountParams {
  id: string;
  voteType: VoteType | null;
  post: Post & {
    votes: Vote[];
    author: User;
    tags: Tag[];
  };
}

/**
 * Updates the vote count and caches the post if the vote count meets the caching threshold.
 * @param params - Update vote count parameters.
 * @returns Updated vote amount.
 */
const updateVoteCount = async ({
  id,
  voteType,
  post,
}: UpdateVoteCountParams) => {
  const voteAmount = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);

  const CACHE_AFTER_UPVOTES = 1;

  if (voteAmount >= CACHE_AFTER_UPVOTES) {
    const cachedPayload: CachedPost = {
      id: post.id,
      title: post.title,
      authorUsername: post.author.username ?? "",
      authorImage: post.author.image ?? "",
      authorId: post.authorId,
      content: JSON.stringify(post.content),
      tags: post.tags,
      currentVote: voteType,
      createdAt: post.createdAt,
    };
    await redis.hset(`post:${id}`, cachedPayload);
  }

  return voteAmount;
};

export default updateVoteCount;
