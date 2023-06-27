"use client"

import { useRef } from "react"
import type { FC } from "react"
import Link from "next/link"
import type { Post, Tag, User, Vote } from "@prisma/client"
import { BiMessageAltDetail } from "react-icons/bi"

import formatTimeToNow from "@/lib/formatTimeToNow"

import { Button } from "../UI/Button"
import EditorOutput from "./EditorOutput"
import PostVoteClient from "./PostVoteClient"

interface PostCardProps {
  post: Post & {
    author: User
    votes: Vote[]
    tags: Tag[]
  }
  votesAmount: number
  forumName?: string
  commentAmount: number
  currentVote?: Vote["type"]
  isLoggedIn?: boolean
}

/**
 * Represents a post card component.
 */
const PostCard: FC<PostCardProps> = ({
  post,
  forumName,
  commentAmount,
  votesAmount,
  currentVote,
  isLoggedIn,
}) => {
  const postRef = useRef<HTMLParagraphElement>(null)
  const isPostOverflowed = postRef.current?.clientHeight === 160

  const postContent = (
    <div
      className="relative max-h-40 w-full overflow-hidden text-sm"
      ref={postRef}
    >
      <EditorOutput content={post.content} />
      {isPostOverflowed && (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-900"></div>
      )}
    </div>
  )

  const postMetaInfo = (
    <div className="mt-1 flex max-h-40 flex-row justify-between gap-1 text-sm text-zinc-500">
      <div className="inline-flex">
        <Link href={`/d/${forumName}`}>
          <p className="text-zinc-800 underline underline-offset-2 dark:text-zinc-50">
            d/{forumName}
          </p>
        </Link>
        <span className="px-1 text-zinc-800 dark:text-zinc-50">•</span>
        <span className="text-zinc-800 dark:text-zinc-50">
          Posted by u/{post.author.name}
        </span>
      </div>
      <time>{" " + formatTimeToNow(new Date(post.createdAt))}</time>
    </div>
  )

  return (
    <article className="rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col justify-between px-6 py-4 md:flex-row">
        <PostVoteClient
          postId={post.id}
          initialVoteAmount={votesAmount}
          initialVote={currentVote}
          isLoggedIn={isLoggedIn}
        />
        <div className="flex w-full flex-col gap-2">
          {postMetaInfo}
          <Link
            href={`/d/${forumName}/post/${post.id}`}
            className="pt-2 text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-50"
            aria-label={post.title}
          >
            {post.title}
          </Link>
          {postContent}
        </div>
      </div>
      <div className="z-20 flex w-full flex-row items-center justify-between rounded-b-md border-t-2 border-t-zinc-800 text-sm">
        <Link href={`/d/${forumName}/post/${post.id}`}>
          <div className="flex w-fit items-center gap-2 rounded-bl-md border-r-2 border-r-zinc-800 px-6 py-3 font-medium hover:bg-yellow-100 dark:hover:bg-zinc-800">
            <BiMessageAltDetail size={25} /> {commentAmount} <p>comments</p>
          </div>
        </Link>
        {post.tags && (
          <div className="flex h-full max-w-full flex-row gap-2 overflow-hidden overflow-x-scroll px-2 py-1">
            {post.tags.map((tag) => (
              <button className="rounded-md border-2 border-zinc-800 px-5 py-1 font-medium hover:bg-zinc-800">
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default PostCard
