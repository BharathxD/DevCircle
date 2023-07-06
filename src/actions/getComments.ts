"use server";

import type { Comment, CommentVote, User } from "@prisma/client";

import database from "@/lib/database";

type ModifiedComment = Comment & {
  author: User;
  replies: (Comment & {
    author: User;
    votes: CommentVote[];
  })[];
  votes: CommentVote[];
};

/**
 * Retrieves comments for a given post.
 * @param {string} postId - The ID of the post to retrieve comments for.
 * @returns {Promise<Comment[] | null>} A promise that resolves to an array of comments for post, or null if an error occurs.
 */
const getComments = async (
  postId: string
): Promise<ModifiedComment[] | null> => {
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
