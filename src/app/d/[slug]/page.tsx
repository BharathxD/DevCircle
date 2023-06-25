import getCurrentUser from "@/actions/getCurrentUser";
import getForum from "@/actions/getForum";
import MiniCreatePost from "@/components/Post/MiniCreatePost";
import PostFeed from "@/components/Post/PostFeed";
import { ExtendedForum } from "@/types/database";
import { notFound } from "next/navigation";
import { Fragment } from "react";

interface ForumPageProps {
  params: {
    slug: string;
  };
}

const ForumPage = async ({ params }: ForumPageProps) => {
  const { slug } = params;
  const currentUser = await getCurrentUser();
  const forum: ExtendedForum | null = await getForum(slug);
  if (!forum) return notFound();
  return (
    <Fragment>
      <h1 className="font-bold text-3xl md:text-4xl">d/{forum.name}</h1>
      <MiniCreatePost currentUser={currentUser} />
      {forum.posts.length === 0 ? (
        <div className="w-full text-center font-medium p-2 border-2 rounded-md text-zinc-800 border-zinc-800 dark:bg-red-300 bg-yellow-300">
          Be the first to post! No posts found. Why not be the first one to
          share your thoughts?
        </div>
      ) : (
        <PostFeed
          forumName={forum.name}
          userId={currentUser?.id}
          initialPosts={forum.posts}
        />
      )}
    </Fragment>
  );
};

export default ForumPage;
