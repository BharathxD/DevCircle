"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings2, Sparkle, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";

interface SettingsMenuProps {
  isLoggedIn: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isLoggedIn }) => {
  const navLinks = [
    { icon: UserCog, href: "/settings", text: "Profile" },
    { icon: Sparkle, href: "/settings/appearance", text: "Appearance" },
    { icon: Settings2, href: "/settings/cookies", text: "Cookies" },
  ];
  const pathname = usePathname();
  return (
    <aside className="border-b-2 border-zinc-800 md:border-r-2">
      <div className="flex flex-row justify-evenly overflow-hidden rounded-none border-b-2 border-zinc-800 last:border-b-0 md:flex-col">
        {navLinks.map((data, index) => {
          if (data.href === "/settings" && !isLoggedIn) return null;
          return (
            <Link
              href={data.href}
              key={index}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 border-zinc-800 bg-zinc-50 p-2 md:w-[300px] md:justify-start md:border-b-2 dark:bg-zinc-950/20",
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
