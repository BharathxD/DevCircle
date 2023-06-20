import { FC, Fragment, useRef } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import Link from "next/link";
import formatTimeToNow from "@/libs/formatTimeToNow";
import { Post, User, Vote } from "@prisma/client";

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  forumName: string;
}

const Post: FC<PostProps> = ({ post, forumName }) => {
  const postRef = useRef<HTMLParagraphElement>(null);
  const isPostOverflowed = postRef.current?.clientHeight === 160;

  return (
    <div className="rounded-md bg-zinc-50 border-2 border-zinc-800">
      <div className="px-6 py-4 flex justify-between">
        <div className=" w-full flex flex-col gap-1">
          <div className="max-h-40 mt-1 flex flex-row gap-1 text-sm text-zinc-500">
            {forumName && (
              <Fragment>
                <Link href={`/r/${forumName}`}>
                  <p className="underline text-zinc-900 text-md underline-offset-2">
                    r/{forumName}
                  </p>
                </Link>
                <span className="px-1">•</span>
              </Fragment>
            )}
            <span>Posted by u/{post.author.name}</span>
            {" " + formatTimeToNow(new Date(post.createdAt))}
          </div>
          <Link href={`/r/${forumName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-zinc-900">
              {post.title}
            </h1>
          </Link>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={postRef}
          >
            {isPostOverflowed && (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-zinc-50 to-transparent"></div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 rounded-md z-20 text-sm px-4 py-4 sm:px-6">
        <Link href={`/r/${forumName}/post/${post.id}`} passHref>
          <p className="w-fit flex items-center gap-2">
            <BiMessageAltDetail size={25} /> 3 comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
