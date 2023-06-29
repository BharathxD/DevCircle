import getCurrentUser from "@/actions/getCurrentUser"

import database from "@/lib/database"

import CommentReplies from "./CommentReplies"
import CreateComment from "./CreateComment"
import PostComment from "./PostComment"

interface CommentsSectionProps {
  postId: string
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const currentUser = await getCurrentUser()
  const comments = await database.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col gap-y-2">
      <CreateComment postId={postId} />
      {comments.length !== 0 && (
        <div className="mt-4 flex flex-col gap-y-6">
          {comments
            .filter((comment) => !comment.replyToId)
            .map((topLevelComment) => {
              const topLevelCommentAmount = topLevelComment.votes.reduce(
                (accumulator, vote) => {
                  if (vote.type === "UP") accumulator++
                  if (vote.type === "DOWN") accumulator--
                  return accumulator
                },
                0
              )
              const topLevelCommentVote = topLevelComment.votes.find(
                (vote) => vote.userId === currentUser?.id
              )
              return (
                <div key={topLevelComment.id} className="flex flex-col">
                  <div
                    className={`mb-4 ${
                      topLevelComment.replies.length === 0 && "mb-0"
                    }`}
                  >
                    <PostComment
                      comment={topLevelComment}
                      initialCommentVoteAmount={topLevelCommentAmount}
                      initialCommentVote={topLevelCommentVote?.type}
                      userId={currentUser?.id}
                      postId={postId}
                      isDeleteable={topLevelComment.replies.length === 0}
                    />
                  </div>
                  {topLevelComment.replies.length !== 0 && (
                    <CommentReplies
                      postId={postId}
                      topLevelComment={topLevelComment}
                      userId={currentUser?.id}
                    />
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default CommentsSection
