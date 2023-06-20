"use client";

import { FC, useCallback, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidator } from "@/libs/validators/post";
import { infer as zodInfer } from "zod";
import EditorJS from "@editorjs/editorjs";
import { usePathname, useRouter } from "next/navigation";

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

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();

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

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          Header: Header,
          LinkTool: {
            class: LinkTool,
            config: { endpoint: "/api/link" },
          },
        },
      });
    }
  }, []);

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
