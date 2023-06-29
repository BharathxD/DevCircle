import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import getPost from "@/actions/getPost"
import type { Post, Tag, User, Vote } from "@prisma/client"
import { Loader2 } from "lucide-react"

import type { CachedPost } from "@/types/redis"
import database from "@/lib/database"
import formatTimeToNow from "@/lib/formatTimeToNow"
import redis from "@/lib/redis"
import CommentsSection from "@/components/Post/CommentsSection"
import EditorOutput from "@/components/Post/EditorOutput"
import PostVoteServer from "@/components/Post/PostVoteServer"
import PostVoteShell from "@/components/UI/PostVoteShell"
import ShareButton from "@/components/UI/ShareButton"

interface PageProps {
  params: {
    postId: string
  }
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const PostPage = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost
  let post: (Post & { votes: Vote[]; author: User; tags: Tag[] }) | null = null

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
        tags: true,
      },
    })
  }
  const tags = post?.tags ?? cachedPost.tags
  if (!post && !cachedPost) return notFound()
  return (
    <div className="pb-4">
      <div className="flex h-full flex-col items-start gap-0 md:flex-row md:gap-4">
        <div className="flex w-full flex-row items-center justify-between gap-4 md:w-fit md:flex-col md:pt-5">
          <Suspense fallback={<PostVoteShell />}>
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={() => getPost(params.postId)}
            />
            <ShareButton className="flex items-center justify-center rounded-xl border-2 border-zinc-700 p-3" />
          </Suspense>
        </div>
        <div className="flex w-full flex-col gap-4">
          {tags && (
            <div className="flex flex-row gap-2">
              {tags.map((tag, index) => {
                return (
                  <Link
                    key={index}
                    href={`?tag=${tag.name}`}
                    className="cursor-pointer rounded-md border-2 border-zinc-700 bg-zinc-50 px-5 py-2 hover:bg-zinc-700 hover:text-zinc-50 dark:bg-zinc-800 hover:dark:bg-zinc-700"
                  >
                    {tag.name}
                  </Link>
                )
              })}
            </div>
          )}
          <div className="flex flex-col gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="mt-1 max-h-40 truncate text-sm text-zinc-500 dark:text-zinc-300">
              Posted by u/{post?.author.name ?? cachedPost.authorUsername}{" "}
              {formatTimeToNow(
                new Date(post?.createdAt ?? cachedPost.createdAt)
              )}
            </p>
            <div>
              <h1 className="pb-1 pt-2 text-xl font-semibold leading-6 text-zinc-900 dark:text-zinc-300">
                {post?.title ?? cachedPost.title}
              </h1>
              <EditorOutput content={post?.content ?? cachedPost.content} />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-50 p-4 dark:bg-zinc-900">
            <Suspense
              fallback={
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              }
            >
              <CommentsSection postId={post?.id ?? cachedPost.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
