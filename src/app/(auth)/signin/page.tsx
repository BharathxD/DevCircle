import SignIn from "@/components/Auth/SignIn";
import { buttonVariants } from "@/components/UI/Button";
import mergeClasses from "@/libs/mergeClasses";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          className={mergeClasses(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
          href="/"
        >
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
