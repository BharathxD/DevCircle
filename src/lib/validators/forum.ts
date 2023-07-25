/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines several validators and payload types for handling forum-related
 * operations in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

/**
 * Validator schema for validating the payload of a "CreateForum" request.
 * It specifies the expected shape of the incoming data when creating a new forum.
 */
const forumValidator = object({
  forumName: string({ required_error: "Forum name is required" })
    .min(3, { message: "Forum name must be at least 3 characters long" })
    .max(21, { message: "Forum name must contain at most 21 characters" }),
  description: string({ required_error: "Description is required" })
    .min(10, { message: "Description must contain at least 10 characters" })
    .max(75, { message: "Description must contain at most 75 characters" }),
});

/**
 * Validator schema for validating the payload of a "ForumSubscription" request.
 * It specifies the expected shape of the incoming data when subscribing to a forum.
 */
const forumSubscriptionValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
});

/**
 * Validator schema for validating the payload of a "ForumUpdate" request.
 * It specifies the expected shape of the incoming data when updating an existing forum.
 */
const forumUpdateValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
  forumName: string({ required_error: "Forum name is required" })
    .min(3, { message: "Forum name must be at least 3 characters long" })
    .max(21, { message: "Forum name must contain at most 21 characters" }),
  description: string({ required_error: "Description is required" })
    .min(10, { message: "Description must contain at least 10 characters" })
    .max(75, { message: "Description must contain at most 75 characters" }),
});

/**
 * Validator schema for validating the payload of a "ForumDelete" request.
 * It specifies the expected shape of the incoming data when deleting a forum.
 */
const forumDeleteValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
});

/**
 * Type declaration for the payload of a "CreateForum" request.
 * It represents the data that should be sent in the request body when creating a new forum.
 */
type CreateForumPayload = zodInfer<typeof forumValidator>;

/**
 * Type declaration for the payload of a "ForumSubscription" request.
 * It represents the data that should be sent in the request body when subscribing to a forum.
 */
type ForumSubscriptionPayload = zodInfer<typeof forumSubscriptionValidator>;

/**
 * Type declaration for the payload of a "ForumUpdate" request.
 * It represents the data that should be sent in the request body when updating an existing forum.
 */
type ForumUpdatePayload = zodInfer<typeof forumUpdateValidator>;

/**
 * Type declaration for the payload of a "ForumDelete" request.
 * It represents the data that should be sent in the request body when deleting a forum.
 */
type ForumDeletePayload = zodInfer<typeof forumDeleteValidator>;

export {
  forumValidator,
  forumSubscriptionValidator,
  forumUpdateValidator,
  forumDeleteValidator,
};
export type {
  CreateForumPayload,
  ForumSubscriptionPayload,
  ForumUpdatePayload,
  ForumDeletePayload,
};
