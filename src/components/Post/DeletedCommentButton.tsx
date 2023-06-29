"use client"

import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { MdDelete } from "react-icons/md"
import { useMutation } from "react-query"

import { toast } from "@/hooks/useToast"

import { Button } from "../UI/Button"

interface DeleteCommentProps {
  commentId: string
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId }) => {
  const router = useRouter()
  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/forum/post/comment?commentId=${commentId}`)
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        toast({
          title: "You are not authorized to delete this comment",
          variant: "destructive",
        })
      }
      toast({
        title: "Something went wrong",
        description: "The comment cannot be deleted, please try again",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      router.refresh()
      toast({ title: "Comment deleted" })
    },
  })
  return (
    <Button
      onClick={() => deleteComment()}
      variant="destructive"
      className="p-2"
      isLoading={isLoading}
      disabled={isLoading}
    >
      {!isLoading && <MdDelete size={20} />}
    </Button>
  )
}

export default DeleteComment
