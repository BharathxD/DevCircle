"use server";

import type { Post, Tag, User, Vote } from "@prisma/client";

import database from "@/lib/database";

type ModifiedPost = Post & {
    votes: Vote[];
    author: User;
    tags: Tag[];
};

/**
 * Retrieves a post by its ID along with its associated votes.
 *
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<(Post & { votes: Vote[] }) | null>} - A promise that resolves to the post object with its associated votes, or null if not found.
 */
async function getPost(
    postId: string
): Promise<ModifiedPost | null> {
    try {
        const post = await database.post.findFirst({
            where: {
                id: postId,
            },
            include: {
                votes: true,
                author: true,
                tags: true,
            },
        });
        return post ?? null;
    } catch (error) {
        return null;
    }
}

export default getPost;
