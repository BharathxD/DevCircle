/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines several validators and payload types for handling post-related
 * operations in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { any, array, object, string } from "zod";
import type { infer as zodInfer } from "zod";

/**
 * Validator schema for validating the payload of a "CreatePost" request.
 * It specifies the expected shape of the incoming data when creating a new post.
 */
const CreatePostValidator = object({
  title: string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(128, { message: "Title must be less than 128 characters long" }),
  forumId: string(),
  content: any().optional(),
  tags: array(string()),
});

/**
 * Type declaration for the payload of a "CreatePost" request.
 * It represents the data that should be sent in the request body when creating a new post.
 */
type PostCreationRequest = zodInfer<typeof CreatePostValidator>;

/**
 * Validator schema for validating the payload of a "DeletePost" request.
 * It specifies the expected shape of the incoming data when deleting a post.
 */
const DeletePostValidator = object({
  postId: string(),
});

/**
 * Type declaration for the payload of a "DeletePost" request.
 * It represents the data that should be sent in the request body when deleting a post.
 */
type DeletePostRequest = zodInfer<typeof DeletePostValidator>;

/**
 * Validator schema for validating the payload of an "UpdatePost" request.
 * It specifies the expected shape of the incoming data when updating an existing post.
 */
const UpdatePostValidator = object({
  title: string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(128, { message: "Title must be less than 128 characters long" }),
  postId: string(),
  content: any(),
  tags: array(string()),
});

/**
 * Type declaration for the payload of an "UpdatePost" request.
 * It represents the data that should be sent in the request body when updating an existing post.
 */
type PostUpdateRequest = zodInfer<typeof UpdatePostValidator>;

export { CreatePostValidator, UpdatePostValidator, DeletePostValidator };
export type { PostCreationRequest, DeletePostRequest, PostUpdateRequest };