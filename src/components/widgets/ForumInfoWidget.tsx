"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { format } from "date-fns";
import { Edit2 } from "lucide-react";

import ForumInfoModal from "../forum/ForumInfoSheet";
import SubscribeLeaveToggle from "../forum/SubscribeLeaveToggle";

interface ForumInfoWidgetProps {
  forumId: string;
  forumName: string;
  forumCreationDate: Date;
  memberCount: number;
  description: string;
  isCreator: boolean;
  isSubscribed: boolean;
  authorName?: string | null;
  isLoggedIn?: boolean;
}

const ForumInfoWidget: React.FC<ForumInfoWidgetProps> = ({
  forumId,
  forumName,
  isCreator,
  description,
  memberCount,
  isSubscribed,
  forumCreationDate,
  authorName,
  isLoggedIn,
}) => {
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");

  if (!isDesktopScreen) {
    return (
      <ForumInfoModal
        forumId={forumId}
        forumName={forumName}
        isCreator={isCreator}
        description={description}
        memberCount={memberCount}
        isSubscribed={isSubscribed}
        forumCreationDate={forumCreationDate}
        authorName={authorName}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className="order-first mt-14 hidden h-fit overflow-hidden rounded-lg border-2 border-zinc-800 md:order-last md:block">
      <div className="bg-green-100 px-6 py-4 dark:bg-zinc-900">
        <h2 className="py-3 text-xl font-bold">About d/{forumName}</h2>
      </div>
      <div className="h-[2px] w-full bg-zinc-800" />
      <div className="bg-zinc-50 leading-6 dark:bg-zinc-950">
        <div className="flex items-center justify-between gap-x-4 px-6 py-4">
          <p className="text-zinc-700 dark:text-zinc-50">{description}</p>
        </div>

        <div className="h-[2px] w-full bg-zinc-800" />

        <div className="flex items-center justify-between gap-x-4 px-6 py-4">
          <dt className="text-zinc-700 dark:text-zinc-100">Created</dt>
          <dd className="text-zinc-700 dark:text-zinc-50">
            <time dateTime={forumCreationDate.toDateString()}>
              {format(forumCreationDate, "MMMM d, yyyy")}
            </time>
          </dd>
        </div>

        <div className="h-[2px] w-full bg-zinc-800" />

        <div className="flex justify-between gap-x-4 px-6 py-4">
          <dt className="text-zinc-700 dark:text-zinc-100">Admin</dt>
          <dd className="text-zinc-700 dark:text-zinc-50">
            <Link href={`/u/${authorName as string}`}>u/{authorName}</Link>
          </dd>
        </div>

        <div className="h-[2px] w-full bg-zinc-800" />

        <div className="flex justify-between gap-x-4 px-6 py-4">
          <dt className="text-zinc-700 dark:text-zinc-100">Members</dt>
          <dd className="text-zinc-700 dark:text-zinc-50">{memberCount}</dd>
        </div>

        {isCreator ? (
          <Fragment>
            <div className="h-[2px] w-full bg-zinc-800" />
            <div className="flex items-center justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">
                Edit this community
              </dt>
              <dd className="text-zinc-500">
                <a
                  href={`/d/${forumName}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-700 bg-zinc-50 p-2 hover:text-zinc-500 dark:bg-zinc-900"
                >
                  <Edit2 className="h-4 w-4" />
                </a>
              </dd>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="h-[2px] w-full bg-zinc-800" />
            <div className="flex h-full w-full justify-between gap-x-4">
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed}
                forum={{ id: forumId, name: forumName }}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ForumInfoWidget;
