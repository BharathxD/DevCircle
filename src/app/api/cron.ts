import redis from "@/lib/redis";
import database from "@/lib/database";
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'edge',
}

export default async function handler(_: NextApiRequest,
  response: NextApiResponse) {
  try {
    const forums = await database.forum.findMany({
      include: { subscribers: true },
    });

    const updatedForums = forums.map((forum) => ({
      forumName: forum.name,
      memberCount: forum.subscribers.length,
    }));

    const sortedForums = updatedForums.sort(
      (a, b) => b.memberCount - a.memberCount
    );

    const topFiveForums = sortedForums.slice(0, 5);

    const leaderboardData: { [field: string]: unknown } = {};
    topFiveForums.forEach((forum, index) => {
      leaderboardData[`forum_${index}`] = JSON.stringify(forum);
    });

    await redis.hset(`leaderboard:forums`, leaderboardData);

    response.status(200).json({ success: true });
  } catch (error: unknown) {
    console.error(error)
    return null;
  }
}
