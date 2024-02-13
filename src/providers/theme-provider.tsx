"use client";

import type { FC } from "react";
import { ThemeProvider as TP } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

const ThemeProvider: FC<React.PropsWithChildren & ThemeProviderProps> = ({
  children,
  ...rest
}) => (
  <TP attribute="class" disableTransitionOnChange {...rest}>
    {children}
  </TP>
);

export default ThemeProvider;
