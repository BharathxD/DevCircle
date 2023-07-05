import SidebarMenu from "@/components/Navigation/SidebarMenu";
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
