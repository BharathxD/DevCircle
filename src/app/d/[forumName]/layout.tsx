import { Fragment } from "react";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import getForum from "@/actions/getForum";
import { format } from "date-fns";

import database from "@/lib/database";
import SubscribeLeaveToggle from "@/components/Forum/SubscribeLeaveToggle";

interface LayoutProps {
  children: ReactNode;
  params: {
    forumName: string;
  };
}

const Layout = async ({
  children,
  params: { forumName: forumName },
}: LayoutProps) => {
  // Fetch the current user and the forum data in parallel
  const [currentUser, forum] = await Promise.all([
    getCurrentUser(),
    getForum(forumName),
  ]);

  // If the forum is not found, return a 404 page
  if (!forum) return notFound();

  // Check if the current user is subscribed to the forum
  const subscription = currentUser
    ? await database.subscription.findFirst({
        where: { forumId: forum.id, userId: currentUser.id },
      })
    : undefined;

  const isSubscribed = !!subscription;

  // Get the count of forum members
  const memberCount = await database.subscription.count({
    where: { forum: { name: forumName } },
  });

  return (
    <div className="h-full pb-0 pt-3 font-medium">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="pt-1 text-4xl font-extrabold leading-6 text-zinc-800 dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent sm:text-2xl md:text-3xl lg:text-4xl">
            d/{forumName}
          </h1>
          <div className="flex flex-col gap-4">{children}</div>
        </div>
        <div className="order-first mt-14 hidden h-fit overflow-hidden rounded-lg border-2 border-zinc-800 md:order-last md:block">
          <div className="bg-green-100 px-6 py-4 dark:bg-zinc-900">
            <p className="py-3 text-xl font-bold">About d/{forumName}</p>
          </div>
          <div className="h-[2px] w-full bg-zinc-800" />
          <dl className="bg-zinc-50 leading-6 dark:bg-zinc-950">
            <div className="flex items-center justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">Created</dt>
              <dd className="text-zinc-700 dark:text-zinc-50">
                <time dateTime={forum.createdAt.toDateString()}>
                  {format(forum.createdAt, "MMMM d, yyyy")}
                </time>
              </dd>
            </div>

            <div className="h-[2px] w-full bg-zinc-800" />

            <div className="flex justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">Members</dt>
              <dd className="text-zinc-700 dark:text-zinc-50">{memberCount}</dd>
            </div>

            {forum.creatorId === currentUser?.id ? (
              <Fragment>
                <div className="h-[2px] w-full bg-zinc-800" />
                <div className="flex justify-between gap-x-4 px-6 py-4">
                  <p className="text-zinc-500">You created this community</p>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="h-[2px] w-full bg-zinc-800" />
                <div className="flex h-full w-full justify-between gap-x-4">
                  <SubscribeLeaveToggle
                    isSubscribed={isSubscribed}
                    forum={{ id: forum.id, name: forum.name }}
                  />
                </div>
              </Fragment>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Layout;
