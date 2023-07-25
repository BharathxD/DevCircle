/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines two validators and payload types for handling vote-related
 * operations in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { object, string, ZodEnum } from "zod";
import type { infer as zodInfer } from "zod";

/**
 * Validator schema for validating the payload of a "PostVote" request.
 * It specifies the expected shape of the incoming data when voting on a post.
 */
const PostVoteValidator = object({
  postId: string({ required_error: "Post ID is required for voting" }),
  voteType: ZodEnum.create(["UP", "DOWN"], {
    required_error: "Invalid vote type. Must be either 'UP' or 'DOWN'.",
  }),
});

/**
 * Type declaration for the payload of a "PostVote" request.
 * It represents the data that should be sent in the request body when voting on a post.
 */
type PostVoteRequest = zodInfer<typeof PostVoteValidator>;

/**
 * Validator schema for validating the payload of a "CommentVote" request.
 * It specifies the expected shape of the incoming data when voting on a comment.
 */
const CommentVoteValidator = object({
  commentId: string({ required_error: "Comment ID is required for voting" }),
  voteType: ZodEnum.create(["UP", "DOWN"], {
    required_error: "Invalid vote type. Must be either 'UP' or 'DOWN'.",
  }),
});

/**
 * Type declaration for the payload of a "CommentVote" request.
 * It represents the data that should be sent in the request body when voting on a comment.
 */
type CommentVoteRequest = zodInfer<typeof CommentVoteValidator>;

export { PostVoteValidator, CommentVoteValidator };
export type { PostVoteRequest, CommentVoteRequest };
