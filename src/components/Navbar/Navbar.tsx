import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { buttonVariants } from "../UI/Button";
import siteConfig from "@/config";
import UserAccountNav from "./UserAccountNav";
import { User } from "@prisma/client";

const Navbar = ({ currentUser }: { currentUser: User | null }) => {
  return (
    <nav className="fixed top-0 inset-x-0 border border-zinc-700 z-[10] border-x-0">
      <div className="pl-8 md:container max-w-7xl h-fit mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <FiGlobe size={25} />
          <p className="hidden text-zinc-700 text-2xl font-bold md:block">
            {siteConfig.siteName}
          </p>
        </Link>
        <div>
          {currentUser ? (
            <UserAccountNav user={currentUser} />
          ) : (
            <div>
              <Link
                className="flex items-center justify-center hover:bg-zinc-800 hover:text-zinc-100 transition-colors border border-y-0 border-r-0 md:border-r-[1px] md:border-zinc-700 border-zinc-700 h-full px-5 py-[1.125rem]"
                href="/signin"
              >
                SignIn
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
