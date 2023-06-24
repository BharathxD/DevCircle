"use client";

import { User } from "@prisma/client";
import UserAccountNav from "../Navbar/UserAccountNav";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SignInButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  user: User | null;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  user,
  className,
  ...props
}) => {
  if (user) return <UserAccountNav user={user} />;
  return (
    <Link
      href="/signin"
      className={cn(
        "h-full px-5 py-6 flex items-center justify-center font-medium transition-colors hover:bg-yellow-300 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-50 border-2 rounded-md md:border-zinc-800 border-zinc-800",
        className
      )}
      {...props}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
