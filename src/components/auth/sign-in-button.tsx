"use client";

import Link from "next/link";
import type { Session } from "next-auth";

import { cn } from "@/lib/utils";

import UserNav from "../navigation/user-nav";

interface SignInButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  user?: Session["user"];
}

const SignInButton: React.FC<SignInButtonProps> = ({
  user,
  className,
  ...props
}) => {
  if (user) return <UserNav user={user} />;
  return (
    <Link
      href="/signin"
      className={cn(
        "flex h-full items-center justify-center rounded-md border-2 border-zinc-800 px-6 font-semibold transition-colors hover:bg-yellow-300 hover:text-zinc-800 md:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        className
      )}
      {...props}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
