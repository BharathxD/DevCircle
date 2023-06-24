import SignIn from "@/components/Auth/SignIn";
import { buttonVariants } from "@/components/UI/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const SignInPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center p-2">
        <div className="h-max border-2 border-zinc-800 p-3 md:p-5 rounded-md flex flex-col gap-4">
          <div className="w-full p-1 hover:text-zinc-500">
            <Link
              className={cn(
                buttonVariants({ variant: "skeleton" }),
                "self-start -mt-2 -ml-2"
              )}
              href="/"
            >
              <IoIosArrowBack className="mr-2" />
              <p className="dark:text-zinc-300">Home</p>
            </Link>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
