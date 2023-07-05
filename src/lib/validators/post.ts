import { any, array, object, string } from "zod";
import type { infer as zodInfer } from "zod";

const CreatePostValidator = object({
  title: string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(128, { message: "Title must be less than 128 characters long" }),
  forumId: string(),
  content: any().optional(),
  tags: array(string()),
});

type PostCreationRequest = zodInfer<typeof CreatePostValidator>;


const DeletePostValidator = object({
  postId: string(),
});

type DeletePostRequest = zodInfer<typeof DeletePostValidator>;

const UpdatePostValidator = object({
  title: string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(128, { message: "Title must be less than 128 characters long" }),
  postId: string(),
  content: any(),
  tags: array(string()),
});

type PostUpdateRequest = zodInfer<typeof UpdatePostValidator>;

export { CreatePostValidator, UpdatePostValidator, DeletePostValidator };
export type { PostCreationRequest, DeletePostRequest, PostUpdateRequest };
