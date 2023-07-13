"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrevious } from "@mantine/hooks";
import type { VoteType } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useMutation } from "react-query";

import { cn } from "@/lib/utils";
import type { CommentVoteRequest } from "@/lib/validators/vote";
import { toast } from "@/hooks/useToast";

import { Button } from "../ui/Button";

interface CommentVotesProps {
  commentId: string;
  initialVoteAmount: number;
  initialCommentVote?: VoteType | null;
  isLoggedIn?: boolean;
  classNames?: string;
}

const CommentVotes: React.FC<CommentVotesProps> = ({
  commentId,
  initialVoteAmount,
  initialCommentVote,
  isLoggedIn,
  classNames,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [commentsAmount, setCommentsAmount] =
    useState<number>(initialVoteAmount);
  const [currentVote, setCurrentVote] = useState(initialCommentVote);
  const prevVote = usePrevious(currentVote);
  useEffect(() => {
    setCurrentVote(initialCommentVote);
  }, [initialCommentVote]);
  const { mutate: vote, isLoading } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType: type,
      };
      await axios.patch("/api/forum/post/comment/vote", payload);
    },

    onError: async (error, voteType) => {
      if (voteType === "UP") setCommentsAmount((prev) => prev - 1);
      else setCommentsAmount((prev) => prev + 1);

      setCurrentVote(prevVote);

      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        return router.push(`/signin/?callbackUrl=${pathname}`);
      }
      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setCommentsAmount((prev) => prev - 1);
        else if (type === "DOWN") setCommentsAmount((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP")
          setCommentsAmount((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setCommentsAmount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });
  const handleVote = useCallback(
    (voteType: "UP" | "DOWN") => {
      if (!isLoggedIn) return router.push(`/signin/?callbackUrl=${pathname}`);
      vote(voteType);
    },
    [isLoggedIn, pathname, router, vote]
  );
  return (
    <div
      className={cn("flex h-full w-auto flex-row items-center gap-4")}
    >
      <Button
        size="sm"
        variant="noDisableOutline"
        aria-label="upvote"
        onClick={() => handleVote("UP")}
        className={cn(
          "h-11 rounded-xl bg-zinc-50 text-zinc-800 hover:bg-green-300 hover:text-zinc-800 hover:outline-2 hover:outline-green-500 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-green-500 dark:hover:text-zinc-50",
          {
            "bg-green-300 dark:bg-green-500 dark:outline-green-600":
              currentVote === "UP",
          }
        )}
        disabled={isLoading && currentVote === "UP"}
      >
        <AiOutlineArrowUp className={"h-5 w-5"} />
      </Button>
      <p className="py-2 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {commentsAmount}
      </p>
      <Button
        size="sm"
        variant="noDisableOutline"
        aria-label="downvote"
        onClick={() => handleVote("DOWN")}
        className={cn(
          "h-11 rounded-xl bg-zinc-50 text-zinc-800 hover:bg-red-300 hover:text-zinc-800 hover:outline-2 hover:outline-red-500 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-red-500 dark:hover:text-zinc-50",
          {
            "bg-red-300 dark:bg-red-500 dark:outline-red-600":
              currentVote === "DOWN",
          }
        )}
        disabled={isLoading && currentVote === "DOWN"}
      >
        <AiOutlineArrowDown className={"h-5 w-5"} />
      </Button>
    </div>
  );
};

export default CommentVotes;
