"use client";

import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import { MessageSquare, MessageSquareDashed } from "lucide-react";

import type { ExtendedComment } from "@/types/database";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Comment from "./comment";
import CreateComment from "./create-comment";

interface CommentsSectionProps {
  postId?: string;
  comments: ExtendedComment[] | null;
  userId?: User["id"];
  isAdmin?: boolean;
}

const CommentsSection = ({
  postId,
  userId,
  comments,
  isAdmin,
}: CommentsSectionProps) => {
  const isMobileScreen = useMediaQuery("(min-width: 640px)");
  if (!comments || !postId) return null;
  const topLevelComments = comments.filter((comment) => !comment.replyToId);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 hover:bg-pink-300 dark:hover:border-zinc-300 dark:hover:bg-zinc-900"
          aria-label="Comments"
        >
          <MessageSquare size={20} />
          {comments.length !== 0 && (
            <div className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-green-500 p-1 text-zinc-50">
              <p>{comments.length > 10 ? "10+" : comments.length}</p>
            </div>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex w-full flex-col gap-4 border-zinc-800 p-0 md:w-[840px]"
        side={isMobileScreen ? "right" : "bottom"}
      >
        <SheetHeader className="px-4 pt-5">
          <SheetTitle>Top Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <section
          className="no-scrollbar flex h-[50vh] w-full flex-col gap-2 overflow-hidden overflow-y-scroll rounded-md px-4 py-5 md:h-full"
          id="comments"
        >
          {topLevelComments.length === 0 && (
            <div className="flex size-full flex-col items-center justify-center gap-2">
              <MessageSquareDashed className="size-10" />
              <p>No comments</p>
            </div>
          )}
          {topLevelComments.length !== 0 && (
            <div className="flex flex-col gap-4">
              {topLevelComments.map((topLevelComment) => (
                <Comment
                  key={topLevelComment.id}
                  comment={topLevelComment}
                  userId={userId}
                  postId={postId}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </section>
        <div className="border-t-2 border-zinc-800 bg-zinc-50 px-3 py-5 dark:bg-zinc-900">
          <CreateComment postId={postId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSection;
