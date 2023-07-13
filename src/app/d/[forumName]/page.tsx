import { Fragment } from "react";
import { type Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import { getAuthSession } from "../../../actions/getCurrentUser";
import { getForumWithPosts } from "../../../actions/getForum";
import MiniCreatePost from "../../../components/post/MiniCreatePost";
import PostFeed from "../../../components/post/PostFeed";
import { ScrollArea } from "../../../components/ui/ScrollArea";
import siteConfig from "../../../config/site";
import { env } from "../../../env.mjs";
import { capitalizeString, extractString } from "../../../lib/utils";
import type { ExtendedForum } from "../../../types/database";

interface ForumPageProps {
  params: {
    forumName: string;
  };
  searchParams: {
    tag: string;
  };
}

export const generateMetadata = async ({
  params,
}: ForumPageProps): Promise<Metadata> => {
  const { forumName } = params;
  const forum: ExtendedForum | null = await getForumWithPosts(forumName);
  if (!forum) return {};
  const ogTitle = `Check out d/${forum.name} community on ${siteConfig.name}`;
  const ogDescription = forum.description;
  const siteUrl = env.NEXT_PUBLIC_APP_URL;
  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set("title", extractString(ogTitle));
  ogUrl.searchParams.set("description", extractString(ogDescription));
  return {
    title: `d/${capitalizeString(forum.name)}`,
    authors: {
      name:
        forum.creator?.username ??
        forum.creator?.name ??
        `${siteConfig.name} User`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogUrl.toString()],
    },
  };
};

const ForumPage = async ({ params, searchParams }: ForumPageProps) => {
  const { forumName } = params;
  const { tag } = searchParams;
  const session = await getAuthSession();
  const forum: ExtendedForum | null = await getForumWithPosts(forumName);
  if (!forum) return notFound();
  return (
    <Fragment>
      <Head>
        <title>
          {forumName} - {siteConfig.name}
        </title>
      </Head>
      <div className="flex flex-col gap-4 pt-2">
        <MiniCreatePost />
        <ScrollArea className="no-scrollbar fixed max-h-[70vh] w-full overflow-hidden overflow-y-auto pb-4">
          {forum.posts.length === 0 ? (
            <div className="w-full rounded-md border-2 border-zinc-800 bg-yellow-300 p-2 text-center font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
              Be the first to post! No posts found. Why not be the first one to
              share your thoughts?
            </div>
          ) : (
            <PostFeed
              forumName={forum.name}
              userId={session?.user.id}
              initialPosts={forum.posts}
              filters={{ tag }}
            />
          )}
        </ScrollArea>
      </div>
    </Fragment>
  );
};

export default ForumPage;
