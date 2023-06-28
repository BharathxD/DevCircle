"use server";

import database from "@/lib/database";
import type { Post, Vote } from "@prisma/client";

const getPost = async (postId: string): Promise<Post & { votes: Vote[] } | null> => {
    try {
        const post = await database.post.findUnique({
            where: {
                id: postId
            },
            include: { votes: true }
        })
        return post;
    } catch (error: unknown) {
        return null
    }
}

export default getPost;