import { Fragment } from "react"
import { notFound } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import getForum from "@/actions/getForum"

import type { ExtendedForum } from "@/types/database"
import MiniCreatePost from "@/components/Post/MiniCreatePost"
import PostFeed from "@/components/Post/PostFeed"

interface ForumPageProps {
  params: {
    forumName: string
  }
  searchParams: {
    tag: string
  }
}

const ForumPage = async ({ params, searchParams }: ForumPageProps) => {
  const { forumName } = params
  const { tag } = searchParams
  const currentUser = await getCurrentUser()
  const forum: ExtendedForum | null = await getForum(forumName)
  if (!forum) return notFound()
  return (
    <Fragment>
      <MiniCreatePost currentUser={currentUser} />
      {forum.posts.length === 0 ? (
        <div className="w-full rounded-md border-2 border-zinc-800 bg-yellow-300 p-2 text-center font-medium text-zinc-800 dark:bg-red-300">
          Be the first to post! No posts found. Why not be the first one to
          share your thoughts?
        </div>
      ) : (
        <PostFeed
          forumName={forum.name}
          userId={currentUser?.id}
          initialPosts={forum.posts}
          filters={{ tag }}
        />
      )}
    </Fragment>
  )
}

export default ForumPage
