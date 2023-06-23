"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreationRequest, PostValidator } from "@/libs/validators/post";
import { infer as zodInfer } from "zod";
import EditorJS from "@editorjs/editorjs";
import { usePathname, useRouter } from "next/navigation";
import { uploadFiles } from "@/libs/uploadThing";
import { toast } from "@/hooks/useToast";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Button } from "../UI/Button";
import "@/styles/editor.css";

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

  const router = useRouter();
  const pathname = usePathname();

  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const [isMounted, setIsMounted] = useState(false);

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
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        if (_titleRef.current) _titleRef.current.focus();
      }, 0);
    };
    if (isMounted) {
      init();
      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { ref: titleRef, ...rest } = register("title");

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (payload: PostCreationRequest) => {
      const { data } = await axios.post("/api/forum/post/create", {});
      return data;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.UNAUTHORIZED:
            return router.push("/signin?unauthorized=1");
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
    onSuccess: (data) => {
      const redirectPath = pathname.split("/").slice(0, -1).join("/");
      router.push(redirectPath);
      router.refresh();
      toast({
        description: "Your post is published",
      });
    },
  });

  const handleSubmitForm = async (data: PostCreationRequest) => {
    const blocks = await editorRef.current?.save();
    const payload: PostCreationRequest = {
      forumId,
      title: data.title,
      content: blocks,
    };
    mutate(payload);
  };

  return (
    <div className="w-full p-5 pb-1 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-800 rounded-lg border-2 border-zinc-800 relative">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={titleRef}
            {...rest}
            placeholder="Title"
            className="w-full h-fit resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-0"
          />
          <div {...register("content")} id="editor" className="min-h-[40vh]" />
        </div>
      </form>
      <div className="w-full mb-3 flex justify-end absolute -bottom-[4.5rem] left-0 right-0">
        <Button
          type="submit"
          className="w-full text-lg font-bold bg-zinc-800 hover:bg-zinc-50 text-zinc-50 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 hover:text-zinc-800"
          form="subreddit-post-form"
          isLoading={isLoading}
          disabled={isLoading}
        >
          POST
        </Button>
      </div>
    </div>
  );
};

export default Editor;
