"use client";

import { ExtendedPost } from "@/types/database";
import { Forum, User } from "@prisma/client";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "react-query";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import axios, { AxiosError } from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import Post from "./Post";
import { BeatLoader, PulseLoader } from "react-spinners";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  forumName?: Forum["name"];
  userId?: User["id"];
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, forumName, userId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const fetchPosts = async ({ pageParam = 1 }) => {
    const query =
      `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
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
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-4 md:mb-10">
      {posts.map((post, index) => {
        const voteCount = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => vote.userId === userId);

        const isLastPost = index === posts.length - 1;

        return (
          <li key={index} ref={isLastPost ? ref : null}>
            <Post
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
          <li className="hidden dark:flex dark:justify-center py-2 md:pb-0">
            <PulseLoader color="#d4d4d8" size={10} />
          </li>
          <li className="dark:hidden flex justify-center pb-4 md:pb-0">
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
