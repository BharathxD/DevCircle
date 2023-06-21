import { infer as zodInfer, any, object, string } from "zod"

const PostValidator = object({
    title: string()
        .min(3, { message: 'Title must be at least 3 characters long' })
        .max(128, { message: 'Title must be less than 128 characters long' }),
    forumId: string(),
    content: any(),
})

type PostCreationRequest = zodInfer<typeof PostValidator>;

export { PostValidator };
export type { PostCreationRequest };