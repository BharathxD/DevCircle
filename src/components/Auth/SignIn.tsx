import siteConfig from "@/config";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[400px">
      <div className="flex flex-col space-y-2 text-center">
        <FiGlobe size={35} className="mx-auto" />
        <h1 className="text-4xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="max-w-xs mx-auto">
          By continuing, you are setting up a {siteConfig.siteName} account and
          agree to our User Agreement and Privacy Policy
        </p>
        <UserAuthForm />
        <p className="px-8 text-center text-zinc-700">
          New to {siteConfig.siteName}?{" "}
          <Link
            href="signup"
            className="hover:text-zinc-800 underline underline-offset-4"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
