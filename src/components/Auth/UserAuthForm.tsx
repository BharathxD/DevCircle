"use client";

import cn from "@/libs/classNames";
import { Button, buttonVariants } from "../UI/Button";
import { FC, HTMLAttributes } from "react";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/useToast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({
  className,
  ...props
}) => {
  const { toast } = useToast();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      return signIn("google");
    },
    onError: async () =>
      toast({
        title: "Something went wrong...",
        description: "There was an error logging in with Google",
        variant: "destructive",
      }),
  });
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
        onClick={() => mutate()}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {!isLoading && <FcGoogle className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
