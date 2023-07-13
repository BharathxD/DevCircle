"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import type { Forum, User } from "@prisma/client";
import axios from "axios";
import type { AxiosError } from "axios";
import { motion } from "framer-motion";
import { StatusCodes } from "http-status-codes";
import queryString from "query-string";
import { useInfiniteQuery } from "react-query";
import { PulseLoader } from "react-spinners";

import type { ExtendedPost } from "@/types/database";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config/site";
import { cn } from "@/lib/utils";

import PostCard from "./PostCard";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  forumName?: Forum["name"];
  userId?: User["id"];
  filters?: {
    tag: string;
  };
}

const container = {
  hidden: { opacity: 0, transition: { delay: 0 } },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.125,
      ease: "easeOut",
      duration: 1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const PostFeed: React.FC<PostFeedProps> = ({
  initialPosts,
  forumName,
  userId,
  filters,
}) => {
  const [endOfThePosts, setEndOfThePosts] = useState<boolean>(false);
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const fetchPosts = async ({ pageParam = 1 }): Promise<ExtendedPost[]> => {
    setEndOfThePosts(false);
    const queryParams = queryString.stringify({
      limit: INFINITE_SCROLL_PAGINATION_RESULTS,
      page: pageParam,
      forumName,
      ...filters,
    });
    const query = `/api/posts?${queryParams}`;
    const response = await axios.get(query);
    return response.data as ExtendedPost[];
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "infinite-query",
    fetchPosts,
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
      retry: (_, error: AxiosError) => {
        if (error.response?.status === StatusCodes.NOT_FOUND)
          setEndOfThePosts(true);
        return false;
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <motion.ul
      className="col-span-2 flex flex-col space-y-4"
      variants={container}
    >
      {posts.map((post, index) => {
        const voteCount = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") {
            return acc + 1;
          }
          if (vote.type === "DOWN") {
            return acc - 1;
          }
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => vote.userId === userId);

        const isLastPost = index === posts.length - 1;

        return (
          <motion.li key={index} ref={isLastPost ? ref : null} variants={item}>
            <PostCard
              post={post}
              currentVote={currentVote?.type}
              votesAmount={voteCount}
              forumName={forumName ?? post.forum.name}
              commentAmount={post.comments.length}
              isLoggedIn={!!userId}
            />
          </motion.li>
        );
      })}
      {isFetchingNextPage && !endOfThePosts && (
        <>
          <li className="hidden py-2 dark:flex dark:justify-center">
            <PulseLoader color="#d4d4d8" size={10} />
          </li>
          <li className="flex justify-center dark:hidden">
            <PulseLoader color="#09090b" size={10} />
          </li>
        </>
      )}
      {endOfThePosts && (
        <li className={cn("text-center text-gray-500")}>
          Impressive, it looks like you&apos;ve caught up.
        </li>
      )}
    </motion.ul>
  );
};

export default PostFeed;
