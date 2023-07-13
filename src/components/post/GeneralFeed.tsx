import { notFound } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import fetchPosts from "@/actions/getPosts";

import PostFeed from "./PostFeed";

interface GeneralFeedProps {
  tag: string;
  filters: {
    tag: string;
  };
}

const GeneralFeed: React.FC<GeneralFeedProps> = async ({ tag, filters }) => {
  const posts = await fetchPosts(tag);
  const currentUser = await getCurrentUser();
  if (!posts) return notFound();
  return (
    <PostFeed initialPosts={posts} userId={currentUser?.id} filters={filters} />
  );
};

export default GeneralFeed;
