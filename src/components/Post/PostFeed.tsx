"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from "@mantine/hooks";
import { ExtendedPost } from "@/types/database";
import { useInfiniteQuery } from "react-query";
import { FC, useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { Forum, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import PostCard from "./PostCard";

/**
 * Props for the PostFeed component.
 */
interface PostFeedProps {
  initialPosts: ExtendedPost[];
  forumName?: Forum["name"];
  userId?: User["id"];
}

/**
 * Component for displaying a feed of posts.
 */
const PostFeed: FC<PostFeedProps> = ({ initialPosts, forumName, userId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  /**
   * Fetches posts from the server.
   * @param pageParam The page number for pagination.
   * @returns An array of ExtendedPost objects.
   */
  const fetchPosts = async ({ pageParam = 1 }): Promise<ExtendedPost[]> => {
    const query =
      `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
      (forumName ? `&forumName=${forumName}` : "");
    const response = await axios.get(query);
    return response.data as ExtendedPost[];
  };

  const { data, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery(
    "infinite-query",
    fetchPosts,
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
      retry: (failureCount, error: AxiosError) => {
        if (failureCount > 5 || error.response?.status === 200) {
          return false;
        }
        return true;
      },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  useEffect(() => {
    console.log(error);
  }, [error]);

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
      {isFetchingNextPage && posts.length !== 0 && (
        <>
          <li className="hidden dark:flex dark:justify-center py-2">
            <PulseLoader color="#d4d4d8" size={10} />
          </li>
          <li className="dark:hidden flex justify-center pb-4">
            <PulseLoader
              className="block dark:hidden"
              color="#09090b"
              size={10}
            />
          </li>
        </>
      )}
      {posts.length === 0 && (
        <li className="text-center text-gray-500">
          Looks like you&apos;ve caught up
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
