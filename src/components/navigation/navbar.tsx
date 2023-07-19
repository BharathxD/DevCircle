import { getAuthSession } from "@/actions/getCurrentUser";

import SignInButton from "../auth/sign-in-button";
import Logo from "../ui/logo";
import ThemeSwitchers from "../ui/theme-switcher";
import SearchBar from "./search";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="border-b-2 border-zinc-800 bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex h-[9vh] min-h-fit max-w-7xl items-center justify-between px-4 md:container">
        <Logo />
        <div className="inline-flex h-full">
          <SearchBar />
          <ThemeSwitchers />
          <SignInButton
            user={session?.user}
            className="h-full rounded-none border-y-0"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
