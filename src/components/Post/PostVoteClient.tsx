"use client";

import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import cn from "@/libs/classNames";

interface PostVoteClientProps {
  postId: string;
  initialVote?: VoteType | null;
  initialVoteAmount: number;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVoteAmount,
  initialVote,
}) => {
  const [votesAmount, setVotesAmount] =
    useState<typeof initialVoteAmount>(initialVoteAmount);
  const [currentVote, setCurrentVote] =
    useState<typeof initialVote>(initialVote);
  const prevVote = usePrevious(currentVote);
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);
  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" aria-label="upvote">
        <BsArrowUpSquareFill
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>
      <Button size="sm" aria-label="upvote">
        <BsArrowDownSquareFill
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
