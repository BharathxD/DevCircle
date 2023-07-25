/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines several validators and payload types for handling comments
 * in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { object, string } from "zod";
import type { infer as ZodInfer } from "zod";

/**
 * Validator schema for validating the payload of a "GetComments" request.
 * It specifies the expected shape of the incoming data.
 */
const GetCommentsValidator = object({
  postId: string(), // postId should be a string.
  limit: string(), // limit should be a string.
  page: string(), // page should be a string.
});

/**
 * Validator schema for validating the payload of a "Comment" request.
 * It specifies the expected shape of the incoming data when creating a new comment.
 */
const CommentValidator = object({
  postId: string({}), // postId should be a string.
  text: string(), // text should be a string.
  replyToId: string().optional(), // replyToId is an optional string, used for replies to a specific comment.
});

/**
 * Validator schema for validating the payload of an "EditComment" request.
 * It specifies the expected shape of the incoming data when editing an existing comment.
 */
const EditCommentValidator = object({
  commentId: string({}), // commentId should be a string.
  text: string(), // text should be a string.
});

/**
 * Validator schema for validating the payload of a "DeleteComment" request.
 * It specifies the expected shape of the incoming data when deleting a comment.
 */
const DeleteCommentValidator = object({
  commentId: string({}), // commentId should be a string.
});

/**
 * Type declaration for the payload of a "GetComments" request.
 * It represents the data that should be sent in the request body.
 */
type GetCommentsPayload = ZodInfer<typeof GetCommentsValidator>;

/**
 * Type declaration for the payload of a "Comment" request.
 * It represents the data that should be sent in the request body when creating a new comment.
 */
type CommentPayload = ZodInfer<typeof CommentValidator>;

/**
 * Type declaration for the payload of an "EditComment" request.
 * It represents the data that should be sent in the request body when editing an existing comment.
 */
type EditCommentPayload = ZodInfer<typeof EditCommentValidator>;

/**
 * Type declaration for the payload of a "DeleteComment" request.
 * It represents the data that should be sent in the request body when deleting a comment.
 */
type DeleteCommentPayload = ZodInfer<typeof DeleteCommentValidator>;

export {
  GetCommentsValidator,
  CommentValidator,
  EditCommentValidator,
  DeleteCommentValidator,
};
export type {
  GetCommentsPayload,
  CommentPayload,
  EditCommentPayload,
  DeleteCommentPayload,
};
