"use client";

import { Fragment } from "react";
import type { Post } from "@prisma/client";

import formatTimeToNow from "@/lib/formatTimeToNow";

interface UserPostsProps {
  posts: Post[] | null;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  return (
    <div
      className={`mx-auto my-4 flex max-w-5xl flex-col items-start justify-start gap-4 px-4 py-2 sm:px-6 lg:px-8`}
    >
      {posts?.length !== 0 ? (
        <Fragment>
          <h1 className="text-lg font-bold">Published Posts</h1>
          <div className="h-60 max-h-full overflow-hidden overflow-y-scroll">
            {posts?.map((post) => {
              return (
                <article
                  key={post.id}
                  className="inline-flex items-center gap-2 overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                >
                  <h2 className="px-4 py-2">{post.title}</h2>
                  <time className="h-full bg-zinc-300 px-4 py-2 dark:bg-zinc-800">
                    {formatTimeToNow(post.createdAt)}
                  </time>
                </article>
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
