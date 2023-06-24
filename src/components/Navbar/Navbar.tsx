import Logo from "../UI/Logo";
import SignInButton from "../UI/AuthButton";
import ThemeSwitchers from "../UI/ThemeSwitchers";
import getCurrentUser from "@/actions/getCurrentUser";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <nav className="text-zinc-800 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-950 border-b-2 border-zinc-800">
      <div className="flex items-center justify-between h-fit max-w-7xl px-4 md:container">
        <Logo />
        <div className="inline-flex">
          <ThemeSwitchers />
          <SignInButton
            user={currentUser}
            className="border-y-0 rounded-none"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
