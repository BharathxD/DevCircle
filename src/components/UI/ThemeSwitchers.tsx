"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MdDarkMode, MdLightMode } from "react-icons/md"

const ThemeSwitcher: FC = ({}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMode = useCallback(() => {
    const updatedTheme = theme === "dark" ? "light" : "dark"
    setTheme(updatedTheme)
  }, [setTheme, theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <button
      className="flex items-center justify-center border-l-2 border-zinc-800 px-5 py-5 hover:cursor-pointer hover:bg-pink-300 dark:hover:bg-zinc-800"
      onClick={toggleMode}
    >
      {theme === "dark" ? (
        <MdLightMode size={25} className="text-yellow-500" />
      ) : (
        <MdDarkMode size={25} />
      )}
    </button>
  )
}

export default ThemeSwitcher
