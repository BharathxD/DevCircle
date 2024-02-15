"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";

import Footer from "../widgets/footer";

const SidebarNav: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();

  const mobileNavLinks = useMemo(
    () =>
      NAV_LINKS.map(({ href, icon: Icon }) => {
        if (!isLoggedIn || href === "/settings" || href === "/d/new")
          return null;
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
      }),
    [isLoggedIn, pathname]
  );

  const desktopNavLinks = useMemo(
    () =>
      NAV_LINKS.map(({ href, icon: Icon, text, requireAuth }) => {
        if ((requireAuth && !isLoggedIn) || href === "/settings") return null;
        const className = cn(
          "flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 backdrop-blur-sm last:border-b-0 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950/50 dark:hover:bg-zinc-800",
          href === pathname &&
            href !== "/home" &&
            "bg-zinc-800 text-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
        );
        if (href === "/home") {
          return (
            <a
              href={href}
              key={href}
              className={className}
              aria-current={href === pathname ? "page" : undefined}
            >
              <Icon />
              <p>{text}</p>
            </a>
          );
        }
        return (
          <Link
            href={href}
            key={href}
            className={className}
            aria-current={href === pathname ? "page" : undefined}
          >
            <Icon />
            <p>{text}</p>
          </Link>
        );
      }),
    [isLoggedIn, pathname]
  );

  if (!isDesktopScreen)
    return (
      <nav
        className="fixed inset-x-0 -bottom-0.5 flex flex-row items-center justify-center overflow-hidden border-t-2 border-t-zinc-800 bg-zinc-50/50 backdrop-blur-md dark:bg-zinc-950/50 md:hidden"
        aria-label="Mobile Navigation"
      >
        {mobileNavLinks}
      </nav>
    );

  if (!isLoggedIn) return null;

  return (
    <nav
      className="flex size-full flex-col items-center justify-between gap-2 bg-zinc-50 backdrop-blur-sm dark:bg-zinc-950/50"
      aria-label="Desktop Navigation"
    >
      <section className="flex size-full list-none flex-col rounded-md">
        <div className="w-full overflow-hidden border-b-2 border-zinc-800">
          {desktopNavLinks}
        </div>
      </section>
      <Footer />
    </nav>
  );
};

export default SidebarNav;
