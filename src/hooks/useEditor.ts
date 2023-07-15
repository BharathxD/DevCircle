"use client";

import { useEffect } from "react";
import { type OutputData } from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";

import { uploadFiles } from "@/lib/uploadFiles";

/**
 * Custom hook for managing the EditorJS editor instance.
 * @param editorRef - Mutable ref object for storing the editor instance.
 * @param titleRef - Mutable ref object for the title textarea element.
 * @param blocks - Initial blocks data for the editor.
 */
export const useEditor = (
  editorRef: React.MutableRefObject<EditorJS | null>,
  titleRef: React.MutableRefObject<HTMLTextAreaElement | null>,
  blocks?: OutputData["blocks"]
) => {
  useEffect(() => {
    /**
     * Initializes the EditorJS instance and sets up the editor.
     */
    const initializeEditor = async () => {
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
          onReady: () => {
            editorRef.current = editor;
          },
          placeholder: "Click here to write your post...",
          inlineToolbar: true,
          data: { blocks: blocks ?? [] },
          tools: {
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
                    const [res] = await uploadFiles({
                      files: [file],
                      endpoint: "imageUploader",
                    });
                    return {
                      success: 1,
                      file: {
                        url: res?.fileUrl,
                      },
                    };
                  },
                },
              },
            },
            list: List,
            header: Header,
            code: Code,
            inlineCode: InlineCode,
            table: Table,
            embed: Embed,
          },
        });
      }
    };

    const focusTitle = () => {
      if (titleRef.current) titleRef.current.focus();
    };

    void initializeEditor();
    focusTitle();

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [editorRef, titleRef, blocks]);
};
