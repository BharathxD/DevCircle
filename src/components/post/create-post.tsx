"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Post } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";

import type { PostCreationRequest } from "@/lib/validators/post";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import Editor from "../ui/editor";

interface CreatePostProps {
  forumId: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ forumId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isLoading } = useMutation<
    Post,
    AxiosError,
    Omit<PostCreationRequest, "forumId">
  >({
    mutationFn: async (payload: Omit<PostCreationRequest, "forumId">) => {
      const { data }: { data: Post } = await axios.post("/api/forum/post", {
        ...payload,
        forumId,
      });
      return data;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.UNAUTHORIZED:
            return router.push(`/signin`);
          case StatusCodes.FORBIDDEN:
            return toast({
              title: "You are not subscribed to this community",
              description: "Please join the community and try again.",
              variant: "destructive",
            });
          case StatusCodes.BAD_REQUEST:
            return toast({
              title: "Post can't be empty",
              description: "Please make sure to provide content for the post.",
              variant: "destructive",
            });
          default:
            return toast({
              title: "Something went wrong",
              description: "Your post is not published, please try again later",
              variant: "destructive",
            });
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Your post is not published, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const redirectPath = pathname.split("/").slice(0, -1).join("/");
      router.push(redirectPath);
      router.refresh();
      toast({
        description: "Your post is published",
      });
    },
  });
  return (
    <div className="relative flex h-fit w-full flex-col gap-2">
      <Editor submit={mutate} isLoading={isLoading} />
      <Button
        type="submit"
        className="h-fit w-full rounded-md border-2 border-zinc-800 bg-zinc-900 px-3 py-1 text-lg font-bold text-zinc-50 hover:bg-zinc-50 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        form="devcircle-post-form"
        disabled={isLoading}
        isLoading={isLoading}
      >
        POST
      </Button>
    </div>
  );
};

export default CreatePost;
