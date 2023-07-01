"use server";

import type { Post, Vote } from "@prisma/client";

import database from "@/lib/database";

/**
 * Retrieves a post by its ID along with its associated votes.
 * @param postId The ID of the post to retrieve.
 * @returns The post object with its associated votes, or null if not found.
 */
const getPost = async (
  postId: string
): Promise<(Post & { votes: Vote[] }) | null> => {
  try {
    // Retrieve the post from the database, including its associated votes
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
      include: { votes: true },
    });
    return post;
  } catch (error: unknown) {
    return null;
  }
};

export default getPost;
