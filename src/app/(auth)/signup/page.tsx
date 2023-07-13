import type { Metadata } from "next";
import { env } from "@/env.mjs";

import SignUp from "@/components/auth/SignUp";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
};

const SignUpPage = () => <SignUp />;

export default SignUpPage;
