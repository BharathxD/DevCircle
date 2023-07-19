"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2, Send } from "lucide-react";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import type { CommentPayload } from "@/lib/validators/comments";
import { toast } from "@/hooks/use-toast";

import { Textarea } from "../ui/textarea";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentPayload) => {
      const payload: CommentPayload = {
        postId,
        text,
        replyToId,
      };
      const { data }: AxiosResponse<{ message: string }> = await axios.patch(
        `/api/forum/post/comment`,
        payload
      );
      return data;
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
    <div className="grid w-full gap-1.5">
      <div className="flex flex-row gap-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          className="flex h-fit resize-none items-center justify-center"
          placeholder="Comment your thoughts..."
        />
        <button
          disabled={isLoading || input.length === 0}
          onClick={() => {
            return comment({ postId, text: input, replyToId });
          }}
          className="h-full cursor-pointer rounded-md border-2 border-zinc-800 bg-emerald-500 px-4 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-emerald-600 md:px-2"
        >
          {isLoading && <Loader2 className="animate-spin" size={20} />}
          {!isLoading && <Send size={20} />}
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
