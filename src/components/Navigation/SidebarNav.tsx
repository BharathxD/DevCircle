"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import {
  Crown,
  Home,
  PlusSquare,
  Settings,
  UserCircle2,
  Users2,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import Footer from "../Widgets/Footer";

const navLinks = [
  { href: "/home", icon: Home, text: "Home", requireAuth: false },
  { href: "/profile", icon: UserCircle2, text: "Profile", requireAuth: true },
  {
    href: "/leaderboard",
    icon: Crown,
    text: "Leaderboards",
    requireAuth: true,
  },
  {
    href: "/subscribed",
    icon: Users2,
    text: "Subscribed Communities",
    requireAuth: true,
  },
  {
    href: "/d/create",
    icon: PlusSquare,
    text: "Create Community",
    requireAuth: false,
  },
  {
    href: "/settings",
    icon: Settings,
    text: "Settings",
    requireAuth: false,
  },
];

const SidebarNav = () => {
  const isLoggedIn = useSession().status === "authenticated";
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();

  if (!isDesktopScreen) {
    return (
      <nav
        className="fixed inset-x-0 -bottom-0.5 flex flex-row items-center justify-center overflow-hidden border-t-2 border-t-zinc-800 bg-zinc-50/50 backdrop-blur-md dark:bg-zinc-950/50 md:hidden"
        aria-label="Mobile Navigation"
      >
        {navLinks
          .filter(({ href }) => href !== "/d/create")
          .map(({ href, icon: Icon }) => {
            if (!isLoggedIn) return null;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex w-full flex-row items-center justify-center gap-4 border-r-2 border-r-zinc-800 p-4 last:border-r-0 hover:bg-zinc-800 hover:text-zinc-50 dark:hover:bg-zinc-900",
                  href === pathname &&
                    href !== "/home" &&
                    "bg-zinc-800 text-zinc-50"
                )}
                aria-current={href === pathname ? "page" : undefined}
              >
                <Icon />
              </Link>
            );
          })}
      </nav>
    );
  }

  return (
    <section
      className="flex h-full w-full flex-col items-center justify-between gap-2 border-r-2 border-zinc-800"
      aria-label="Desktop Navigation"
    >
      <aside className="flex h-full w-full list-none flex-col rounded-md">
        <div className="w-full overflow-hidden border-b-2 border-zinc-800">
          {navLinks.map(({ href, icon: Icon, text, requireAuth }) => {
            if ((requireAuth && !isLoggedIn) || href === "/settings")
              return null;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 last:border-b-0 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-800",
                  href === pathname &&
                    href !== "/home" &&
                    "bg-zinc-800 text-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                )}
                aria-current={href === pathname ? "page" : undefined}
              >
                <Icon />
                <p>{text}</p>
              </Link>
            );
          })}
        </div>
      </aside>
      <Footer />
    </section>
  );
};

export default SidebarNav;
