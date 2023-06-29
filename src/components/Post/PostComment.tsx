"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { Comment, CommentVote, User, VoteType } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import queryString from "query-string"
import { BiMessageDetail } from "react-icons/bi"
import { useMutation } from "react-query"

import formatTimeToNow from "@/lib/formatTimeToNow"
import type { CommentPayload } from "@/lib/validators/comments"
import useOnClickOutside from "@/hooks/useOnClickOutside"
import { toast } from "@/hooks/useToast"

import { Button } from "../UI/Button"
import { Textarea } from "../UI/Textarea"
import UserAvatar from "../UI/UserAvatar"
import CommentVotes from "./CommentVotes"
import DeleteComment from "./DeletedCommentButton"

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  initialCommentVoteAmount: number
  initialCommentVote?: VoteType
  userId?: string
  postId: string
  isDeleteable: boolean
}

const PostComment: React.FC<PostCommentProps> = ({
  comment,
  initialCommentVoteAmount,
  initialCommentVote,
  userId,
  postId,
  isDeleteable,
}) => {
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const commentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  useOnClickOutside(commentRef, () => {
    setIsReplying(false)
  })
  const { mutate: reply, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentPayload) => {
      const payload: CommentPayload = {
        postId,
        text,
        replyToId,
      }
      const { data } = await axios.patch(`/api/forum/post/comment `, payload)
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
      toast({
        title: `Replied to u/${comment.author.name}`,
      })
      setInput("")
    },
  })
  return (
    <div
      className="flex flex-col gap-3 rounded-md border-2 border-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50"
      ref={commentRef}
    >
      <div className="flex items-center px-3 pt-3">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex w-full items-center justify-between gap-x-2">
          <div>
            <p className="font-medium text-zinc-800 dark:text-zinc-50">
              u/{comment.author.name}
            </p>
            <p className="max-h-40 truncate text-sm text-zinc-500">
              {formatTimeToNow(new Date(comment.createdAt))}
            </p>
          </div>
          {comment.authorId === userId && isDeleteable && (
            <DeleteComment commentId={comment.id} />
          )}
        </div>
      </div>
      <p className="px-3 text-zinc-900 dark:text-zinc-50">{comment.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex w-full flex-row gap-5 px-3 pb-3">
          <CommentVotes
            commentId={comment.id}
            initialVoteAmount={initialCommentVoteAmount}
            initialCommentVote={initialCommentVote}
            isLoggedIn={!!userId}
            classNames="h-10 flex-row w-min"
          />
          <Button
            variant="skeleton"
            size="sm"
            onClick={() => {
              if (!userId) return router.push("/signin?unauthorized=1")
              return setIsReplying((prevState) => !prevState)
            }}
          >
            <BiMessageDetail size={20} />
          </Button>
        </div>
        {isReplying && (
          <div className="grid w-full gap-1.5 p-3 dark:bg-zinc-800/50">
            <label htmlFor="comment">Your comment</label>
            <div className="mt-2">
              <Textarea
                id="comment"
                autoFocus
                onFocus={(event) =>
                  event.currentTarget.setSelectionRange(
                    event.currentTarget.value.length,
                    event.currentTarget.value.length
                  )
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                className="border-2 border-zinc-800"
                placeholder="What are your thoughts on this post?"
              />
              <div className="flex justify-end gap-3 pl-3 pt-5">
                <Button
                  variant="destructive"
                  onClick={() => setIsReplying((prevState) => !prevState)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  disabled={isLoading || input.length === 0}
                  isLoading={isLoading}
                  onClick={() => {
                    if (!input) return
                    return reply({
                      postId,
                      text: input,
                      replyToId: comment.replyToId ?? comment.id,
                    })
                  }}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostComment
