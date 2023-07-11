import SidebarNav from "@/components/Navigation/SidebarNav";
import Shell from "@/components/UI/Shell";

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children }: rootProps) {
  return (
    <Shell>
      {children}
      <SidebarNav />
    </Shell>
  );
}
