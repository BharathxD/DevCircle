import { Suspense } from "react";
import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import getPost from "@/actions/getPost";
import type { Post, Tag, User, Vote } from "@prisma/client";
import { Loader2 } from "lucide-react";

import type { CachedPost } from "@/types/redis";
import database from "@/lib/database";
import redis from "@/lib/redis";
import CommentsSection from "@/components/Post/CommentsSection";
import PostContent from "@/components/Post/PostContent";
import PostVoteServer from "@/components/Post/PostVoteServer";
import PostVoteShell from "@/components/UI/PostVoteShell";
import ShareButton from "@/components/UI/ShareButton";

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PostPage = async ({ params }: PageProps) => {
  const currentUser = await getCurrentUser();
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;
  let post: (Post & { votes: Vote[]; author: User; tags: Tag[] }) | null = null;

  if (!cachedPost) {
    post = await database.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
        tags: true,
      },
    });
  }
  const tags = post?.tags ?? cachedPost.tags ?? [];
  if (!post && !cachedPost) return notFound();
  return (
    <div className="pb-4 pt-2">
      <div className="flex h-full flex-col items-start gap-4 md:flex-row md:gap-2">
        <div className="flex w-full flex-row items-center justify-between gap-4 pt-0 md:w-fit md:flex-col md:pt-[0.25rem]">
          <Suspense fallback={<PostVoteShell />}>
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={() => getPost(params.postId)}
            />
            <ShareButton className="flex items-center justify-center rounded-xl border-2 border-zinc-700 p-3" />
          </Suspense>
        </div>
        <div className="flex w-full flex-col gap-4">
          <PostContent
            content={post?.content ?? cachedPost.content}
            title={post?.title ?? cachedPost.title}
            postId={post?.id ?? cachedPost.title}
            username={post?.author.name ?? cachedPost.authorUsername}
            userimage={post?.author.image || cachedPost.authorImage}
            createdAt={post?.createdAt ?? cachedPost.createdAt}
            tags={tags}
            isEditable={
              (post?.authorId ?? cachedPost.createdAt) === currentUser?.id
            }
          />
          <div className="flex flex-col gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-50 p-4 dark:bg-zinc-900">
            <Suspense
              fallback={
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              }
            >
              <CommentsSection postId={post?.id ?? cachedPost.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
