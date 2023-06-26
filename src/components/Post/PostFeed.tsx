"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from "@mantine/hooks";
import { ExtendedPost } from "@/types/database";
import { useInfiniteQuery } from "react-query";
import { FC, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { Forum, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import PostCard from "./PostCard";
import { StatusCodes } from "http-status-codes";
import { cn } from "@/lib/utils";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  forumName?: Forum["name"];
  userId?: User["id"];
}

/**
 * Component for displaying a feed of posts.
 */
const PostFeed: FC<PostFeedProps> = ({ initialPosts, forumName, userId }) => {
  const [endOfThePosts, setEndOfThePosts] = useState<boolean>(false);
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const fetchPosts = async ({ pageParam = 1 }): Promise<ExtendedPost[]> => {
    setEndOfThePosts(false);
    const query =
      `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
      (forumName ? `&forumName=${forumName}` : "");
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
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-4">
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
          <li key={index} ref={isLastPost ? ref : null}>
            <PostCard
              post={post}
              currentVote={currentVote?.type}
              votesAmount={voteCount}
              forumName={forumName ?? post.forum.name}
              commentAmount={post.comments.length}
              isLoggedIn={!!userId}
            />
          </li>
        );
      })}
      {isFetchingNextPage && !endOfThePosts && (
        <>
          <li className="hidden dark:flex dark:justify-center py-2">
            <PulseLoader color="#d4d4d8" size={10} />
          </li>
          <li className="dark:hidden flex justify-center">
            <PulseLoader color="#09090b" size={10} />
          </li>
        </>
      )}
      {endOfThePosts && (
        <li className={cn("text-center text-gray-500")}>
          Impressive, it looks like you&apos;ve caught up.
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
