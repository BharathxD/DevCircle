import { notFound } from "next/navigation";
import { getAuthSession, getCurrentUser } from "@/actions/getCurrentUser";
import { getForumWithPosts } from "@/actions/getForum";

import type { ExtendedForum } from "@/types/database";
import MiniCreatePost from "@/components/Post/MiniCreatePost";
import PostFeed from "@/components/Post/PostFeed";
import { ScrollArea } from "@/components/UI/ScrollArea";

interface ForumPageProps {
  params: {
    forumName: string;
  };
  searchParams: {
    tag: string;
  };
}

const ForumPage = async ({ params, searchParams }: ForumPageProps) => {
  const { forumName } = params;
  const { tag } = searchParams;
  const session = await getAuthSession();
  const forum: ExtendedForum | null = await getForumWithPosts(forumName);
  if (!forum) return notFound();
  return (
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
  );
};

export default ForumPage;
