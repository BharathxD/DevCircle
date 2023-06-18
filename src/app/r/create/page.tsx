"use client";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

const CreatePage = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      const payload = {};
      const { data } = await axios.post("/api/forum", payload);
    },
  });
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-zinc-50 border border-zinc-800 w-full h-fit rounded-lg space-y-6">
        <div className="flex justify-between items-center border-b border-b-zinc-800 p-5">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-600">
              r/
            </p>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 p-5">
          <Button
            disabled={isLoading}
            variant="skeleton"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            variant="inverted"
            disabled={input.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
