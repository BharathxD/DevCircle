import { object, string } from "zod"
import type { infer as ZodInfer } from "zod"

const CommentValidator = object({
  postId: string({}),
  text: string(),
  replyToId: string().optional(),
})

const DeleteCommentValidator = object({
  commentId: string({}),
})

type CommentPayload = ZodInfer<typeof CommentValidator>
type DeleteCommentPayload = ZodInfer<typeof CommentValidator>

export { CommentValidator, DeleteCommentValidator }
export type { CommentPayload, DeleteCommentPayload }
