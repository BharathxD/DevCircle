import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

const profileFormSchema = object({
  username: string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(32, { message: "Username must not exceed 30 characters." })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric characters and underscores."
    )
    .optional(),
  bio: string()
    .min(4, { message: "Bio must be at least 4 characters." })
    .max(160, { message: "Bio must not exceed 160 characters." })
    .optional(),
  urls: object({
    linkedIn: string().optional().nullable(),
    github: string().optional().nullable(),
    facebook: string().optional().nullable(),
  }).optional(),
});

type ProfileFormValues = zodInfer<typeof profileFormSchema>;

export { profileFormSchema };
export type { ProfileFormValues };
