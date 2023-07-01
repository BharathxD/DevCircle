"use client";

import { Fragment, useCallback, useState } from "react";
import Link from "next/link";
import type { Tag } from "@prisma/client";
import { MoreVertical } from "lucide-react";

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
  username: string;
  userimage: string;
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
    <div className="flex flex-col gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-50 p-4 dark:bg-zinc-900">
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
            <p className="mt-1 max-h-40 truncate text-sm text-zinc-500 dark:text-zinc-300">
              Posted by u/{username} {formatTimeToNow(new Date(createdAt))}
            </p>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="xs">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={10}
            align="end"
            className="w-fit rounded-md border-2 border-zinc-800 bg-zinc-50 p-0 dark:bg-zinc-900"
          >
            {isEditable && (
              <DropdownMenuItem onClick={toggleEditing}>
                <button>Edit</button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <button>Delete</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        {!isEditing ? (
          <Fragment>
            <h1 className="pb-1 pt-2 text-xl font-semibold leading-6 text-zinc-900 dark:text-zinc-300">
              {title}
            </h1>
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
