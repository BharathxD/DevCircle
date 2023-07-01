"use client";

import { Fragment, useCallback, useState } from "react";
import Link from "next/link";
import type { Tag } from "@prisma/client";
import { Dot, Edit, MoreVertical, Trash2 } from "lucide-react";

import formatTimeToNow from "@/lib/formatTimeToNow";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import UserAvatar from "../UI/UserAvatar";
import EditorOutput from "./EditorOutput";
import UpdatePost from "./UpdatePost";

interface PostContentProps {
  content: any;
  postId: string;
  title: string;
  tags: Tag[];
  username: string | null;
  userimage: string | null;
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
  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 p-4 dark:bg-neutral-900">
        {!isEditing && tags && tags.length !== 0 && (
          <div className="mb-2 flex flex-row gap-1">
            {tags.map((tag, index) => {
              return (
                <Link key={index} href={`?tag=${tag.name}`}>
                  <Badge variant="secondary">{tag.name}</Badge>
                </Link>
              );
            })}
          </div>
        )}
        <div
          className={cn(
            "flex w-full justify-between",
            isEditing && "justify-end"
          )}
        >
          {!isEditing && (
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
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:opacity-75">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={2}
              align="end"
              className="w-fit rounded-md border-2 border-zinc-800 bg-zinc-50 p-0 dark:bg-zinc-900"
            >
              {isEditable && (
                <DropdownMenuItem onClick={toggleEditing}>
                  <button>
                    <Edit className="mr-2 inline-flex h-4 w-4" />
                    Edit
                  </button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild className="hover:bg-red-500">
                <button>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h1 className="py-1 text-4xl font-extrabold leading-6 text-zinc-800 dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent sm:text-2xl md:text-3xl lg:text-4xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
        {!isEditing ? (
          <Fragment>
            <EditorOutput content={content} />
          </Fragment>
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
    </div>
  );
};

export default PostContent;
