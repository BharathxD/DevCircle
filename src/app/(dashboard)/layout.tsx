import Shell from "@/components/ui/Shell";
import SidebarNav from "@/components/navigation/SidebarNav";

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
