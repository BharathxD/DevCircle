import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getCachedPost from "@/actions/getCachedPost";
import getComments from "@/actions/getComments";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getPost from "@/actions/getPost";
import { env } from "@/env.mjs";
import type { Post, Tag, User, Vote } from "@prisma/client";

import siteConfig from "@/config/site";
import database from "@/lib/database";
import { absoluteUrl, extractString } from "@/lib/utils";
import PostVoteShell from "@/components/ui/PostVoteShell";
import ShareButton from "@/components/ui/ShareButton";
import CommentsSection from "@/components/comments/CommentsSection";
import PostContent from "@/components/post/PostContent";
import PostVoteServer from "@/components/post/PostVoteServer";

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

const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { postId, forumName } = params;

  if (!postId || !forumName) return {};

  const cachedPost = await getCachedPost(postId);
  let post: (Post & { author: User }) | null = null;

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: { id: postId },
      include: { author: true },
    });
  }

  const siteUrl = env.NEXT_PUBLIC_APP_URL;

  const authorName =
    post?.author?.username || cachedPost?.authorUsername || "DevCircle User";
  const postTitle =
    post?.title || cachedPost?.title || `Post by u/${authorName}`;
  const description = `Check out the latest post by ${authorName} on DevCircle.`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set("title", extractString(postTitle));
  ogUrl.searchParams.set("description", extractString(description));

  return {
    title: postTitle,
    description: description,
    authors: {
      name: authorName,
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
};

async function PostPage({ params }: PageProps) {
  const { postId, forumName } = params;
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
      currentUser?.userRole?.type === "ADMIN",
  };
  return (
    <div className="relative flex flex-col items-start gap-2 pt-2 md:flex-row">
      <div className="flex w-full items-center justify-between gap-2 rounded-2xl border-2 border-zinc-800 bg-zinc-50 bg-gradient-to-b from-muted/30 to-muted/30 p-1.5 shadow-inner dark:bg-zinc-950 dark:from-background/10 dark:to-background/80 md:w-fit md:flex-col md:p-1.5">
        {/* Post Vote */}
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer postId={postId} getData={() => getPost(postId)} />
        </Suspense>
        {/* Share Button and Comments Section */}
        <div className="flex flex-row gap-2 md:flex-col">
          <ShareButton
            url={`${siteConfig.url}d/${forumName}/post/${postId}`}
            className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 dark:hover:border-zinc-300"
            title={post?.title || cachedPost?.title || ""}
          />
          <CommentsSection
            postId={postId}
            comments={comments}
            userId={currentUser?.id}
            isAdmin={currentUser?.userRole?.type === "ADMIN"}
          />
        </div>
      </div>
      {/* Post Content */}
      <article className="no-scrollbar relative max-h-[80vh] w-full overflow-hidden overflow-y-scroll rounded-lg border-2 border-zinc-800 bg-gradient-to-b from-muted/30 to-muted/30 shadow-inner dark:from-background/10 dark:to-background/80">
        <PostContent {...postContentProps} />
      </article>
    </div>
  );
}

export { generateMetadata };
export default PostPage;
