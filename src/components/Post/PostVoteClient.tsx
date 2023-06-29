"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePrevious } from "@mantine/hooks"
import type { VoteType } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { useMutation } from "react-query"

import { cn } from "@/lib/utils"
import type { PostVoteRequest } from "@/lib/validators/vote"
import { toast } from "@/hooks/useToast"

import { Button } from "../UI/Button"

interface PostVoteClientProps {
  postId: string
  initialVote?: VoteType | null
  initialVoteAmount: number
  isLoggedIn?: boolean
}

const PostVoteClient: React.FC<PostVoteClientProps> = ({
  postId,
  initialVoteAmount,
  initialVote,
  isLoggedIn,
}) => {
  const router = useRouter()
  const [votesAmount, setVotesAmount] = useState<number>(initialVoteAmount)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const prevVote = usePrevious(currentVote)
  useEffect(() => {
    setCurrentVote(initialVote)
  }, [initialVote])
  const { mutate: vote, isLoading } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType: type,
      }
      await axios.patch("/api/forum/post/vote", payload)
    },

    onError: async (error, voteType) => {
      if (voteType === "UP") setVotesAmount((prev) => prev - 1)
      else setVotesAmount((prev) => prev + 1)

      setCurrentVote(prevVote)

      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED)
          return router.push("/signin?unauthorized=1")
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again",
        variant: "destructive",
      })
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined)
        if (type === "UP") setVotesAmount((prev) => prev - 1)
        else if (type === "DOWN") setVotesAmount((prev) => prev + 1)
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type)
        if (type === "UP")
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1))
        else if (type === "DOWN")
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1))
      }
    },
  })
  const handleVote = useCallback(
    (voteType: "UP" | "DOWN") => {
      if (!isLoggedIn) return router.push("/signin/?unauthorized=1")
      vote(voteType)
    },
    [isLoggedIn, router, vote]
  )
  return (
    <div className="flex gap-4 sm:w-16 sm:flex-col sm:gap-0 sm:pb-0">
      <Button
        size="sm"
        aria-label="upvote"
        onClick={() => handleVote("UP")}
        className={cn(
          "text-zinc-800 hover:bg-green-300 hover:text-zinc-800 hover:outline-2 hover:outline-green-500 dark:text-zinc-50 dark:hover:bg-green-500 dark:hover:text-zinc-50",
          {
            "bg-green-300 dark:bg-green-500 dark:outline-green-600":
              currentVote === "UP",
          }
        )}
        disabled={isLoading && currentVote === "UP"}
      >
        <AiOutlineArrowUp className={"h-5 w-5"} />
      </Button>
      <p className="py-2 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {votesAmount}
      </p>
      <Button
        size="sm"
        aria-label="downvote"
        onClick={() => handleVote("DOWN")}
        className={cn(
          "text-zinc-800 hover:bg-red-300 hover:text-zinc-800 hover:outline-2 hover:outline-red-500 dark:text-zinc-50 dark:hover:bg-red-500 dark:hover:text-zinc-50",
          {
            "bg-red-300 dark:bg-red-500 dark:outline-red-600":
              currentVote === "DOWN",
          }
        )}
        disabled={isLoading && currentVote === "DOWN"}
      >
        <AiOutlineArrowDown className={"h-5 w-5"} />
      </Button>
    </div>
  )
}

export default PostVoteClient
