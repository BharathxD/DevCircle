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
  const renderCustomTitle = customTitle ?? "Welcome back!";
  return (
    <div className="mx-auto w-full flex flex-col justify-center space-y-6 md:px-8 text-center">
      <FiGlobe size={40} className="mx-auto" />
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
        {renderCustomTitle}
      </h1>
      <p className="max-w-xs text-lg mx-auto tracking-tighter">
        By continuing, you are setting up a {siteConfig.siteName} account and
        agree to our User Agreement and Privacy Policy.
      </p>
      <OAuthSignIn />
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
