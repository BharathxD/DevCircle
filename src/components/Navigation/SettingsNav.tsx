"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings2, Sparkle, UserCog } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

const SettingsMenu: React.FC = () => {
  const isLoggedIn = useSession().status === "authenticated";
  const navLinks = [
    { icon: UserCog, href: "/settings", text: "Profile" },
    { icon: Sparkle, href: "/settings/appearance", text: "Appearance" },
    { icon: Settings2, href: "/settings/cookies", text: "Cookies" },
  ];
  const pathname = usePathname();
  return (
    <aside className="inset-x-0 bottom-10 h-fit border-zinc-800 md:h-full md:border-b-2 md:border-r-2">
      <div className="flex flex-row justify-evenly overflow-hidden rounded-none border-b-2 border-zinc-800 md:flex-col">
        {navLinks.map((data) => {
          if (data.href === "/settings" && !isLoggedIn) return null;
          return (
            <Link
              href={data.href}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 border-zinc-800 bg-zinc-50 p-2 last:border-b-0 dark:bg-zinc-950/20 md:w-[300px] md:justify-start md:border-b-2",
                pathname === data.href &&
                  pathname !== "/settings" &&
                  "bg-zinc-800 text-zinc-50 dark:bg-zinc-800"
              )}
            >
              <data.icon className="h-6 w-6 md:h-4 md:w-4" />
              <p>{data.text}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsMenu;
