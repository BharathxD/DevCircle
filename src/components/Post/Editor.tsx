"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidator } from "@/libs/validators/post";
import { infer as zodInfer } from "zod";
import EditorJS from "@editorjs/editorjs";
import { usePathname, useRouter } from "next/navigation";
import { uploadFiles } from "@/libs/uploadThing";

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
    defaultValues: { title: "", forumId, content: null },
  });

  const editorRef = useRef<EditorJS>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          Header,
          LinkTool: {
            class: LinkTool,
            config: { endpoint: "/api/link" },
          },
          ImageTool: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");
                  return { success: 1, file: { url: res.fileUrl } };
                },
              },
            },
          },
          list: List,
          code: Code,
          InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.focus();
        }
      });
    };
    if (isMounted) {
      init();
      return () => {};
    }
  }, [isMounted, initializeEditor]);

  const handleSubmitForm = () => {
    // TODO: Implement form submission logic
  };

  return (
    <div className="w-full p-5 pb-1 bg-zinc-50 rounded-lg border-2 border-zinc-800">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            placeholder="Title"
            className="w-full h-fit resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-0"
            {...register("title")}
          />
          <div id="editor" className="min-h-[40vh] p-0 mb-4" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
