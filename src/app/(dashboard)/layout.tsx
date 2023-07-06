import HomepageMenu from "@/components/Navigation/HomepageMenu";
import Shell from "@/components/UI/Shell";

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children }: rootProps) {
  return (
    <Shell>
      {children}
      <HomepageMenu />
    </Shell>
  );
}
