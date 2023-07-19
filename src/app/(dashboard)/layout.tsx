import { getAuthSession } from "@/actions/getCurrentUser";

import Shell from "@/components/ui/shell";
import SidebarNav from "@/components/navigation/sidebar-nav";

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children }: rootProps) {
  const session = await getAuthSession();
  return (
    <Shell isLoggedIn={!!session?.user}>
      {children}
      <SidebarNav isLoggedIn={!!session?.user} />
    </Shell>
  );
}
