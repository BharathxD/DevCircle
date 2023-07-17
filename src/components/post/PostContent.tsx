"use client";

import { Fragment, useCallback, useState } from "react";
import Link from "next/link";
import type { Tag } from "@prisma/client";
import { Dot } from "lucide-react";

import formatTimeToNow from "@/lib/formatTimeToNow";
import { cn } from "@/lib/utils";

import PostDropdownMenu from "../ui/PostDropdownMenu";
import Tags from "../ui/Tags";
import UserAvatar from "../ui/UserAvatar";
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
  const RenderUserInfo = () => {
    if (isEditing) return null;
    return (
      <div className="flex flex-row items-center gap-2">
        <UserAvatar
          user={{
            name: username,
            image: userimage,
          }}
        />
        <p className="mt-1 flex max-h-40 items-center truncate text-sm text-zinc-800 dark:text-zinc-300 md:text-base">
          <Link href={`/u/${username}`}>Posted by u/{username}</Link>
          <Dot />
          {formatTimeToNow(new Date(createdAt))}
        </p>
      </div>
    );
  };

  return (
    <Fragment>
      {!isEditing && (
        <header className="flex flex-col gap-4 bg-zinc-200 p-4 dark:bg-zinc-950/10">
          <Tags tags={tags} />
          {isAuthor && (
            <PostDropdownMenu onEdit={toggleEditing} postId={postId} />
          )}
          <div
            className={cn(
              "flex w-full justify-between",
              isEditing && "justify-end"
            )}
          >
            <RenderUserInfo />
          </div>
          <h1 className="py-1 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 md:text-3xl md:leading-6 lg:text-4xl">
            {title}
          </h1>
        </header>
      )}
      <div className="flex flex-col gap-4 p-4 dark:bg-zinc-900" id="editor-content">
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
    </Fragment>
  );
};

export default PostContent;
