import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { buttonVariants } from "../UI/Button";
import siteConfig from "@/config";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border border-zinc-300 z-[10] py-3.5">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <FiGlobe size={25} />
          <p className="hidden text-zinc-700 text-2xl font-bold md:block">
            {siteConfig.siteName}
          </p>
        </Link>
        <div>
          <Link className={buttonVariants()} href="/signin">
            SignIn
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
