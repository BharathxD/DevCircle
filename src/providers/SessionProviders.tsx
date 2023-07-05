"use client";

import { SessionProvider } from "next-auth/react";

const Session = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default Session;
