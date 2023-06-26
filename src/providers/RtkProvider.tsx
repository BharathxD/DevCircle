"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import type { ReactNode } from "react";

interface RtkProviderProps {
  children: ReactNode;
}

const RtkProvider = ({ children }: RtkProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default RtkProvider;
