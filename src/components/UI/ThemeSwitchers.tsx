"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

const ThemeSwitcher: FC = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentMode, setCurrentMode] = useState<"dark" | "light">("light");
  const { theme, setTheme } = useTheme();

  const toggleMode = useCallback(() => {
    const updatedTheme = theme === "dark" ? "light" : "dark";
    setCurrentMode(updatedTheme);
    setTheme(updatedTheme);
  }, [setTheme, theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="px-5 py-5 border-l-2 border-zinc-800 hover:bg-pink-300 dark:hover:bg-zinc-800 flex justify-center items-center hover:cursor-pointer"
      onClick={toggleMode}
    >
      {theme === "dark" ? <MdLightMode size={25} className="text-yellow-500" /> : <MdDarkMode size={25} />}
    </div>
  );
};

export default ThemeSwitcher;
