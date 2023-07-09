"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Post, Tag } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import type { PostUpdateRequest } from "@/lib/validators/post";
import { toast } from "@/hooks/useToast";

import { Button } from "../UI/Button";
import Editor from "../UI/Editor";

interface UpdatePostProps {
  postId: string;
  title: string;
  toggleEdit: () => void;
  tags: Tag[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any;
}

const UpdatePost: React.FC<UpdatePostProps> = ({
  postId,
  blocks,
  title,
  toggleEdit,
  tags,
}) => {
  const pathname = usePathname();
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
            return router.push(generateCbUrl(pathname));
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
        <Button onClick={toggleEdit} variant="destructive" className="w-full">
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full"
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
