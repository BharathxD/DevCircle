"use client";

import siteConfig from "@/config";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import OAuthSignIn from "./OAuthSignIn";
import { FC } from "react";

interface SignInProps {
  customTitle?: string;
}

const SignIn: FC<SignInProps> = ({ customTitle }) => {
  const title = customTitle ?? "Welcome back!";
  return (
    <div className="mx-auto w-full h-full flex flex-col justify-center pt-2 pb-6 gap-4 md:px-8 text-center">
      <FiGlobe size={75} className="mx-auto" />
      <h1 className="text-4xl md:text-4xl -mb-1 h-full font-semibold tracking-tight dark:text-transparent text-zinc-800 dark:bg-clip-text dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400">
        {title}
      </h1>
      <p className="max-w-xs text-lg mx-auto tracking-tighter">
        By continuing, you are setting up a {siteConfig.siteName} account and
        agree to our User Agreement and Privacy Policy.
      </p>
      <OAuthSignIn />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="backdrop-blur-sm rounded-md px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center text-sm w-full md:text-md text-center text-zinc-700 dark:text-zinc-300">
        <p className="mr-2">New to {siteConfig.siteName}?</p>
        <Link
          href="/signup"
          className="hover:text-zinc-800 dark:hover:text-zinc-500 underline underline-offset-4"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
