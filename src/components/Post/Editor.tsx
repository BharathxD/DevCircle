"use client";

import { FC } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidator } from "@/libs/validators/post";
import { infer as zodInfer } from "zod";

interface EditorProps {
  forumId: string;
}

type FormData = zodInfer<typeof PostValidator>;

const Editor: FC<EditorProps> = ({ forumId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      forumId,
      content: null,
    },
  });
  return (
    <div className="w-full p-5 pb-1 bg-zinc-50 rounded-lg border-2 border-zinc-800">
      <form id="subreddit-post-form" className="w-fit" onSubmit={() => {}}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            placeholder="Title"
            className="w-full h-fit resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-0"
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;
