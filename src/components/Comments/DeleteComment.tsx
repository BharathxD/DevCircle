"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "react-query";

import { toast } from "@/hooks/useToast";

interface DeleteCommentProps {
  commentId: string;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId }) => {
  const router = useRouter();
  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/forum/post/comment?commentId=${commentId}`);
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to delete this comment.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description:
            "Something went wrong. The comment could not be deleted.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button
      className="flex w-full flex-row items-center gap-2 px-2.5 py-2 hover:bg-red-500 hover:text-zinc-100"
      onClick={() => deleteComment()}
      disabled={isLoading}
    >
      {!isLoading && <Trash2 size={20} />}
      {isLoading && <Loader2 size={20} className="animate-spin" />}
      Delete
    </button>
  );
};

export default DeleteComment;
