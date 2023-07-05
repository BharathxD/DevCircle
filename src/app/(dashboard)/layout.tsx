import getCurrentUser from "@/actions/getCurrentUser";

import SidebarMenu from "@/components/Navigation/SidebarMenu";
import Shell from "@/components/UI/Shell";

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children }: rootProps) {
  const session = await getCurrentUser();
  return (
    <Shell>
      {children}
      <SidebarMenu isLoggedIn={!!session} />
    </Shell>
  );
}
