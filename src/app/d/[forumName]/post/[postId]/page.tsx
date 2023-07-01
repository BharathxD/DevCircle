import { Suspense } from "react";
import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import getPost from "@/actions/getPost";
import type { Post, Tag, User, Vote } from "@prisma/client";
import { Loader2 } from "lucide-react";

import type { CachedPost } from "@/types/redis";
import database from "@/lib/database";
import redis from "@/lib/redis";
import CommentsSection from "@/components/Comments/CommentsSection";
import PostContent from "@/components/Post/PostContent";
import PostVoteServer from "@/components/Post/PostVoteServer";
import PostVoteShell from "@/components/UI/PostVoteShell";
import { ScrollArea } from "@/components/UI/ScrollArea";
import ShareButton from "@/components/UI/ShareButton";
import { Skeleton } from "@/components/UI/Skeleton";

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
  const tags = post?.tags ?? cachedPost?.tags ?? [];
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
            <ShareButton className="flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 dark:hover:border-zinc-500" />
          </Suspense>
        </div>
        <ScrollArea className="no-scrollbar fixed max-h-[90vh] w-full overflow-hidden overflow-y-auto rounded-lg">
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
                (post?.authorId || cachedPost.authorId) === currentUser?.id
              }
            />
            <div className="flex flex-col gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-50 p-4 dark:bg-zinc-950">
              <Suspense
                fallback={
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                }
              >
                <CommentsSection postId={post?.id ?? cachedPost.id} />
              </Suspense>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PostPage;
