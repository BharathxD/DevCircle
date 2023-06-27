import { any, array, object, string } from "zod"
import type { infer as zodInfer } from "zod"

const PostValidator = object({
  title: string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(128, { message: "Title must be less than 128 characters long" }),
  forumId: string(),
  content: any(),
  tags: array(string()),
})

type PostCreationRequest = zodInfer<typeof PostValidator>

export { PostValidator }
export type { PostCreationRequest }
