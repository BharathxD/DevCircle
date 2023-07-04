"use client";

import { Fragment } from "react";
import { useMediaQuery } from "@mantine/hooks";
import type { Comment, CommentVote, User } from "@prisma/client";
import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

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
        <button className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 hover:bg-pink-300 dark:hover:border-zinc-300 dark:hover:bg-zinc-900">
          <MessageSquare size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex w-full flex-col gap-4 border-zinc-800 p-0 md:w-[840px]"
        side={isMobileScreen ? "right" : "bottom"}
      >
        <SheetHeader className="px-4 py-5">
          <SheetTitle>Top Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <section
          className="no-scrollbar flex h-[59vh] w-full flex-col gap-2 overflow-hidden overflow-y-scroll rounded-md px-4 py-5 md:h-full"
          id="comments"
        >
          {topLevelComments.length !== 0 && (
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
        <div className="border-t-2 border-zinc-800 bg-zinc-900 px-3 py-5">
          <CreateComment postId={postId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSection;
