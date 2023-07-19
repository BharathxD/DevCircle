import type { Metadata } from "next";
import { env } from "@/env.mjs";

import SignIn from "@/components/auth/signin";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
};

const SignInPage: React.FC<SignInPageProps> = ({
  searchParams: { callbackUrl },
}) => {
  return (
    <SignIn
      customTitle={!!callbackUrl ? "Login Required" : undefined}
      redirectUrl={callbackUrl}
    />
  );
};

export default SignInPage;
