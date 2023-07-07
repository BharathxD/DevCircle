import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

const profileFormSchema = object({
  username: string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(32, { message: "Username must not exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  bio: string()
    .min(4, { message: "Bio must be at least 4 characters." })
    .max(160, { message: "Bio must not exceed 160 characters." })
    .optional(),
  urls: object({
    linkedIn: string()
      .url({ message: "Please enter a valid LinkedIn URL." })
      .optional(),
    github: string()
      .url({ message: "Please enter a valid GitHub URL." })
      .optional(),
    facebook: string()
      .url({ message: "Please enter a valid Facebook URL." })
      .optional(),
  }).optional(),
});

type ProfileFormValues = zodInfer<typeof profileFormSchema>;

export { profileFormSchema };
export type { ProfileFormValues };
