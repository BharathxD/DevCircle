import { object, string } from "zod";


const ogImageSchema = object({
    title: string(),
    author: string().optional(),
    description: string().optional(),
})

export { ogImageSchema }