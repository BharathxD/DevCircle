"use client";

import type { FC } from "react";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";

import siteConfig from "@/config/site";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import OAuthSignIn from "./oauth-signin";

interface SignInProps {
  customTitle?: string;
}

const SignUp: FC<SignInProps> = () => {
  return (
    <Card className="flex flex-col justify-center border-2 border-zinc-800 text-center backdrop-blur-sm dark:bg-zinc-950/80">
      <CardHeader className="flex flex-col gap-2">
        <FiGlobe size={75} className="mx-auto dark:text-zinc-300" />
        <CardTitle className="h-full bg-clip-text text-4xl font-semibold tracking-tight text-zinc-800 dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400 dark:text-transparent md:text-4xl">
          Register Now
        </CardTitle>
        <CardDescription className="mx-auto max-w-xs text-lg tracking-tighter">
          By continuing, you are setting up a {siteConfig.name} account and
          agree to our User Agreement and Privacy Policy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthSignIn />
      </CardContent>
      <CardContent>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-900" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-lg px-1 text-muted-foreground backdrop-blur-lg md:bg-background">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-center text-center text-sm text-zinc-700 dark:text-zinc-300">
        <p className="mr-2">Already have an account?</p>
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-zinc-800 dark:hover:text-zinc-500"
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
