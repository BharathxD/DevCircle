import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import database from '@/lib/database';
import redis from '@/lib/redis';

/**
 * Retrieves the top five forums with the highest number of subscribers
 * and updates the leaderboard data in Redis.
 *
 * @param req The Next.js API request object
 * @returns The Next.js API response
 */
async function handler(): Promise<NextResponse> {
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

    await redis.hset('leaderboard:forums', leaderboardData);

    return NextResponse.json({ success: true }, { status: StatusCodes.OK });
  } catch (error: unknown) {
    console.error(`Error updating leaderboard data: `, error);
    return NextResponse.json({ success: false }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}

export default handler;
