"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings2, Sparkle, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";

const navLinks = [
  { icon: UserCog, href: "/settings", text: "Profile" },
  { icon: Sparkle, href: "/settings/appearance", text: "Appearance" },
  { icon: Settings2, href: "/settings/cookies", text: "Cookies" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <section className="container flex h-[91vh] overflow-hidden">
      <div className="w-full flex-col gap-4 border-x-2 border-zinc-800">
        <div className="border-b-2 border-zinc-800 px-4 py-2">
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and other preferences.
          </p>
        </div>
        <div className="flex h-full flex-col md:flex-row">
          <aside className="h-fit border-b-2 border-zinc-800 p-2 md:h-full md:border-r-2">
            <div className="flex flex-col rounded-md border-2 border-zinc-800">
              {navLinks.map((data) => {
                return (
                  <Link
                    href={data.href}
                    className={cn(
                      "inline-flex w-full items-center gap-2 border-b-2 border-zinc-800 bg-zinc-50 p-2 last:border-b-0 dark:bg-zinc-950/20 md:w-[300px]",
                      pathname === data.href &&
                        pathname !== "/settings" &&
                        "bg-zinc-800 text-zinc-50 dark:bg-zinc-800"
                    )}
                  >
                    <data.icon className="h-4 w-4" />
                    {data.text}
                  </Link>
                );
              })}
            </div>
          </aside>
          <div className="w-full overflow-hidden overflow-y-scroll p-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
