"use client";

import { usePathname } from "next/navigation";

import { SETTINGS_NAV_LINKS } from "@/lib/constant";

import SettingsNavItem from "./settings-nav-item";

interface SettingsMenuProps {
  isLoggedIn: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isLoggedIn }) => {
  const pathname = usePathname();
  return (
    <aside className="border-b-2 border-zinc-800 md:border-r-2">
      <div className="flex flex-row justify-evenly overflow-hidden rounded-none border-b-2 border-zinc-800 last:border-b-0 md:flex-col">
        {SETTINGS_NAV_LINKS.map((data, index) => {
          if (data.href === "/settings" && !isLoggedIn) return null;
          return <SettingsNavItem key={index} pathname={pathname} {...data} />;
        })}
      </div>
    </aside>
  );
};

export default SettingsMenu;
