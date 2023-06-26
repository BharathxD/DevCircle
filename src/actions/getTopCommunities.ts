"use server";

import database from "@/lib/database";

/**
 * Retrieves the top five forums with the highest number of subscribers from a database.
 * @returns A promise that resolves to an array of objects representing the top 5 forums.
 * Each object contains the `forumName` (string) and `memberCount` (number) properties.
 * The array is sorted in descending order based on the number of subscribers/members.
 * @throws An error if there is any issue retrieving the top communities.
 */
const getTopCommunities = async (): Promise<
  { forumName: string; memberCount: number }[]
  | null> => {
  try {
    const forums = await database.forum.findMany({
      include: {
        subscribers: true,
      },
    });

    const updatedForums = forums.map((forum) => ({
      forumName: forum.name,
      memberCount: forum.subscribers.length,
    }));

    const sortedForums = updatedForums.sort(
      (a, b) => b.memberCount - a.memberCount
    );

    const topFiveForums = sortedForums.slice(0, 5);

    return topFiveForums;
  } catch (error: unknown) {
    return null;
  }
};

export default getTopCommunities;
