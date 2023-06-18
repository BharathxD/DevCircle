import { object, string } from "zod";

const forumValidator = object({
    name: string({ required_error: "Name is required" }).min(3).max(21),
})

const forumSubscriptionValidator = object({
    forumId: string({ required_error: "Forum id is required" })
})

export { forumValidator, forumSubscriptionValidator };