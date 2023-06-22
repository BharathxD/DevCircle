import database from "@/libs/database";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import PostFeed from "./PostFeed";
import { User } from "@prisma/client";

interface customFeedProps {
  currentUser: User;
}

const CustomFeed = async ({ currentUser }: customFeedProps) => {
  const followedCommunities = await database.subscription.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      forum: true,
    },
  });
  const posts = await database.post.findMany({
    where: {
      forum: {
        id: {
          in: followedCommunities.map(({ forum }) => forum.id),
        },
      },
    },
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
  return <PostFeed initialPosts={posts} userId={currentUser.id} />;
};

export default CustomFeed;
