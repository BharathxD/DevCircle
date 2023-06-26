"use client";

import { ThemeProvider as TP } from "next-themes";
import type { FC, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <TP attribute="class">{children}</TP>
);

export default ThemeProvider;
