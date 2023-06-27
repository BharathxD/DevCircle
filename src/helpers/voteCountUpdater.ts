import type { Post, User, Vote, VoteType } from "@prisma/client"

import type { CachedPost } from "@/types/redis"
import redis from "@/lib/redis"

const CACHE_AFTER_UPVOTES = 1

interface updateVoteCountParams {
  postId: string
  voteType: VoteType | null
  post: Post & {
    votes: Vote[]
    author: User
  }
}

async function updateVoteCount({
  postId,
  voteType,
  post,
}: updateVoteCountParams) {
  const voteAmount = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1
    if (vote.type === "DOWN") return acc - 1
    return acc
  }, 0)
  if (voteAmount >= CACHE_AFTER_UPVOTES) {
    const cachedPayload: CachedPost = {
      id: post.id,
      title: post.title,
      authorUsername: post.author.name ?? "",
      content: JSON.stringify(post.content),
      currentVote: voteType,
      createdAt: post.createdAt,
    }
    await redis.hset(`post:${postId}`, cachedPayload)
  }
  return voteAmount
}

export default updateVoteCount
