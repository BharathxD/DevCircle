"use client";

import { Fragment } from "react";
import type { Comment, CommentVote, User } from "@prisma/client";

import { cn } from "@/lib/utils";

import { Label } from "../UI/Label";
import CommentReplies from "./CommentReplies";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

type ModifiedComment = Comment & {
  author: User;
  replies: (Comment & {
    author: User;
    votes: CommentVote[];
  })[];
  votes: CommentVote[];
};

interface CommentsSectionProps {
  postId: string;
  currentUser: User | null;
  comments: ModifiedComment[] | null;
}

const CommentsSection = async ({
  postId,
  currentUser,
  comments,
}: CommentsSectionProps) => {
  if (!comments) return null;
  const topLevelComments = comments.filter((comment) => !comment.replyToId);
  return (
    <section className="flex flex-col gap-2" id="comments">
      <Label className="mb-2 ml-1 text-lg">
        Top Comments ({comments.length})
      </Label>
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
    </section>
  );
};

export default CommentsSection;
