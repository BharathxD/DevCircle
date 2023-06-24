import React from "react";
import { buttonVariants } from "@/components/UI/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface AuthPageProps {
  children: React.ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 h-max border-2 border-zinc-800 p-5 rounded-md flex flex-col gap-4 transition-colors duration-300">
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
      {children}
    </div>
  );
};

export default AuthPage;
