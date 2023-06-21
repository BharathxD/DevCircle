import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import database from "@/libs/database";
import PostFeed from "./PostFeed";

const GeneralFeed = async () => {
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
  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
