"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { FC } from "react"
import { useForm } from "react-hook-form"

import { toast } from "@/hooks/useToast"

import "@/styles/editor.css"

import type EditorJS from "@editorjs/editorjs"
import type { OutputBlockData, OutputData } from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tag, type Post } from "@prisma/client"
import { type AxiosError } from "axios"
import type { UseMutateFunction } from "react-query"
import TextareaAutosize from "react-textarea-autosize"
import type { infer as zodInfer } from "zod"

import { uploadFiles } from "@/lib/uploadFiles"
import { CreatePostValidator } from "@/lib/validators/post"
import type { PostCreationRequest } from "@/lib/validators/post"

import { Button } from "../UI/Button"
import { ScrollArea } from "../UI/ScrollArea"
import Tags from "./Tags"

interface EditorProps {
  submit: UseMutateFunction<
    Post,
    AxiosError<unknown, unknown>,
    Omit<PostCreationRequest, "forumId">
  >
  isLoading: boolean
  blocks?: OutputBlockData[]
  title?: string
  tags?: string[]
}

type FormData = zodInfer<typeof CreatePostValidator>

const Editor: FC<EditorProps> = ({ submit, blocks, title, tags: _tags }) => {
  const editorRef = useRef<EditorJS | null>(null)
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [tags, setTags] = useState<string[]>(_tags ?? [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreatePostValidator.omit({ forumId: true })),
    defaultValues: { title: title ?? "", content: null, tags: tags },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor
        },
        placeholder: "Click here to write your post...",
        inlineToolbar: true,
        data: { blocks: blocks ?? [] },
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
                async uploadByFile(file: File[]) {
                  const [res] = await uploadFiles({
                    endpoint: "imageUploader",
                    files: file,
                  })
                  return {
                    success: 1,
                    file: {
                      url: res?.fileUrl,
                    },
                  }
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
      })
    }
  }, [blocks])

  useEffect(() => {
    const init = () => {
      initializeEditor()
      setTimeout(() => {
        if (_titleRef.current) _titleRef.current.focus()
      }, 0)
    }
    if (isMounted) {
      init()
      return () => {
        editorRef.current?.destroy()
        editorRef.current = null
      }
    }
  }, [isMounted, initializeEditor])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors])

  const { ref: titleRef, ...rest } = register("title")

  const handleSubmitForm = async (data: PostCreationRequest) => {
    const blocks = await editorRef.current?.save()
    const payload: Omit<PostCreationRequest, "forumId"> = {
      title: data.title,
      content: blocks,
      tags: tags,
    }
    submit(payload)
  }

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <Tags tags={tags} setTags={setTags} />
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
  )
}

export default Editor
