"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";

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
import useEditor from "@/hooks/use-editor";

import CreateTags from "../post/create-tags";
import { ScrollArea } from "./scroll-area";

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
  tags: tagData,
}) => {
  const tagRef = useRef<string[]>(tagData ?? []);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const isEditorInitialized = useRef<boolean>(false);
  const editorRef = useRef<EditorJS | null>(null);
  const { initializeEditor, focusTitle } = useEditor(
    editorRef,
    _titleRef,
    existingblocks
  );
  const addTags = useCallback((tags: string[]) => {
    const updatedTags = tagRef.current.concat(tags);
    tagRef.current = updatedTags;
  }, []);
  const deleteTags = useCallback((tagToDelete: string) => {
    const updatedTags = tagRef.current.filter((tag) => tag !== tagToDelete);
    tagRef.current = updatedTags;
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreatePostValidator.omit({ forumId: true })),
    defaultValues: { title: title ?? "", content: null, tags: tagData },
  });

  const { ref: titleRef, ...rest } = register("title");

  useEffect(() => {
    if (!editorRef.current && !isEditorInitialized.current) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      initializeEditor();
      isEditorInitialized.current = true;
    }
    focusTitle();
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
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

  const handleSubmitForm = async (data: PostCreationRequest) => {
    const blocks = await editorRef.current?.save();
    const payload: Omit<PostCreationRequest, "forumId"> = {
      title: data.title,
      content: blocks,
      tags: tagRef.current,
    };
    submit(payload);
  };

  return (
    <div className="flex size-full flex-col gap-3">
      <CreateTags
        onAddTag={addTags}
        onDelete={deleteTags}
        initialTags={tagRef.current}
      />
      <ScrollArea className="relative h-[60vh] w-full rounded-lg border-2 border-zinc-800 bg-zinc-50 p-5 dark:bg-zinc-900">
        <form
          id="devcircle-post-form"
          className="w-fit rounded-md"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="prose prose-stone dark:prose-invert">
            <TextareaAutosize
              ref={titleRef}
              placeholder="Title"
              className="h-fit w-full resize-none appearance-none overflow-hidden bg-transparent p-0 text-5xl font-bold focus:outline-none"
              {...rest}
            />
            <div
              id="editor"
              className="h-[40vh] p-0 hover:cursor-text"
              {...register("content")}
            />
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

Editor.displayName = "Editor";

export default memo(Editor);
