import { infer as zodInfer, object, string, ZodEnum } from "zod"

const PostVoteValidator = object({
    postId: string({}),
    voteType: ZodEnum.create(["UP", "DOWN"])
})

type PostVoteRequest = zodInfer<typeof PostVoteValidator>;

const CommentVoteValidator = object({
    postId: string({}),
    voteType: ZodEnum.create(["UP", "DOWN"])
})

type CommentVoteRequest = zodInfer<typeof CommentVoteValidator>;

export { PostVoteValidator, CommentVoteValidator };
export type { PostVoteRequest, CommentVoteRequest };