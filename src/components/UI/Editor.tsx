"use client";

import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/useToast";

import "@/styles/editor.css";

import type EditorJS from "@editorjs/editorjs";
import type { OutputBlockData } from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@prisma/client";
import { type AxiosError } from "axios";
import type { UseMutateFunction } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import type { infer as zodInfer } from "zod";

import { CreatePostValidator } from "@/lib/validators/post";
import type { PostCreationRequest } from "@/lib/validators/post";
import { useEditor } from "@/hooks/useEditor";

import CreateTags from "../Post/CreateTags";
import { ScrollArea } from "./ScrollArea";

interface EditorProps {
  submit: UseMutateFunction<
    Post,
    AxiosError<unknown, unknown>,
    Omit<PostCreationRequest, "forumId">
  >;
  isLoading: boolean;
  existingblocks?: OutputBlockData[];
  title?: string;
  tags?: string[];
}

type FormData = zodInfer<typeof CreatePostValidator>;

const Editor: FC<EditorProps> = ({
  submit,
  existingblocks,
  title,
  tags: _tags,
}) => {
  const [tags, setTags] = useState<string[]>(_tags ?? []);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  useEditor(editorRef, _titleRef, existingblocks);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreatePostValidator.omit({ forumId: true })),
    defaultValues: { title: title ?? "", content: null, tags: tags },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  const { ref: titleRef, ...rest } = register("title");

  const handleSubmitForm = async (data: PostCreationRequest) => {
    const blocks = await editorRef.current?.save();
    const payload: Omit<PostCreationRequest, "forumId"> = {
      title: data.title,
      content: blocks,
      tags: tags,
    };
    submit(payload);
  };

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <CreateTags tags={tags} setTags={setTags} />
      <ScrollArea className="relative h-[60vh] w-full rounded-lg border-2 border-zinc-800 bg-zinc-50 p-5 dark:bg-zinc-900">
        <form
          id="devcircle-post-form"
          className="w-fit rounded-md"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="prose prose-stone dark:prose-invert">
            <TextareaAutosize
              ref={titleRef}
              {...rest}
              placeholder="Title"
              className="h-fit w-full resize-none appearance-none overflow-hidden bg-transparent p-0 text-5xl font-bold focus:outline-none"
            />
            <div
              {...register("content")}
              id="editor"
              className="h-[40vh] p-0 hover:cursor-text"
            />
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default Editor;
