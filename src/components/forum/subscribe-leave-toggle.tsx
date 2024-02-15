"use client";

import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2 } from "lucide-react";
import { useMutation } from "react-query";

import { cn, generateCbUrl } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Forum {
  id: string;
  name: string;
}

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  forum: Forum;
  isLoggedIn?: boolean;
}

const SubscribeLeaveToggle: React.VFC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  forum,
  isLoggedIn = false,
}) => {
  const { id, name } = forum;
  const pathname = usePathname();
  const router = useRouter();
  const [subscribed, setSubscribed] = useState<boolean>(isSubscribed);
  const { mutate: patchSubscription, isLoading } = useMutation<number>({
    mutationFn: async () => {
      const response = await axios.patch(`/api/forum/${id}/subscription`);
      return response.status;
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === StatusCodes.UNAUTHORIZED) {
          router.push(generateCbUrl(pathname));
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
    if (!isLoggedIn) return router.push(generateCbUrl(pathname));
    patchSubscription();
  };

  return (
    <button
      className={cn(
        "flex size-full items-center justify-center px-6 py-4 text-center text-zinc-50 dark:bg-zinc-900",
        subscribed &&
          "bg-red-100 text-zinc-800 hover:bg-red-500 hover:text-zinc-50 dark:border-red-500 dark:text-zinc-50 hover:dark:bg-red-500",
        !subscribed &&
          "bg-green-100 text-zinc-800 hover:bg-green-500 hover:text-zinc-50 dark:border-green-500 dark:text-zinc-50 hover:dark:bg-green-500"
      )}
      onClick={handleToggleSubscription}
      disabled={isLoading}
      aria-label={subscribed ? "Subscribe" : "Leave"}
      aria-pressed={subscribed}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {!isLoading && (subscribed ? "Leave Community" : "Join Community")}
    </button>
  );
};

export default SubscribeLeaveToggle;
