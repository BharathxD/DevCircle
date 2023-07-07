"use server";

import type { ExtendedComment } from "@/types/database";
import database from "@/lib/database";

/**
 * Retrieves comments for a given post.
 * @param {string} postId - The ID of the post to retrieve comments for.
 * @returns {Promise<Comment[] | null>} A promise that resolves to an array of comments for post, or null if an error occurs.
 */
const getComments = async (
  postId: string
): Promise<ExtendedComment[] | null> => {
  try {
    const comments = await database.comment.findMany({
      where: {
        postId,
        replyToId: null,
      },
      include: {
        author: true,
        votes: true,
        replies: {
          include: {
            author: true,
            votes: true,
          },
        },
      },
    });
    return comments;
  } catch (error: unknown) {
    return null;
  }
};

export default getComments;
