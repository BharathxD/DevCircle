import siteConfig from "@/config";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import OAuthSignIn from "./OAuthSignIn";
import { FC } from "react";

interface SignInProps {
  customTitle?: string;
}

const SignIn: FC<SignInProps> = ({ customTitle }) => {
  return (
    <div className="md:container mx-auto w-full flex flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center gap-2">
        <FiGlobe size={35} className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {customTitle ?? "Welcome back!"}
        </h1>
        <p className="max-w-xs text-lg mx-auto tracking-tighter">
          By continuing, you are setting up a {siteConfig.siteName} account and
          agree to our User Agreement and Privacy Policy
        </p>
        <OAuthSignIn />
        <p className="px-8 text-sm md:text-md text-center text-zinc-700 dark:text-zinc-300">
          New to {siteConfig.siteName}?{" "}
          <Link
            href="/signup"
            className="hover:text-zinc-800 dark:hover:text-zinc-500 underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
