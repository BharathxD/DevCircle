"use client";

import { useRef } from "react";
import type { FC } from "react";
import Link from "next/link";
import siteConfig from "@/config";
import type { Post, Tag, User, Vote } from "@prisma/client";
import { motion } from "framer-motion";
import { BiMessageAltDetail } from "react-icons/bi";

import formatTimeToNow from "@/lib/formatTimeToNow";

import ShareButton from "../UI/ShareButton";
import Tags from "../UI/Tags";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./PostVoteClient";

interface PostCardProps {
  post: Post & {
    author: User;
    votes: Vote[];
    tags: Tag[];
  };
  votesAmount: number;
  forumName: string;
  commentAmount: number;
  currentVote?: Vote["type"];
  isLoggedIn?: boolean;
}

/**
 * Represents a post card component.
 */
const PostCard: FC<PostCardProps> = ({
  post,
  forumName,
  commentAmount,
  votesAmount,
  currentVote,
  isLoggedIn,
}) => {
  const postRef = useRef<HTMLParagraphElement>(null);
  const isPostOverflowed = postRef.current?.clientHeight === 160;
  const postUrl = `${siteConfig.url}/d/${forumName}/post/${post.id}`;

  const postContent = (
    <div
      className="relative z-10 max-h-40 w-full overflow-hidden text-sm"
      ref={postRef}
    >
      <EditorOutput content={post.content} sm />
      {isPostOverflowed && (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-900"></div>
      )}
    </div>
  );

  const postMetaInfo = (
    <div className="mt-1 flex max-h-40 flex-row justify-between gap-1 text-sm text-zinc-500">
      <div className="inline-flex">
        <Link href={`/d/${forumName}`}>
          <p className="text-zinc-800 underline underline-offset-2 dark:text-zinc-50">
            d/{forumName}
          </p>
        </Link>
        <span className="px-1 text-zinc-800 dark:text-zinc-50">•</span>
        <span className="text-zinc-800 dark:text-zinc-50">
          Posted by u/{post.author.username ?? post.author.username}
        </span>
      </div>
      <time>{" " + formatTimeToNow(new Date(post.createdAt))}</time>
    </div>
  );

  return (
    <motion.article
      className="overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
      initial={{ opacity: 0, backdropFilter: "blur(4px)" }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="flex flex-col justify-between px-6 py-4 md:flex-row">
        <div className="py-2 pr-4">
          <PostVoteClient
            postId={post.id}
            initialVoteAmount={votesAmount}
            initialVote={currentVote}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          {postMetaInfo}
          <Link
            href={`/d/${forumName}/post/${post.id}`}
            className="pt-2 text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-50"
            aria-label={post.title}
          >
            {post.title}
          </Link>
          {postContent}
        </div>
      </div>
      <div className="z-20 flex h-12 w-full flex-row items-center justify-between rounded-b-md border-t-2 border-t-zinc-800 text-sm">
        <Link
          href={`/d/${forumName}/post/${post.id}`}
          className="flex h-full w-fit items-center gap-2 border-r-2 border-r-zinc-800 px-6 font-medium hover:bg-yellow-300 dark:hover:bg-zinc-800"
        >
          <BiMessageAltDetail size={25} /> {commentAmount}{" "}
          <p className="hidden md:inline-block">comments</p>
        </Link>
        <div className="flex h-full w-full flex-row items-center justify-end">
          <div className="no-scrollbar flex h-full max-w-full flex-row items-center gap-2 overflow-hidden overflow-x-scroll px-2">
            <Tags tags={post.tags} />
          </div>
          <ShareButton
            url={postUrl}
            className="border-0 border-l-2 border-l-zinc-800"
          />
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
