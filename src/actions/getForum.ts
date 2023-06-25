"use server";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import database from "@/lib/database";

const getForum = async (forumName: string, limit?: number) => {
    try {
        const forum = await database.forum.findFirst({
            where: { name: forumName },
            include: {
                posts: {
                    include: {
                        author: true,
                        votes: true,
                        comments: true,
                        forum: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: limit ?? INFINITE_SCROLLING_PAGINATION_RESULTS,
                },
            },
        });
        
        return forum;
    } catch (error: any) {
        throw new Error(error);
    }
};
export default getForum;