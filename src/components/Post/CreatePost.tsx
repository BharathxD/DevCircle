"use client"

import { usePathname, useRouter } from "next/navigation"
import type { Post } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { useMutation } from "react-query"

import type { PostCreationRequest } from "@/lib/validators/post"
import { toast } from "@/hooks/useToast"

import Editor from "./Editor"

interface CreatePostProps {
  forumId: string
}

const CreatePost: React.FC<CreatePostProps> = ({ forumId }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { mutate, isLoading } = useMutation<
    Post,
    AxiosError,
    Omit<PostCreationRequest, "forumId">
  >({
    mutationFn: async (payload: Omit<PostCreationRequest, "forumId">) => {
      const { data }: { data: Post } = await axios.post("/api/forum/post", {
        ...payload,
        forumId,
      })
      return data
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case StatusCodes.UNAUTHORIZED:
            return router.push("/signin?unauthorized=1")
          case StatusCodes.FORBIDDEN:
            return toast({
              title: "You are not subscribed to this community",
              description: "Please join the community and try again.",
              variant: "destructive",
            })
          case StatusCodes.BAD_REQUEST:
            return toast({
              title: "Post can't be empty",
              description: "Please make sure to provide content for the post.",
              variant: "destructive",
            })
          default:
            return toast({
              title: "Something went wrong",
              description: "Your post is not published, please try again later",
              variant: "destructive",
            })
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Your post is not published, please try again later",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      const redirectPath = pathname.split("/").slice(0, -1).join("/")
      router.push(redirectPath)
      router.refresh()
      toast({
        description: "Your post is published",
      })
    },
  })
  return <Editor submit={mutate} isLoading={isLoading} />
}

export default CreatePost
