"use client";

import { Fragment } from "react";
import { useMediaQuery } from "@mantine/hooks";
import type { Comment, CommentVote, User } from "@prisma/client";
import { MessageSquare, MessageSquareIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../UI/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../UI/sheet";
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
  postId?: string;
  currentUser: User | null;
  comments: ModifiedComment[] | null;
}

const CommentsSection = async ({
  postId,
  currentUser,
  comments,
}: CommentsSectionProps) => {
  const isMobileScreen = useMediaQuery("(min-width: 640px)");
  if (!comments || !postId) return null;
  const topLevelComments = comments.filter((comment) => !comment.replyToId);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 dark:hover:border-zinc-500">
          <MessageSquare size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex w-full flex-col gap-4 border-zinc-800 md:w-[840px]"
        side={isMobileScreen ? "right" : "bottom"}
      >
        <SheetHeader>
          <SheetTitle>Top Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <section
          className="no-scrollbar flex h-[59vh] w-full flex-col gap-2 overflow-hidden overflow-y-scroll rounded-md md:h-full"
          id="comments"
        >
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
        <CreateComment postId={postId} />
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSection;
