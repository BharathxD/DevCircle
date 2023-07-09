import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

const ogImageSchema = object({
    title: string(),
    author: string().optional(),
    description: string().optional(),
})

type OgImageParams = zodInfer<typeof ogImageSchema>

export { ogImageSchema }
export type { OgImageParams }