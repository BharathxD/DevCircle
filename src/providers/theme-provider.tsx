"use client";

import type { FC, ReactNode } from "react";
import { ThemeProvider as TP } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <TP attribute="class">{children}</TP>
);

export default ThemeProvider;
