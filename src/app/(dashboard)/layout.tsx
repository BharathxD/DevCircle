import { getAuthSession } from "@/actions/getCurrentUser";

import Shell from "@/components/ui/Shell";
import SidebarNav from "@/components/navigation/SidebarNav";

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
