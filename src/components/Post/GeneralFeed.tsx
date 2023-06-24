import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import database from "@/lib/database";
import PostFeed from "./PostFeed";
import { User } from "@prisma/client";

interface GeneralFeedProps {
  userId?: User["id"];
}

const GeneralFeed = async ({ userId }: GeneralFeedProps) => {
  const posts = await database.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      forum: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });
  return <PostFeed initialPosts={posts} userId={userId} />;
};

export default GeneralFeed;
