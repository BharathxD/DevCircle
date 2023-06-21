"use client";

import { ExtendedPost } from "@/types/database";
import { Forum, User } from "@prisma/client";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "react-query";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import Post from "./Post";

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
      (forumName ? `&forum=${forumName}` : "");

    const response = await axios.get(query);
    return response.data as ExtendedPost[];
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "infinite-query",
    fetchPosts,
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col gap-2 col-span-2 space-y-6">
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
              currentVote={currentVote}
              votesAmount={voteCount}
              forumName={forumName ?? post.forum.name}
              commentAmount={post.comments.length}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostFeed;
