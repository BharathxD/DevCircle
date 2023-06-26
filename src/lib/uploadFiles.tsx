import { generateReactHelpers } from "@uploadthing/react/hooks"

import { OurFileRouter } from "@/app/api/uploadthing/core"

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()
