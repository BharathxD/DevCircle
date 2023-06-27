"use client"

import Link from "next/link"
import type { User } from "@prisma/client"

import { cn } from "@/lib/utils"

import UserAccountNav from "../Navbar/UserAccountNav"

interface SignInButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  user: User | null
}

const SignInButton: React.FC<SignInButtonProps> = ({
  user,
  className,
  ...props
}) => {
  if (user) return <UserAccountNav user={user} />
  return (
    <Link
      href="/signin"
      className={cn(
        "flex h-full items-center justify-center rounded-md border-2 border-zinc-800 px-5 py-6 font-medium transition-colors hover:bg-yellow-300 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 md:border-zinc-800",
        className
      )}
      {...props}
    >
      Sign In
    </Link>
  )
}

export default SignInButton
