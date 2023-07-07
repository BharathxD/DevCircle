"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { Tag } from "@prisma/client";
import { Dot } from "lucide-react";

import formatTimeToNow from "@/lib/formatTimeToNow";
import { cn } from "@/lib/utils";

import PostDropdownMenu from "../UI/PostDropdownMenu";
import Tags from "../UI/Tags";
import UserAvatar from "../UI/UserAvatar";
import EditorOutput from "./EditorOutput";
import UpdatePost from "./UpdatePost";

interface PostContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  postId: string;
  title: string;
  tags: Tag[];
  username: string;
  userimage: string | null;
  banner?: string;
  createdAt: Date;
  isAuthor: boolean;
}

const PostContent: React.FC<PostContentProps> = ({
  content,
  postId,
  title,
  tags,
  username,
  userimage,
  createdAt,
  isAuthor,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEditing = useCallback(() => setIsEditing((prev) => !prev), []);
  const renderUserInfo = () => {
    if (isEditing) return null;
    return (
      <div className="flex flex-row items-center gap-2">
        <UserAvatar
          user={{
            name: username,
            image: userimage,
          }}
        />
        <p className="mt-1 flex max-h-40 items-center truncate text-zinc-500 dark:text-zinc-300">
          <Link href={`/user/${username}`}>Posted by u/{username}</Link>
          <Dot />
          {formatTimeToNow(new Date(createdAt))}
        </p>
      </div>
    );
  };

  return (
    <article id="post">
      {!isEditing && (
        <header className="flex flex-col gap-4 bg-zinc-200 p-4 dark:bg-zinc-950/10">
          <Tags tags={tags} />
          <div
            className={cn(
              "flex w-full justify-between",
              isEditing && "justify-end"
            )}
          >
            {renderUserInfo()}
            {isAuthor && (
              <PostDropdownMenu onEdit={toggleEditing} postId={postId} />
            )}
          </div>
          <h1 className="py-1 text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 sm:text-2xl md:text-3xl md:leading-6 lg:text-4xl">
            {title}
          </h1>
        </header>
      )}
      <div className="flex flex-col gap-4 p-4 dark:bg-zinc-900">
        {!isEditing ? (
          <EditorOutput content={content} />
        ) : (
          <UpdatePost
            toggleEdit={toggleEditing}
            postId={postId}
            title={title}
            blocks={content.blocks}
            tags={tags}
          />
        )}
      </div>
    </article>
  );
};

export default PostContent;
