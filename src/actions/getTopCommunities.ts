import database from "@/libs/database";

const getTopCommunities = async () => {
  try {
    const forums = await database.forum.findMany({
      include: {
        subscribers: true,
      },
    });
    const updatedForums = forums.map((forum) => {
      return { forumName: forum.name, memberCount: forum.subscribers.length };
    });
    const sortedForums = updatedForums.sort(
      (a, b) => b.memberCount - a.memberCount
    );
    const topFiveForums = sortedForums.slice(0, 5);
    return topFiveForums;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getTopCommunities;
