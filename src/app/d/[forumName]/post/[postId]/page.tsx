import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getCachedPost from "@/actions/getCachedPost";
import getComments from "@/actions/getComments";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getPost from "@/actions/getPost";
import getPostLikes from "@/actions/getPostLikes";
import { env } from "@/env.mjs";
import type { Post, Tag, User, Vote } from "@prisma/client";

import siteConfig from "@/config/site";
import { absoluteUrl, extractString } from "@/lib/utils";
import PostVoteShell from "@/components/ui/post-vote-shell";
import ShareButton from "@/components/ui/share-button";
import CommentButtonShell from "@/components/comments/comment-button-shell";
import CommentServer from "@/components/comments/comment-server";
import PostContent from "@/components/post/post-content";
import PostVoteServer from "@/components/post/post-vote-server";

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

  if (!postId || !forumName)
    return {
      title: "Not Found - Post Not Found",
      description:
        "We apologize, but the post you are searching for could not be found.",
    };

  const cachedPost = await getCachedPost(postId);
  let post: ModifiedPost | null = null;
  if (!cachedPost) post = await getPost(postId);

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

const PostPage = async ({ params }: PageProps) => {
  const { postId, forumName } = params;
  if (!postId) return notFound();
  const cachedPost = await getCachedPost(postId);
  const currentUser = await getCurrentUser();

  let post: ModifiedPost | null = null;
  if (!cachedPost) post = await getPost(postId);

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
  const siteUrl = env.NEXT_PUBLIC_APP_URL;

  const authorName =
    post?.author?.username || cachedPost?.authorUsername || "DevCircle User";
  const postTitle =
    post?.title || cachedPost?.title || `Post by u/${authorName}`;
  const description = `Check out the latest post by ${authorName} on DevCircle.`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set("title", extractString(postTitle));
  ogUrl.searchParams.set("description", extractString(description));
  return (
    <div className="relative flex flex-col items-start gap-2 pt-2 md:flex-row">
      <div className="no-scrollbar flex w-full items-center justify-between gap-2 overflow-hidden overflow-x-scroll rounded-2xl border-2 border-zinc-800 bg-zinc-50 bg-gradient-to-b from-muted/30 to-muted/30 p-1.5 md:w-fit md:flex-col md:p-1.5 dark:bg-zinc-950 dark:from-background/10 dark:to-background/80">
        {/* Post Vote */}
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer
            postId={postId}
            getData={() => getPostLikes(postId)}
          />
        </Suspense>
        {/* Share Button and Comments Section */}
        <div className="flex flex-row gap-2 md:flex-col">
          <ShareButton
            url={`${siteConfig.url}/d/${forumName}/post/${postId}`}
            className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 dark:hover:border-zinc-300"
            title={post?.title || cachedPost?.title || ""}
          />
          <Suspense fallback={<CommentButtonShell />}>
            <CommentServer
              postId={postId}
              getData={() => getComments(postId)}
              userId={currentUser?.id}
              isAdmin={currentUser?.userRole?.type === "ADMIN"}
            />
          </Suspense>
        </div>
      </div>
      {/* Post Content */}
      <article className="no-scrollbar relative max-h-[80vh] w-full overflow-hidden overflow-y-scroll rounded-lg border-2 border-zinc-800 bg-gradient-to-b from-muted/30 to-muted/30 shadow-inner dark:from-background/10 dark:to-background/80">
        <PostContent {...postContentProps} />
      </article>
    </div>
  );
};

export { generateMetadata };
export default PostPage;
