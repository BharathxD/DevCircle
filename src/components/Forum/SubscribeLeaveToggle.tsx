"use client";

import { FC, startTransition, useState } from "react";
import { Button } from "../UI/Button";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { Forum } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/useToast";
import qs from "query-string";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  forum: Pick<Forum, "id" | "name">;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  forum,
}) => {
  const router = useRouter();
  const [subscribed, setSubscribed] =
    useState<typeof isSubscribed>(isSubscribed);
  const { id, name } = forum;
  const { mutate: patchSubscription, isLoading } = useMutation({
    mutationFn: async () => {
      const { status } = await axios.patch(`/api/forum/${id}/subscription`);
      return status;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          const redirectPath = qs.stringifyUrl({
            url: "/signin",
            query: {
              unauthorized: 1,
            },
          });
          return router.push(redirectPath);
        }
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          return toast({
            title: "Uh-Oh cannot do that right now",
            description: "It's on us, please try again later",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: async (status) => {
      startTransition(() => router.refresh());
      if (status === StatusCodes.OK) {
        setSubscribed(true);
        return toast({
          title: "Subscription Successful",
          description: `You are now subscribed to c/${name}.`,
        });
      } else if (status === StatusCodes.ACCEPTED) {
        setSubscribed(false);
        return toast({
          title: "Unsubscription Successful",
          description: `You are now unsubscribed from c/${name}.`,
        });
      }
    },
  });
  if (!subscribed) {
    return (
      <Button
        className="hover:bg-green-500 w-full"
        onClick={() => patchSubscription()}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Join to Post
      </Button>
    );
  }
  return (
    <Button
      className="hover:bg-red-500 w-full"
      onClick={() => patchSubscription()}
      disabled={isLoading}
      isLoading={isLoading}
    >
      Leave Community
    </Button>
  );
};

export default SubscribeLeaveToggle;
