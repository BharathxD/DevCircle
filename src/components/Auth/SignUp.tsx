import siteConfig from "@/config";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import OAuthSignIn from "./OAuthSignIn";

const SignUp = () => {
  return (
    <div className="md:container mx-auto w-full flex flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center gap-2">
        <FiGlobe size={35} className="mx-auto" />
        <h1 className="text-4xl font-semibold tracking-tight">Sign Up</h1>
        <p className="max-w-xs mx-auto">
          By continuing, you are setting up a {siteConfig.siteName} account and
          agree to our User Agreement and Privacy Policy
        </p>
        <OAuthSignIn />
        <p className="px-8 text-sm text-center text-zinc-700">
          Already a member of {siteConfig.siteName}?{" "}
          <Link
            href="/signin"
            className="hover:text-zinc-800 underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
