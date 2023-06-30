import { object, string } from "zod"
import type { infer as ZodInfer } from "zod"

const CommentValidator = object({
  postId: string({}),
  text: string(),
  replyToId: string().optional(),
})

const EditCommentValidator = object({
  commentId: string({}),
  text: string(),
})

const DeleteCommentValidator = object({
  commentId: string({}),
})

type CommentPayload = ZodInfer<typeof CommentValidator>
type EditCommentPayload = ZodInfer<typeof EditCommentValidator>
type DeleteCommentPayload = ZodInfer<typeof DeleteCommentValidator>

export { CommentValidator, EditCommentValidator, DeleteCommentValidator }
export type { CommentPayload, EditCommentPayload, DeleteCommentPayload }
