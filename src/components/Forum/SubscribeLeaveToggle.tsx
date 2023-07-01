"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2 } from "lucide-react";
import qs from "query-string";
import { useMutation } from "react-query";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/useToast";

interface Forum {
  id: string;
  name: string;
}

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  forum: Forum;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  forum,
}) => {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState<boolean>(isSubscribed);
  const { id, name } = forum;
  const { mutate: patchSubscription, isLoading } = useMutation<number>({
    mutationFn: async () => {
      const response = await axios.patch(`/api/forum/${id}/subscription`);
      return response.status;
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.status === StatusCodes.UNAUTHORIZED) {
          const redirectPath = qs.stringifyUrl({
            url: "/signin",
            query: {
              unauthorized: 1,
            },
          });
          await router.push(redirectPath);
        } else if (response?.status === StatusCodes.NOT_FOUND) {
          toast({
            title: "Uh-Oh cannot do that right now",
            description: "It's on us, please try again later",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was a problem",
        description: "Something went wrong, try again later",
        variant: "destructive",
      });
    },
    onSuccess: async (status) => {
      startTransition(() => router.refresh());
      if (status === StatusCodes.OK) {
        setSubscribed(true);
        toast({
          title: "Subscription Successful",
          description: `You are now subscribed to d/${name}.`,
        });
      } else if (status === StatusCodes.ACCEPTED) {
        setSubscribed(false);
        toast({
          title: "Unsubscription Successful",
          description: `You are now unsubscribed from d/${name}.`,
        });
      }
    },
  });

  const handleToggleSubscription = () => {
    patchSubscription();
  };

  const buttonClassName = cn(
    `flex h-full w-full items-center justify-center px-6 py-4 text-center text-zinc-800`,
    subscribed
      ? "hover:bg-red-500 hover:text-zinc-50 dark:border-red-500 dark:text-zinc-50"
      : "hover:bg-green-500 hover:text-zinc-50 dark:border-green-500 dark:text-zinc-50"
  );

  return (
    <button
      className={buttonClassName}
      onClick={handleToggleSubscription}
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {!isLoading && (subscribed ? "Leave Community" : "Join Community")}
    </button>
  );
};

export default SubscribeLeaveToggle;
