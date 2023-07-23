/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines a validator schema and a payload type for handling profile form
 * values in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

/**
 * Validator schema for validating the profile form values.
 * It specifies the expected shape of the incoming data for user profiles.
 */
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

/**
 * Type declaration for the payload of profile form values.
 * It represents the data that should be sent in the request body for user profiles.
 */
type ProfileFormValues = zodInfer<typeof profileFormSchema>;

export { profileFormSchema };
export type { ProfileFormValues };