"use client";

import {
  Fragment,
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import type { CreateForumPayload } from "@/lib/validators/forum";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CreateFormForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { mutate: createForum, isLoading } = useMutation<
    string,
    AxiosError | Error
  >({
    mutationFn: async () => {
      const payload = {
        forumName: input,
        description,
      } satisfies CreateForumPayload;
      const { data } = await axios.post<string>("/api/forum", payload);
      return data;
    },
    onError: async (error: AxiosError | Error) => {
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
        [StatusCodes.BAD_REQUEST]: {
          title: "Invalid forum name",
          description: "Please choose a name between 3 and 21 letters.",
          variant: "destructive",
        },
      };

      if (error instanceof AxiosError) {
        const { status = 0 } = error.response || {};
        const errorToast = errorMap[status];
        setInput("");
        if (errorToast) return toast(errorToast);
        if (status === StatusCodes.UNAUTHORIZED)
          return router.push(generateCbUrl(pathname));
      }

      return toast({
        title: "There was an error",
        description: "Could not create the forum.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => router.push(`/d/${data}`),
  });

  const handleCancelClick = useCallback(() => router.back(), [router]);
  const handleCreateForumClick = useCallback(
    () => createForum(),
    [createForum]
  );
  const isValidInput = useMemo(
    () => input.length >= 3 && description.length >= 10 && !/\s/.test(input),
    [description.length, input]
  );
  return (
    <Fragment>
      <section className="p-5">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-600">
              d/
            </p>
            <Input
              value={input}
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput(event.target.value)
              }
              className="pl-6"
              placeholder="Geopolitics"
            />
          </div>
          <p className="text-zinc-500">
            Community names should be 4-20 characters long and must not contain
            spaces.
          </p>
          <div>
            <Textarea
              value={description}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(event.target.value)
              }
              className="resize-none border-zinc-700 outline-none"
              rows={2}
              minLength={10}
              maxLength={75}
              placeholder="What does your community do?"
            />
          </div>
          <p className="text-zinc-500">
            Description should be at least 3 and 10 characters respectively.
          </p>
        </div>
      </section>
      <footer className="flex justify-end gap-4 p-5 text-lg">
        <Button
          disabled={isLoading}
          className="dark:bg-red-500"
          variant="destructive"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateForumClick}
          isLoading={isLoading}
          disabled={!isValidInput}
        >
          Create Forum
        </Button>
      </footer>
    </Fragment>
  );
};

export default CreateFormForm;
