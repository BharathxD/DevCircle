import React from "react";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import UserAccountNav from "./UserAccountNav";
import { User } from "@prisma/client";
import cn from "@/libs/classNames";
import ThemeSwitchers from "../UI/ThemeSwitchers";

const Navbar = ({ currentUser }: { currentUser: User | null }) => {
  const renderUserAccountNav = <UserAccountNav user={currentUser!} />;

  const renderSignInLink = (
    <>
      <Link
        href="/signin"
        className="flex items-center justify-center font-medium hover:bg-yellow-300 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-50 transition-colors border-2 border-y-0 md:border-zinc-800 border-zinc-800 h-full px-5 py-[1.5rem]"
      >
        SignIn
      </Link>
    </>
  );

  return (
    <nav className="inset-x-0 border-b-2 text-zinc-800 dark:text-zinc-50 dark:bg-zinc-950 bg-zinc-50  border-zinc-800 z-[10]">
      <div className="px-4 md:container max-w-7xl h-fit mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <FiGlobe size={30} />
          <p
            className={cn(
              "hidden text-zinc-800 dark:text-zinc-50 text-3xl font-bold md:block"
            )}
          >
            DevCircle
          </p>
        </Link>
        <div className="flex justify-end flex-row min-w-[200px]">
          <ThemeSwitchers />
          {currentUser ? renderUserAccountNav : renderSignInLink}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
