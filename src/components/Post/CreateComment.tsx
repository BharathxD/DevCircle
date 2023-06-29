"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import queryString from "query-string"
import { useMutation } from "react-query"

import type { CommentPayload } from "@/lib/validators/comments"
import { toast } from "@/hooks/useToast"

import { Button } from "../UI/Button"
import { Label } from "../UI/Label"
import { Textarea } from "../UI/Textarea"

interface CreateCommentProps {
  postId: string
  replyToId?: string
}

const CreateComment: React.FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const router = useRouter()
  const [input, setInput] = useState<string>("")
  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentPayload) => {
      const payload: CommentPayload = {
        postId,
        text,
        replyToId,
      }
      const { data } = await axios.patch(`/api/forum/post/comment`, payload)
      return data
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        const redirectPath = queryString.stringifyUrl({
          url: "/signin",
          query: {
            unauthorized: 1,
          },
        })
        return router.push(redirectPath)
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      router.refresh()
      setInput("")
    },
  })
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment" className="text-lg font-semibold">
        Your comment
      </Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts on this post?"
        />
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            disabled={isLoading || input.length === 0}
            isLoading={isLoading}
            onClick={() => {
              return comment({ postId, text: input, replyToId })
            }}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
