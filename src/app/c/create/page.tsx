"use client";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";
import { CreateForumPayload } from "@/libs/validators/forum";
import { toast } from "@/hooks/useToast";

const CreatePage = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateForumPayload = {
        forumName: input,
      };
      const { data }: { data: string } = await axios.post(
        "/api/forum",
        payload
      );
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
      router.push(`/c/${data}`);
    },
  });

  return (
    <div className="md:flex md:items-center md:justify-center md:h-[70vh] md:w-full">
      <div className="md:container flex items-center h-full w-full md:max-w-3xl md:mx-auto">
        <section className="bg-zinc-50 border-2 border-zinc-800 w-full rounded-lg">
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
                  c/
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
              variant="destructive"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createCommunity()}
              isLoading={isLoading}
              variant="inverted"
              disabled={input.length === 0}
            >
              Create Forum
            </Button>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default CreatePage;
