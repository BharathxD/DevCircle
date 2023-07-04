"use server";

import database from "@/lib/database";
import redis from "@/lib/redis";

/**
 * Fetches the top communities based on member count.
 * @returns An array of objects containing the forum name and member count, or null if an error occurs.
 */
const getTopCommunities = async (): Promise<
  { forumName: string; memberCount: number }[] | null
> => {
  try {
    // Check if the top communities are cached in Redis
    const cachedTopCommunities = await redis.hgetall("leaderboard:forums");

    if (!cachedTopCommunities) {
      // Retrieve forums and their subscribers from the database
      const forums = await database.forum.findMany({
        include: { subscribers: true },
      });

      // Transform the forums into an array of objects with forum name and member count
      const updatedForums = forums.map((forum) => ({
        forumName: forum.name,
        memberCount: forum.subscribers.length,
      }));

      // Sort the forums based on member count in descending order
      const sortedForums = updatedForums.sort(
        (a, b) => b.memberCount - a.memberCount
      );

      // Return the top 5 communities
      return sortedForums.slice(0, 5);
    }

    // Convert the cached top communities into an array
    const topCommunities = Object.values(cachedTopCommunities) as {
      forumName: string;
      memberCount: number;
    }[];

    // Sort the top communities based on member count in descending order
    const sortedCommunities = topCommunities.sort(
      (a, b) => b.memberCount - a.memberCount
    );

    return sortedCommunities;
  } catch (error) {
    return null;
  }
};

export default getTopCommunities;
