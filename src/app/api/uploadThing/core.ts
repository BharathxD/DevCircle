import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async (args) => {
      const user = await getToken({ req: args.req });
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(() => {
      return;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
