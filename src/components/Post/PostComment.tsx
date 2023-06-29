"use client"

import { useRef } from "react"
import type { Comment, CommentVote, User } from "@prisma/client"

import formatTimeToNow from "@/lib/formatTimeToNow"

import UserAvatar from "../UI/UserAvatar"

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
}

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col" ref={commentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="font-medium text-zinc-800 dark:text-zinc-50">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-sm text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="mt-2 text-zinc-900 dark:text-zinc-50">{comment.text}</p>
    </div>
  )
}

export default PostComment
