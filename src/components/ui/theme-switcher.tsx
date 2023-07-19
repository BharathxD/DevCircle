"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwitcher: React.FC = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    const updatedTheme = theme === "dark" ? "light" : "dark";
    setTheme(updatedTheme);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center border-l-2 border-zinc-800 px-5 hover:cursor-pointer hover:bg-pink-300 dark:hover:bg-zinc-800">
        <Loader2
          size={25}
          className="animate-spin text-zinc-800 dark:text-zinc-50"
        />
      </div>
    );
  }

  return (
    <button
      className="flex items-center justify-center border-l-2 border-zinc-800 px-5 hover:cursor-pointer hover:bg-pink-300 dark:hover:bg-zinc-800"
      onClick={toggleMode}
      aria-label={theme === "dark" ? "Dark" : "Light"}
    >
      {theme === "dark" ? (
        <MdLightMode size={25} className="text-yellow-500" />
      ) : (
        <MdDarkMode size={25} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
