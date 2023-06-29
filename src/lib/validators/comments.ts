import { string, object } from "zod";
import type { infer as ZodInfer } from "zod";

const CommentValidator = object({
    postId: string({}),
    text: string(),
    replyToId: string().optional()
})

type CommentPayload = ZodInfer<typeof CommentValidator>;

export { CommentValidator };
export type { CommentPayload };