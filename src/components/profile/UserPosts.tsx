"use client";

import { Fragment } from "react";
import type { Forum, Post } from "@prisma/client";

import formatTimeToNow from "@/lib/formatTimeToNow";

interface UserPostsProps {
  posts: (Post & { forum: Forum })[] | null;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  return (
    <div className="mx-auto my-2 flex max-w-5xl flex-col items-start justify-start gap-4 px-4 py-2 sm:px-6 lg:px-8">
      {posts?.length !== 0 ? (
        <Fragment>
          <h1 className="text-lg font-bold">Published Posts</h1>
          <div
            className="flex flex-col gap-2 overflow-y-auto"
            style={{ maxHeight: "60vh" }}
          >
            {posts?.map((post) => {
              return (
                <a
                  key={post.id}
                  className="inline-flex items-center justify-between gap-2 rounded-md border-2 border-zinc-800 bg-zinc-50 hover:bg-zinc-300 dark:bg-zinc-950 dark:hover:bg-zinc-800"
                  href={`/d/${post.forum.name}/post/${post.id}`}
                >
                  <h2 className="px-4 py-2">{post.title}</h2>
                  <time className="hidden h-full items-center justify-center bg-zinc-300 px-4 py-2 dark:bg-zinc-800 md:flex">
                    {formatTimeToNow(post.createdAt)}
                  </time>
                </a>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <p className="font-semibold">User has not made any posts yet.</p>
      )}
    </div>
  );
};

export default UserPosts;
