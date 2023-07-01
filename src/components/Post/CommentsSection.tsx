import { Fragment } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

import database from "@/lib/database";

import { Label } from "../UI/Label";
import { Separator } from "../UI/Separator";
import CommentReplies from "./CommentReplies";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const currentUser = await getCurrentUser();
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
  });

  return (
    <div className="flex flex-col gap-2">
      <Label className="mb-2 ml-1">Comments ({comments.length})</Label>
      <CreateComment postId={postId} />
      {comments.length !== 0 && (
        <Fragment>
          <Separator />
          <div className="flex flex-col gap-4">
            {comments
              .filter((comment) => !comment.replyToId)
              .map((topLevelComment) => {
                const topLevelCommentAmount = topLevelComment.votes.reduce(
                  (accumulator, vote) => {
                    if (vote.type === "UP") accumulator++;
                    if (vote.type === "DOWN") accumulator--;
                    return accumulator;
                  },
                  0
                );
                const topLevelCommentVote = topLevelComment.votes.find(
                  (vote) => vote.userId === currentUser?.id
                );
                return (
                  <div key={topLevelComment.id} className="flex flex-col">
                    <div
                      className={
                        topLevelComment.replies.length !== 0 ? "mb-2" : ""
                      }
                    >
                      <PostComment
                        comment={topLevelComment}
                        initialCommentVoteAmount={topLevelCommentAmount}
                        initialCommentVote={topLevelCommentVote?.type}
                        userId={currentUser?.id}
                        postId={postId}
                        isDeletable={topLevelComment.replies.length === 0}
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
                );
              })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CommentsSection;
