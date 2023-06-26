import getCurrentUser from "@/actions/getCurrentUser"

import SignInButton from "../UI/AuthButton"
import Logo from "../UI/Logo"
import ThemeSwitchers from "../UI/ThemeSwitchers"

const Navbar = async () => {
  const currentUser = await getCurrentUser()
  return (
    <nav className="border-b-2 border-zinc-800 bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex h-fit max-w-7xl items-center justify-between px-4 md:container">
        <Logo />
        <div className="inline-flex">
          <ThemeSwitchers />
          <SignInButton
            user={currentUser}
            className="rounded-none border-y-0"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
