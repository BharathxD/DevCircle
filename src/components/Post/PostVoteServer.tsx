import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import type { Post, Vote, VoteType } from "@prisma/client";

import PostVoteClient from "./PostVoteClient";

interface PostVoteServerProps {
  postId: Post["id"];
  initialVote?: VoteType;
  initialVotesAmount?: number;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
  className?: string;
}

const PostVoteServer = async ({
  postId,
  initialVotesAmount,
  initialVote,
  getData,
  className,
}: PostVoteServerProps) => {
  const currentUser = await getCurrentUser();
  let votesAmount = 0;
  let currentVote: VoteType | null | undefined = undefined;
  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    votesAmount = post.votes.reduce((accumulator, vote) => {
      if (vote.type === "UP") return accumulator + 1;
      if (vote.type === "DOWN") return accumulator - 1;
      return accumulator;
    }, 0);

    currentVote = post.votes.find(
      (vote) => vote.userId === currentUser?.id
    )?.type;
  } else if (initialVote && initialVotesAmount) {
    votesAmount = initialVotesAmount;
    currentVote = initialVote;
  }
  return (
    <PostVoteClient
      postId={postId}
      initialVote={currentVote}
      initialVoteAmount={votesAmount}
      isLoggedIn={!!currentUser}
      className={className}
    />
  );
};

export default PostVoteServer;
