import { infer as zodInfer, object, string } from "zod";

const forumValidator = object({
    name: string({ required_error: "Name is required" })
        .min(3)
        .max(21)
});

const forumSubscriptionValidator = object({
    forumId: string({ required_error: "Forum id is required" })
})

type CreateForumPayload = zodInfer<typeof forumValidator>;
type ForumSubscriptionPayload = zodInfer<typeof forumSubscriptionValidator>;

export { forumValidator, forumSubscriptionValidator };
export type { CreateForumPayload, ForumSubscriptionPayload };
