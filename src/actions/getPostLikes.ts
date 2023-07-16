"use server";

import type { Post, Vote } from "@prisma/client";

import database from "@/lib/database";

/**
 * Retrieves a post likes by its ID along with its associated votes.
 *
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<(Post & { votes: Vote[] }) | null>} - A promise that resolves to the post object with its associated votes, or null if not found.
 */
async function getPostLikes(
  postId: string
): Promise<(Post & { votes: Vote[] }) | null> {
  try {
    const post = await database.post.findUnique({
      where: { id: postId },
      include: { votes: true },
    });
    return post ?? null;
  } catch (error) {
    return null;
  }
}

export default getPostLikes;
