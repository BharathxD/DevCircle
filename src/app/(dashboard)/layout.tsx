import SidebarMenu from "@/components/Navbar/SidebarMenu";
import Shell from "@/components/UI/Shell";

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default function RootLayout({ children }: rootProps) {
  return (
    <Shell>
      {children}
      <SidebarMenu />
    </Shell>
  );
}
