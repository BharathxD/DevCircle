"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { toast } from "@/hooks/useToast";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { CreateForumPayload } from "@/lib/validators/forum";

const PostCreationPage: FC = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation<
    string,
    AxiosError | Error
  >({
    mutationFn: async () => {
      const payload: CreateForumPayload = {
        forumName: input,
      };
      const { data } = await axios.post<string>("/api/forum", payload);
      return data;
    },
    onError: async (err: AxiosError | Error) => {
      const errorMap: {
        [key: number]: {
          title: string;
          description: string;
          variant: "default" | "destructive" | null | undefined;
        };
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
      };

      if (err instanceof AxiosError) {
        const { status = 0 } = err.response || {};
        const errorToast = errorMap[status];
        setInput("");
        if (errorToast) return toast(errorToast);
        if (status === StatusCodes.UNAUTHORIZED)
          return router.push("/signin?unauthorized=1");
      }

      return toast({
        title: "There was an error",
        description: "Could not create the Forum.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/d/${data}`);
    },
  });

  const handleCancelClick = () => router.back();
  const handleCreateForumClick = () => createCommunity();
  const isInputValid = input.length > 0;

  return (
    <div className="md:flex md:items-center md:justify-center md:h-[70vh] md:w-full">
      <div className="md:container flex items-center h-full w-full md:max-w-3xl md:mx-auto">
        <section className="bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-800 w-full rounded-lg">
          <header className="flex justify-between items-center border-b-2 border-b-zinc-800 p-5">
            <h1 className="text-2xl font-bold">Create a Community</h1>
          </header>
          <section className="p-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Name</h2>
              <p className="text-md pb-2 font-medium">
                Community names including capitalization cannot be changed.
              </p>
              <div className="relative">
                <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-600">
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
          <footer className="flex justify-end text-lg gap-4 p-5">
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
  );
};

export default PostCreationPage;
