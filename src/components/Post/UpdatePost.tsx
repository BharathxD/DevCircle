"use client";

import { useRouter } from "next/navigation";
import type { Post, Tag } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";

import type { PostUpdateRequest } from "@/lib/validators/post";
import { toast } from "@/hooks/useToast";

import { Button } from "../UI/Button";
import Editor from "../UI/Editor";

interface UpdatePostProps {
  postId: string;
  title: string;
  toggleEdit: () => void;
  tags: Tag[];
  blocks: any;
}

const UpdatePost: React.FC<UpdatePostProps> = ({
  postId,
  blocks,
  title,
  toggleEdit,
  tags,
}) => {
  const router = useRouter();
  const tagArray = tags.map((tag) => tag.name);
  const { mutate, isLoading } = useMutation<
    Post,
    AxiosError,
    Omit<PostUpdateRequest, "postId">
  >({
    mutationFn: async (payload: Omit<PostUpdateRequest, "postId">) => {
      const { data }: { data: Post } = await axios.patch("/api/forum/post", {
        ...payload,
        postId,
      });
      return data;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.UNAUTHORIZED:
            return router.push("/signin?unauthorized=1");
          case StatusCodes.FORBIDDEN:
            return toast({
              title: "You are not authorized to update this post",
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
              description: "Post cannot be edited, please try again later",
              variant: "destructive",
            });
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Your post is not updated, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        description: "Your post has been edited",
      });
      toggleEdit();
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <Editor
        submit={mutate}
        isLoading={isLoading}
        existingblocks={blocks}
        title={title}
        tags={tagArray}
      />
      <div className="flex w-full flex-row gap-4">
        <Button
          onClick={toggleEdit}
          variant="destructive"
          className="w-full rounded-md bg-zinc-900 px-3 py-1 text-lg font-bold"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full rounded-md bg-zinc-900 px-3 py-1 text-lg font-bold text-zinc-50 outline-2 outline-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          form="devcircle-post-form"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdatePost;
