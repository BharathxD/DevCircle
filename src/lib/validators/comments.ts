import { object, string } from "zod";
import type { infer as ZodInfer } from "zod";

const GetCommentsValidator = object({
  postId: string(),
  limit: string(),
  page: string(),
});

const CommentValidator = object({
  postId: string({}),
  text: string(),
  replyToId: string().optional(),
});

const EditCommentValidator = object({
  commentId: string({}),
  text: string(),
});

const DeleteCommentValidator = object({
  commentId: string({}),
});

type GetCommentsPayload = ZodInfer<typeof GetCommentsValidator>;
type CommentPayload = ZodInfer<typeof CommentValidator>;
type EditCommentPayload = ZodInfer<typeof EditCommentValidator>;
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
