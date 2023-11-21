import type { PropsWithChildren } from "react";
import { getAuthSession } from "@/actions/getCurrentUser";

import Shell from "@/components/ui/shell";
import SidebarNav from "@/components/navigation/sidebar-nav";

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getAuthSession();
  return (
    <Shell isLoggedIn={!!session?.user}>
      {children}
      <SidebarNav isLoggedIn={!!session?.user} />
    </Shell>
  );
};

export default RootLayout;
