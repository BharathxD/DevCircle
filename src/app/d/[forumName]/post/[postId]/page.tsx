import { Suspense } from "react"
import { notFound } from "next/navigation"
import getPost from "@/actions/getPost"
import type { Post, User, Vote } from "@prisma/client"

import type { CachedPost } from "@/types/redis"
import database from "@/lib/database"
import redis from "@/lib/redis"
import PostVoteServer from "@/components/Post/PostVoteServer"
import PostVoteShell from "@/components/UI/PostVoteShell"

interface PageProps {
  params: {
    postId: string
  }
}

export const dynamic = "force-dynammic"
export const fetchCache = "force-no-store"

const PostPage = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost
  let post: (Post & { votes: Vote[]; author: User }) | null = null

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }
  if (!post && !cachedPost) return notFound()
  return (
    <div>
      <div className="flex h-full flex-col items-center sm:flex-row sm:items-start">
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={() => getPost(params.postId)}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default PostPage
