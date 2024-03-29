"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Edit, Loader2 } from "lucide-react";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import type { EditCommentPayload } from "@/lib/validators/comments";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "../ui/textarea";

interface EditCommentProps {
  commentId: string;
  text: string;
}

const EditComment: React.FC<EditCommentProps> = ({ commentId, text }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [input, setInput] = useState<string>(text);
  const { mutate: editComment, isLoading } = useMutation({
    mutationFn: async ({ text }: Omit<EditCommentPayload, "commentId">) => {
      const payload = {
        commentId: commentId,
        text,
      } satisfies EditCommentPayload;
      const { data } = await axios.post(`/api/forum/post/comment `, payload);
      return data as { message: string };
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        return router.push(generateCbUrl(pathname));
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex flex-row items-center gap-2 px-2.5 py-2 hover:bg-zinc-800 hover:text-zinc-100">
          <Edit size={20} />
          Edit Comment
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit the comment</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid w-full gap-1.5">
              <div className="mt-2">
                <Textarea
                  id="comment"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-fit text-zinc-800 dark:text-zinc-50"
                  placeholder="Click to edit the comment..."
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-end gap-2 md:gap-0">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading || input.length === 0}
            onClick={() => {
              return editComment({ text: input });
            }}
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Edit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditComment;
