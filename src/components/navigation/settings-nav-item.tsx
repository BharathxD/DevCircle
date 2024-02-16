import { memo } from "react";
import Link from "next/link";

import type { SETTINGS_NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";

const SettingsNavItem = ({
  icon: Icon,
  href,
  text,
  pathname,
}: (typeof SETTINGS_NAV_LINKS)[number] & { pathname: string }) => (
  <Link
    href={href}
    className={cn(
      "inline-flex w-full items-center justify-center gap-2 border-zinc-800 bg-zinc-50 p-2 dark:bg-zinc-950/20 md:w-[300px] md:justify-start md:border-b-2",
      pathname === href &&
        pathname !== "/settings" &&
        "bg-zinc-800 text-zinc-50 dark:bg-zinc-800"
    )}
  >
    <Icon className="size-6 md:size-4" />
    <p>{text}</p>
  </Link>
);

SettingsNavItem.displayName = "SettingsNavItem";

export default memo(SettingsNavItem);
