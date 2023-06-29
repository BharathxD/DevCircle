"use client"

import { useState } from "react"
import type { FC } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { useMutation } from "react-query"

import type { CreateForumPayload } from "@/lib/validators/forum"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"

const PostCreationPage: FC = () => {
  const [input, setInput] = useState<string>("")
  const router = useRouter()

  const { mutate: createCommunity, isLoading } = useMutation<
    string,
    AxiosError | Error
  >({
    mutationFn: async () => {
      const payload: CreateForumPayload = {
        forumName: input,
      }
      const { data } = await axios.post<string>("/api/forum", payload)
      return data
    },

    onError: async (err: AxiosError | Error) => {
      const errorMap: {
        [key: number]: {
          title: string
          description: string
          variant: "default" | "destructive" | null | undefined
        }
      } = {
        [StatusCodes.CONFLICT]: {
          title: "Forum already exists",
          description: "Please choose a different name.",
          variant: "destructive",
        },
        [StatusCodes.UNPROCESSABLE_ENTITY]: {
          title: "Invalid forum name",
          description: "Please choose a name between 3 and 21 letters.",
          variant: "destructive",
        },
      }

      if (err instanceof AxiosError) {
        const { status = 0 } = err.response || {}
        const errorToast = errorMap[status]
        setInput("")
        if (errorToast) return toast(errorToast)
        if (status === StatusCodes.UNAUTHORIZED)
          return router.push("/signin?unauthorized=1")
      }

      return toast({
        title: "There was an error",
        description: "Could not create the Forum.",
        variant: "destructive",
      })
    },
    onSuccess: (data) => {
      router.push(`/d/${data}`)
    },
  })

  const handleCancelClick = () => router.back()
  const handleCreateForumClick = () => createCommunity()
  const isInputValid = input.length > 0

  return (
    <div className="md:flex md:h-[70vh] md:w-full md:items-center md:justify-center">
      <div className="flex h-full w-full items-center md:container md:mx-auto md:max-w-3xl">
        <section className="w-full rounded-lg border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <header className="flex items-center justify-between border-b-2 border-b-zinc-800 p-5 dark:border-b">
            <h1 className="text-2xl font-bold">Create a Community</h1>
          </header>
          <section className="p-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Name</h2>
              <p className="pb-2 font-medium">
                Community names including capitalization cannot be changed.
              </p>
              <div className="relative">
                <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-600">
                  d/
                </p>
                <Input
                  value={input}
                  type="text"
                  onChange={(event) => setInput(event.target.value)}
                  className="pl-6"
                />
              </div>
            </div>
          </section>
          <footer className="flex justify-end gap-4 p-5 text-lg">
            <Button
              disabled={isLoading}
              className="dark:bg-red-400"
              variant="destructive"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateForumClick}
              isLoading={isLoading}
              variant="inverted"
              disabled={!isInputValid}
            >
              Create Forum
            </Button>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default PostCreationPage
