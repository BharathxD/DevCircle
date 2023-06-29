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
        className="w-fit cursor-pointer rounded-md border-2 border-zinc-700 bg-zinc-800 px-2 py-1"
      >
        {showReplies ? "Hide Replies" : "Show replies"}
      </div>
      {showReplies &&
        topLevelComment.replies
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((reply) => {
            const replyVotesAmount = topLevelComment.votes.reduce(
              (accumulator, vote) => {
                if (vote.type === "UP") accumulator++
                if (vote.type === "DOWN") accumulator--
                return accumulator
              },
              0
            )
            const replyVote = topLevelComment.votes.find(
              (vote) => vote.userId === userId
            )
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
                  isLoggedIn={!!userId}
                />
              </div>
            )
          })}
    </Fragment>
  )
}

export default CommentReplies
