"use client"

import { Fragment, useState } from "react"
import type { Comment, CommentVote, User } from "@prisma/client"

import PostComment from "./PostComment"

type ExtendedComment = Comment & {
  votes: CommentVote[]
  replies: (Comment & {
    author: User
    votes: CommentVote[]
  })[]
}

interface CommentRepliesProps {
  postId: string
  topLevelComment: ExtendedComment
  userId?: string
}

const CommentReplies: React.FC<CommentRepliesProps> = ({
  topLevelComment,
  postId,
  userId,
}) => {
  const [showReplies, setShowReplies] = useState<boolean>(false)
  return (
    <Fragment>
      <div
        onClick={() => setShowReplies((prevValue) => !prevValue)}
        className="w-fit cursor-pointer rounded-md border-2 border-zinc-800 bg-zinc-50 px-2 py-1 hover:bg-zinc-800 hover:text-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 hover:dark:bg-zinc-700"
      >
        {showReplies ? "Hide Replies" : "Show replies"}
      </div>
      {showReplies &&
        topLevelComment.replies
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((reply) => {
            const replyVotesAmount = reply.votes.reduce((accumulator, vote) => {
              if (vote.type === "UP") accumulator++
              if (vote.type === "DOWN") accumulator--
              return accumulator
            }, 0)
            const replyVote = reply.votes.find((vote) => vote.userId === userId)
            return (
              <div
                key={reply.id}
                className="ml-2 border-l-2 border-zinc-700 pl-2 pt-2"
              >
                <PostComment
                  comment={reply}
                  postId={postId}
                  initialCommentVote={replyVote?.type}
                  initialCommentVoteAmount={replyVotesAmount}
                  userId={userId}
                  // Replies can be deleted
                  isDeletable={true}
                />
              </div>
            )
          })}
    </Fragment>
  )
}

export default CommentReplies
