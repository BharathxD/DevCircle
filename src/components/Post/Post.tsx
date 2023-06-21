import { FC, Fragment, useRef } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import Link from "next/link";
import formatTimeToNow from "@/libs/formatTimeToNow";
import { Post, User, Vote } from "@prisma/client";
import EditorOutput from "../UI/EditorOutput";
import PostVoteClient from "./PostVoteClient";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmount: number;
  forumName?: string;
  commentAmount: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  post,
  forumName,
  commentAmount,
  votesAmount: _votesAmount,
  currentVote: _currentVote,
}) => {
  const postRef = useRef<HTMLParagraphElement>(null);
  const isPostOverflowed = postRef.current?.clientHeight === 160;

  return (
    <div className="rounded-md bg-zinc-50 border-2 border-zinc-800">
      <div className="px-6 py-4 flex justify-between flex-col md:flex-row">
        <PostVoteClient
          postId={post.id}
          initialVoteAmount={_votesAmount}
          initialVote={_currentVote?.type}
        />
        <div className=" w-full flex flex-col gap-1">
          <div className="max-h-40 mt-1 flex flex-row gap-1 text-sm text-zinc-500">
            {forumName && (
              <Fragment>
                <Link href={`/c/${forumName}`}>
                  <p className="underline text-zinc-900 text-md underline-offset-2">
                    c/{forumName}
                  </p>
                </Link>
                <span className="px-1">•</span>
              </Fragment>
            )}
            <span>Posted by u/{post.author.name}</span>
            {" " + formatTimeToNow(new Date(post.createdAt))}
          </div>
          <Link href={`/c/${forumName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold pt-2 leading-6 text-zinc-900">
              {post.title}
            </h1>
          </Link>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={postRef}
          >
            <EditorOutput content={post.content} />
            {isPostOverflowed && (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 border-t-2 border-t-zinc-800 z-20 text-sm rounded-b-md">
        <Link href={`/c/${forumName}/post/${post.id}`}>
          <p className="py-3 px-6 w-fit flex items-center gap-2 border-r-2 border-r-zinc-800 hover:bg-yellow-100 rounded-bl-md">
            <BiMessageAltDetail size={25} /> {commentAmount} comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
