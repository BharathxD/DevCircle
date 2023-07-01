import Link from "next/link";

import { buttonVariants } from "@/components/UI/Button";

import { toast } from "./useToast";

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          href="/signin"
          className={buttonVariants({ variant: "body", className: "w-full" })}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};
