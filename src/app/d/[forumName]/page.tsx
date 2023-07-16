import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/actions/getCurrentUser";
import { getForumWithPosts } from "@/actions/getForum";
import { env } from "@/env.mjs";

import type { ExtendedForum } from "@/types/database";
import siteConfig from "@/config/site";
import { capitalizeString, extractString } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea";
import MiniCreatePost from "@/components/post/MiniCreatePost";
import PostFeed from "@/components/post/PostFeed";

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
  if (!forum)
    return {
      title: "Not Found - Forum Not Found",
      description:
        "We're sorry, but the forum you are looking for could not be found.",
    };
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
    <section className="flex flex-col gap-4 pt-2">
      <MiniCreatePost />
      <ScrollArea className="no-scrollbar fixed flex max-h-[70vh] w-fit flex-col items-center justify-center">
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
    </section>
  );
};

export default ForumPage;
