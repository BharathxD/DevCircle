import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { buttonVariants } from "../UI/Button";
import siteConfig from "@/config";
import UserAccountNav from "./UserAccountNav";
import { User } from "@prisma/client";

const Navbar = ({ currentUser }: { currentUser: User | null }) => {
  return (
    <nav className="fixed top-0 inset-x-0 bg-zinc-100 border border-zinc-300 z-[10] py-3.5">
      <div className="container max-w-7xl h-fit mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <FiGlobe size={25} />
          <p className="hidden text-zinc-700 text-2xl font-bold md:block">
            {siteConfig.siteName}
          </p>
        </Link>
        {currentUser ? (
          <UserAccountNav user={currentUser} />
        ) : (
          <Link className={buttonVariants({ className: "m-0" })} href="/signin">
            SignIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
