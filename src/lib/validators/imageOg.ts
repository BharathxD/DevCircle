/**
 * Zod is a TypeScript-first schema validation library that helps define
 * and validate data schemas. It ensures that the data conforms to the specified
 * schema before processing it further.
 *
 * This code defines a validator schema and a payload type for handling Open Graph
 * image parameters in a NextJS application.
 *
 * @see https://github.com/colinhacks/zod
 */

import { object, string } from "zod";
import type { infer as zodInfer } from "zod";

/**
 * Validator schema for validating the Open Graph (og:image) parameters.
 * It specifies the expected shape of the incoming data for Open Graph images.
 */
const ogImageSchema = object({
  title: string({ required_error: "Title is required for og:image" }),
  author: string().optional(),
  description: string().optional(),
});

/**
 * Type declaration for the payload of Open Graph (og:image) parameters.
 * It represents the data that should be sent in the request body for Open Graph images.
 */
type OgImageParams = zodInfer<typeof ogImageSchema>;

export { ogImageSchema };
export type { OgImageParams };
