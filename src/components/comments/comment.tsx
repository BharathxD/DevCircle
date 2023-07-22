import type { ExtendedComment } from "@/types/database";
import { cn } from "@/lib/utils";

import CommentReplies from "./comment-replies";
import PostComment from "./post-comment";

interface CommentProps {
  comment: ExtendedComment;
  userId?: string;
  postId: string;
  isAdmin?: boolean;
}

const Comment = ({ comment, userId, postId, isAdmin }: CommentProps) => {
  const commentAmount = comment.votes.reduce((accumulator, vote) => {
    if (vote.type === "UP") accumulator++;
    if (vote.type === "DOWN") accumulator--;
    return accumulator as number;
  }, 0);

  const commentVote = comment.votes.find((vote) => vote.userId === userId);
  const hasReplies = comment.replies.length !== 0;

  return (
    <div className="flex flex-col">
      <div className={cn(hasReplies && "mb-2")}>
        <PostComment
          comment={comment}
          initialCommentVoteAmount={commentAmount}
          initialCommentVote={commentVote?.type}
          userId={userId}
          postId={postId}
          isAdmin={isAdmin}
        />
      </div>
      {hasReplies && (
        <CommentReplies
          postId={postId}
          topLevelComment={comment}
          userId={userId}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default Comment;
