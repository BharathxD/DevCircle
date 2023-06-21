import getCurrentUser from "@/actions/getCurrentUser";
import SubscribeLeaveToggle from "@/components/Forum/SubscribeLeaveToggle";
import database from "@/libs/database";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Fragment, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

const Layout = async ({
  children,
  params: { slug: forumName },
}: LayoutProps) => {
  // Fetch the current user and the forum data in parallel
  const [currentUser, forum] = await Promise.all([
    getCurrentUser(),
    database.forum.findFirst({
      where: {
        name: forumName,
      },
      include: { posts: { include: { author: true, votes: true } } },
    }),
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
    <div className="h-full font-medium md:py-2">
      <div>
        {/* TODO: Create Feed Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          {/* TODO: Info Side Bar */}
          {forum && (
            <div className="hidden md:block overflow-hidden h-fit rounded-lg border-2 border-zinc-800 order-first md:order-last mt-[4rem]">
              <div className="px-6 py-4 bg-green-100">
                <p className="font-bold text-xl py-3">About c/{forumName}</p>
              </div>
              <div className="h-[2px] w-full bg-zinc-800" />
              <dl className="text-md leading-6 bg-zinc-50">
                <div className="px-6 py-4 flex justify-between items-center gap-x-4">
                  <dt className="text-zinc-700">Created</dt>
                  <dd className="text-zinc-700">
                    <time dateTime={forum.createdAt.toDateString()}>
                      {format(forum.createdAt, "MMMM d, yyyy")}
                    </time>
                  </dd>
                </div>

                <div className="h-[2px] w-full bg-zinc-800" />

                <div className="flex justify-between gap-x-4 px-6 py-4">
                  <dt className="text-zinc-600">Members</dt>
                  <dd className="text-zinc-900">{memberCount}</dd>
                </div>

                {forum.creatorId === currentUser?.id ? (
                  <Fragment>
                    <div className="h-[2px] w-full bg-zinc-800" />
                    <div className="flex justify-between gap-x-4 px-6 py-4">
                      <p className="text-zinc-500">
                        You created this community
                      </p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="h-[2px] w-full bg-zinc-800" />
                    <div className="flex justify-between gap-x-4 px-6 py-4">
                      <SubscribeLeaveToggle
                        isSubscribed={isSubscribed}
                        forum={{ id: forum.id, name: forum.name }}
                      />
                    </div>
                  </Fragment>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
