"use client";

import { SessionProvider } from "next-auth/react";

const Session = ({ children }: React.PropsWithChildren) => (
  <SessionProvider>{children}</SessionProvider>
);

export default Session;
