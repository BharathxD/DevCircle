"use client";

import { Fragment, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Comment, CommentVote, User, VoteType } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { MessageSquare, MoreVertical } from "lucide-react";
import queryString from "query-string";
import { useMutation } from "react-query";

import formatTimeToNow from "@/lib/formatTimeToNow";
import { generateCbUrl } from "@/lib/utils";
import type { CommentPayload } from "@/lib/validators/comments";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { toast } from "@/hooks/useToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import CommentVotes from "../post/CommentVotes";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import UserAvatar from "../ui/UserAvatar";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  initialCommentVoteAmount: number;
  initialCommentVote?: VoteType;
  userId?: string;
  postId: string;
  isDeletable: boolean;
  isAdmin?: boolean;
}

const PostComment: React.FC<PostCommentProps> = ({
  comment,
  initialCommentVoteAmount,
  initialCommentVote,
  userId,
  postId,
  isDeletable,
  isAdmin,
}) => {
  const pathname = usePathname();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>(
    `@${comment.author?.username ?? "reply"} `
  );
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useOnClickOutside(commentRef, () => setIsReplying(false));
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);
  const toggleReplying = () => {
    if (!userId && !isAdmin) {
      const redirectPath = `/signin?${queryString.stringify({
        unauthorized: 1,
      })}`;
      return router.push(redirectPath);
    }
    setIsReplying((prev) => !prev);
  };
  const handleReply = () => {
    if (!input) return;
    return reply({
      postId,
      text: input,
      replyToId: comment.replyToId ?? comment.id,
    });
  };
  const { mutate: reply, isLoading: replyIsLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentPayload) => {
      const payload: CommentPayload = {
        postId,
        text,
        replyToId,
      };
      const { data } = await axios.patch(`/api/forum/post/comment `, payload);
      return data as { message: string };
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        return router.push(generateCbUrl(pathname));
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setIsReplying(false);
      router.refresh();
      setInput("");
    },
  });
  return (
    <div
      className="flex flex-col gap-3 overflow-hidden rounded-xl border-2 border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50"
      ref={commentRef}
    >
      <div className="flex items-center px-4 pt-3">
        <UserAvatar user={comment.author} className="h-6 w-6" />
        <div className="ml-2 flex w-full items-center justify-between">
          <div>
            <p className="font-medium text-zinc-800 dark:text-zinc-50">
              u/{comment.author.username ?? comment.author.username}
            </p>
            <p className="max-h-40 truncate text-sm text-zinc-500">
              {formatTimeToNow(new Date(comment.createdAt))}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            {(comment.authorId === userId || isAdmin) && (
              <Fragment>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:opacity-75">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    sideOffset={10}
                    align="end"
                    className="w-fit rounded-md border-2 border-zinc-800 bg-zinc-50 p-0 dark:bg-zinc-900"
                  >
                    <DropdownMenuItem asChild>
                      <EditComment commentId={comment.id} text={comment.text} />
                    </DropdownMenuItem>
                    {isDeletable && (
                      <DropdownMenuItem asChild>
                        <DeleteComment commentId={comment.id} />
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <p className="px-4 pb-2 text-zinc-900 dark:text-zinc-50">
        {comment.text}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex w-full flex-row items-center gap-5 px-4 pb-3">
          <CommentVotes
            commentId={comment.id}
            initialVoteAmount={initialCommentVoteAmount}
            initialCommentVote={initialCommentVote}
            isLoggedIn={!!userId}
            classNames="h-10 flex-row w-min"
          />
          <Button
            onClick={toggleReplying}
            variant="noDisableOutline"
            className="h-[2.875rem] rounded-xl bg-zinc-50 px-3 text-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:text-zinc-50"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
        {isReplying && (
          <div className="grid w-full gap-1.5 p-3 dark:bg-zinc-800/50">
            <label htmlFor="comment">Your comment</label>
            <div className="mt-2">
              <Textarea
                id="comment"
                autoFocus
                onFocus={(event) =>
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  event.currentTarget.setSelectionRange(
                    event.currentTarget.value.length,
                    event.currentTarget.value.length
                  )
                }
                value={input}
                onChange={handleInputChange}
                rows={1}
                className="border-2 border-zinc-800"
                placeholder={`What do you think about u/${
                  comment.author.username || comment.author.username || ""
                }'s comment?`}
              />
              <div className="flex justify-end gap-3 pl-3 pt-5">
                <Button variant="destructive" onClick={toggleReplying}>
                  Cancel
                </Button>
                <Button
                  disabled={replyIsLoading || input.length === 0}
                  isLoading={replyIsLoading}
                  onClick={handleReply}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
