import { object, string } from "zod";


const ogImageSchema = object({
    title: string(),
    description: string().optional(),
})

export { ogImageSchema }