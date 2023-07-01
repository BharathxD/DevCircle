import { Fragment } from "react";
import getComments from "@/actions/getComments";
import getCurrentUser from "@/actions/getCurrentUser";

import { cn } from "@/lib/utils";

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
  const comments = await getComments(postId);
  if (!comments) return null;
  const topLevelComments = comments.filter((comment) => !comment.replyToId);
  return (
    <div className="flex flex-col gap-2">
      <Label className="mb-2 ml-1">Top Comments ({comments.length})</Label>
      <CreateComment postId={postId} />
      {comments.length !== 0 && (
        <Fragment>
          <div className="flex flex-col gap-4">
            {topLevelComments.map((topLevelComment) => {
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
              const hasReplies = topLevelComment.replies.length !== 0;
              return (
                <div key={topLevelComment.id} className="flex flex-col">
                  <div className={cn(hasReplies && "mb-2")}>
                    <PostComment
                      comment={topLevelComment}
                      initialCommentVoteAmount={topLevelCommentAmount}
                      initialCommentVote={topLevelCommentVote?.type}
                      userId={currentUser?.id}
                      postId={postId}
                      isDeletable={!hasReplies}
                    />
                  </div>
                  {hasReplies && (
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
