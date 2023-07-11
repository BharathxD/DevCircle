import { array, object, string } from "zod";
import type { infer as zodInfer } from "zod";

const forumValidator = object({
  forumName: string({ required_error: "Name is required" }).min(3).max(21),
  description: string({ required_error: "Description is required" })
    .min(10)
    .max(75),
});

const forumSubscriptionValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
});

const forumUpdateValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
  forumName: string({ required_error: "Name is required" })
    .min(3, { message: "Forum name must be atleast 3 characters long" })
    .max(21, {
      message: "Forum name must contain at most 21 characters",
    }),
  description: string({ required_error: "Description is required" })
    .min(10, { message: "Description must contain atleast 10 characters" })
    .max(75, { message: "Description must contain atmost 75 characters" }),
});

const forumDeleteValidator = object({
  forumId: string({ required_error: "Forum id is required" }),
});

type CreateForumPayload = zodInfer<typeof forumValidator>;
type ForumSubscriptionPayload = zodInfer<typeof forumSubscriptionValidator>;
type ForumUpdatePayload = zodInfer<typeof forumUpdateValidator>;
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
