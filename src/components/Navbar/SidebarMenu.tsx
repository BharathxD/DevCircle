"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import {
  Crown,
  Github,
  Home,
  PlusSquare,
  Search,
  UserCircle2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import useOnClickOutside from "@/hooks/useOnClickOutside";

import Footer from "../Widgets/Footer";

const navLinks = [
  { href: "/search", icon: Search, text: "Search Communities" },
  { href: "/home", icon: Home, text: "Home" },
  { href: "/profile", icon: UserCircle2, text: "Profile" },
  { href: "/leaderboard", icon: Crown, text: "Leaderboards" },
  { href: "/subscribed", icon: Users2, text: "Subscribed Communities" },
  { href: "/d/create", icon: PlusSquare, text: "Create Community" },
];

const SidebarMenu = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const toggleSearch = () => {
    router.push("/search");
    setIsSearching((prev) => !prev);
  };
  useOnClickOutside(searchRef, () => setIsSearching(false));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/search/?query=${e.target.value}`);
    setInput(e.target.value);
  };
  if (!isDesktopScreen) {
    return (
      <nav className="absolute inset-x-2 bottom-2 flex flex-row items-center justify-center overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-50/50 backdrop-blur-md dark:bg-zinc-950/50 md:hidden">
        {navLinks.map(({ href, icon: Icon }) => {
          if (href === "/d/create") return null;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex w-full flex-row items-center justify-center gap-4 border-r-2 border-r-zinc-800 p-4 last:border-r-0 hover:bg-zinc-800 hover:text-zinc-50 dark:hover:bg-zinc-900",
                href === pathname && "bg-zinc-800 text-zinc-50"
              )}
            >
              <Icon />
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex h-full flex-col items-center justify-between gap-2 border-r-2 border-zinc-800 py-4 pr-4 ">
      <div className="flex h-full w-full list-none flex-col rounded-md">
        <div className="overflow-hidden rounded-md border-2 border-zinc-800">
          {navLinks.map(({ href, icon: Icon, text }) => {
            if (href === "/search") {
              if (isSearching) {
                return (
                  <input
                    ref={searchRef}
                    type="text"
                    autoFocus
                    value={input}
                    onFocus={(event) =>
                      event.currentTarget.setSelectionRange(
                        event.currentTarget.value.length,
                        event.currentTarget.value.length
                      )
                    }
                    onChange={handleInputChange}
                    className="flex w-full flex-row items-center gap-4 rounded-none border-b-2 border-b-zinc-800 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50  focus:outline-0 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                  />
                );
              }
              return (
                <div
                  key={href}
                  onClick={toggleSearch}
                  className="flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  <Icon />
                  <p>{text}</p>
                </div>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 last:border-b-0 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-800",
                  href === pathname &&
                    "bg-zinc-900 text-zinc-50 dark:bg-zinc-900 dark:text-zinc-50",
                  href === "/home" &&
                    "bg-zinc-950 text-zinc-50 dark:bg-zinc-950 dark:text-zinc-50"
                )}
              >
                <Icon />
                <p>{text}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <Link
        className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-zinc-800 bg-zinc-50 px-5 py-3 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        href="/"
      >
        Star me on Github <Github className="h-4 w-4" />
      </Link>
      <Footer />
    </nav>
  );
};

export default SidebarMenu;
