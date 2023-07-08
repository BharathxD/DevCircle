import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getCachedPost from "@/actions/getCachedPost";
import getComments from "@/actions/getComments";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getPost from "@/actions/getPost";
import { env } from "@/env.mjs";
import type { Post, Tag, User, Vote } from "@prisma/client";

import database from "@/lib/database";
import { absoluteUrl, extractString } from "@/lib/utils";
import CommentsSection from "@/components/Comments/CommentsSection";
import PostContent from "@/components/Post/PostContent";
import PostVoteServer from "@/components/Post/PostVoteServer";
import PostVoteShell from "@/components/UI/PostVoteShell";
import { ScrollArea } from "@/components/UI/ScrollArea";
import ShareButton from "@/components/UI/ShareButton";

interface PageProps {
  params: {
    forumName: string;
    postId: string;
  };
}

type ModifiedPost = Post & {
  votes: Vote[];
  author: User;
  tags: Tag[];
};

async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postId, forumName } = params;
  if (!postId) return notFound();
  const cachedPost = await getCachedPost(postId);

  let post: (Post & { author: User }) | null = null;

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: { id: postId },
      include: { author: true },
    });
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const authorName = post?.author?.username || cachedPost?.authorUsername || "DevCircle User";
  const postTitle = post?.title || cachedPost?.title || `Post by ${authorName}`;
  const description = `Check out the latest post by ${authorName} on DevCircle.`;


  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", extractString(postTitle));
  ogUrl.searchParams.set("description", extractString(description));

  return {
    title: postTitle,
    authors: {
      name: post?.author.username ?? cachedPost?.authorUsername ?? "",
    },
    openGraph: {
      title: postTitle,
      description: description,
      url: absoluteUrl(`/d/${forumName}/${postId}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

const PostPage = async ({ params }: PageProps) => {
  const { postId } = params;
  if (!postId) return notFound();
  const cachedPost = await getCachedPost(postId);
  const comments = await getComments(postId);
  const currentUser = await getCurrentUser();

  let post: ModifiedPost | null = null;

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        votes: true,
        author: true,
        tags: true,
      },
    });
  }
  if (!post && !cachedPost) return notFound();
  const postContentProps = {
    postId,
    tags: post?.tags || cachedPost?.tags || [],
    title: post?.title || cachedPost?.title || "",
    content: post?.content || cachedPost?.content,
    userimage: post?.author?.image || cachedPost?.authorImage || null,
    createdAt: post?.createdAt || cachedPost?.createdAt || new Date(),
    username: post?.author?.username || cachedPost?.authorUsername || "",
    isAuthor:
      (post?.authorId || cachedPost?.authorId) === currentUser?.id ||
      currentUser?.role === "admin",
  };
  return (
    <div className="relative mb-4 flex flex-col items-start gap-2 pt-2 md:flex-row">
      <div className="flex w-full items-center justify-between gap-4 rounded-xl border-2 border-zinc-800 bg-zinc-50 bg-gradient-to-b from-muted/30 to-muted/30 p-1.5 pl-2.5 shadow-inner dark:bg-zinc-950 dark:from-background/10 dark:to-background/80 md:w-fit md:flex-col md:pl-1.5 md:pt-2.5">
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer postId={postId} getData={() => getPost(postId)} />
        </Suspense>
        <div className="flex flex-row gap-2 md:flex-col">
          <ShareButton className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 dark:hover:border-zinc-300" />
          <CommentsSection
            postId={postId}
            comments={comments}
            userId={currentUser?.id}
            isAdmin={currentUser?.role === "admin"}
          />
        </div>
      </div>
      <ScrollArea className="no-scrollbar fixed max-h-[80vh] w-full overflow-hidden overflow-y-auto scroll-smooth rounded-lg border-2 border-zinc-800 bg-gradient-to-b from-muted/30 to-muted/30 shadow-inner dark:from-background/10 dark:to-background/80">
        <PostContent {...postContentProps} />
      </ScrollArea>
    </div>
  );
};

export { generateMetadata };
export default PostPage;
