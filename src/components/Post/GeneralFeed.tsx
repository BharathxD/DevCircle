import { notFound } from "next/navigation";
import fetchPosts from "@/actions/getPosts";
import type { User } from "@prisma/client";

import PostFeed from "./PostFeed";

interface GeneralFeedProps {
  tag: string;
  userId?: User["id"];
  filters: {
    tag: string;
  };
}

const GeneralFeed: React.FC<GeneralFeedProps> = async ({
  tag,
  userId,
  filters,
}) => {
  const posts = await fetchPosts(tag);
  if (!posts) return notFound();
  return <PostFeed initialPosts={posts} userId={userId} filters={filters} />;
};

export default GeneralFeed;
