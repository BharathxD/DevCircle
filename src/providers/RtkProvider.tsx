import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
