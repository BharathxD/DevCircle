import database from "@/lib/database";
import redis from "@/lib/redis";

const GET = async (): Promise<{ forumName: string; memberCount: number }[] | null> => {
    try {
        const forums = await database.forum.findMany({ include: { subscribers: true } });

        const updatedForums = forums.map((forum) => ({
            forumName: forum.name,
            memberCount: forum.subscribers.length,
        }));

        const sortedForums = updatedForums.sort((a, b) => b.memberCount - a.memberCount);

        const topFiveForums = sortedForums.slice(0, 5);

        const leaderboardData: { [field: string]: unknown } = {};
        topFiveForums.forEach((forum, index) => {
            leaderboardData[`forum_${index}`] = JSON.stringify(forum);
        });

        await redis.hset(`leaderboard:forums`, leaderboardData);

        return topFiveForums;
    } catch (error: unknown) {
        return null;
    }
};

export { GET };
