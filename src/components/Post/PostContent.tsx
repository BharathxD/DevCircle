"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { Tag } from "@prisma/client";
import { Dot } from "lucide-react";

import formatTimeToNow from "@/lib/formatTimeToNow";
import { cn } from "@/lib/utils";

import { Badge } from "../UI/Badge";
import PostDropdownMenu from "../UI/PostDropdownMenu";
import UserAvatar from "../UI/UserAvatar";
import UpdatePost from "./UpdatePost";

interface PostContentProps {
  content: any;
  postId: string;
  title: string;
  tags: Tag[];
  username: string | null;
  userimage: string | null;
  banner?: string;
  createdAt: Date;
  isEditable: boolean;
}

const PostContent: React.FC<PostContentProps> = ({
  content,
  postId,
  title,
  tags,
  username,
  userimage,
  createdAt,
  isEditable,
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
          Posted by u/{username}
          <Dot />
          {formatTimeToNow(new Date(createdAt))}
        </p>
      </div>
    );
  };

  return (
    <article id="post">
      {!isEditing && (
        <header className="flex flex-col gap-4 p-4 dark:bg-zinc-950/10">
          {tags.length !== 0 && (
            <div className="mb-2 flex flex-row gap-1">
              {tags.map((tag, index) => (
                <Link key={index} href={`?tag=${tag.name}`}>
                  <Badge variant="secondary">{tag.name}</Badge>
                </Link>
              ))}
            </div>
          )}
          <div
            className={cn(
              "flex w-full justify-between",
              isEditing && "justify-end"
            )}
          >
            {renderUserInfo()}
            <PostDropdownMenu
              isEditable={isEditable}
              onEdit={toggleEditing}
              postId={postId}
            />
          </div>
          <h1 className="py-1 text-4xl font-extrabold leading-6 text-zinc-800 dark:text-zinc-100 sm:text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
        </header>
      )}
      <div className="flex flex-col gap-4 p-4 dark:bg-zinc-900">
        <UpdatePost
          toggleEdit={toggleEditing}
          postId={postId}
          title={title}
          blocks={content.blocks}
          tags={tags}
        />
      </div>
    </article>
  );
};

export default PostContent;
