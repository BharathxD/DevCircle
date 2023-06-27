"use client"

import { startTransition, useState } from "react"
import type { FC } from "react"
import { useRouter } from "next/navigation"
import type { Forum } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import qs from "query-string"
import { useMutation } from "react-query"

import { toast } from "@/hooks/useToast"

import { Button } from "../UI/Button"

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  forum: Pick<Forum, "id" | "name">
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  forum,
}) => {
  const router = useRouter()
  const [subscribed, setSubscribed] =
    useState<typeof isSubscribed>(isSubscribed)
  const { id, name } = forum
  const { mutate: patchSubscription, isLoading } = useMutation({
    mutationFn: async () => {
      const { status } = await axios.patch(`/api/forum/${id}/subscription`)
      return status
    },

    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          const redirectPath = qs.stringifyUrl({
            url: "/signin",
            query: {
              unauthorized: 1,
            },
          })
          return router.push(redirectPath)
        }
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          return toast({
            title: "Uh-Oh cannot do that right now",
            description: "It's on us, please try again later",
            variant: "destructive",
          })
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      })
    },

    onSuccess: async (status) => {
      startTransition(() => router.refresh())
      if (status === StatusCodes.OK) {
        setSubscribed(true)
        return toast({
          title: "Subscription Successful",
          description: `You are now subscribed to d/${name}.`,
        })
      } else if (status === StatusCodes.ACCEPTED) {
        setSubscribed(false)
        return toast({
          title: "Unsubscription Successful",
          description: `You are now unsubscribed from d/${name}.`,
        })
      }
    },
  })
  if (!subscribed) {
    return (
      <Button
        className="w-full hover:bg-green-500 dark:text-zinc-50"
        onClick={() => patchSubscription()}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Join to Post
      </Button>
    )
  }
  return (
    <Button
      className="w-full text-zinc-800 hover:bg-red-500 dark:border-red-500 dark:text-zinc-50"
      onClick={() => patchSubscription()}
      disabled={isLoading}
      isLoading={isLoading}
    >
      Leave Community
    </Button>
  )
}

export default SubscribeLeaveToggle
