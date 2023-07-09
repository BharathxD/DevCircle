"use client";

import type { HTMLAttributes } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

import { Button } from "../UI/Button";

type OAuthSignInProps = HTMLAttributes<HTMLDivElement> & {
  redirectUrl?: string;
};

const OAuthSignIn: React.FC<OAuthSignInProps> = ({
  className,
  redirectUrl = "/",
  ...props
}) => {
  const { toast } = useToast();
  const { mutate: SignIn, isLoading } = useMutation({
    mutationFn: async () => {
      await signIn("google", { callbackUrl: redirectUrl });
    },
    onError: () => {
      toast({
        title: "Something went wrong...",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    },
  });

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        className="w-full"
        variant="skeleton"
        onClick={() => SignIn()}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {!isLoading && <FcGoogle className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
};

export default OAuthSignIn;
