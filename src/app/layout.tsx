import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import siteConfig from "@/config";
import RtkProvider from "@/providers/RtkProvider";
import cn from "@/libs/classNames";
import { Toaster } from "@/providers/Toaster";
import getCurrentUser from "@/actions/getCurrentUser";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.siteName,
  description: "A community for all the BCA members, just like reddit!",
};

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children, authModal }: rootProps) {
  const currentUser = await getCurrentUser();
  return (
    <html
      lang="en"
      className={cn(
        "bg-zinc-50 text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body className="min-h-screen pt-[5rem] bg-slate-50 antialiased">
        <RtkProvider>
          <Navbar currentUser={currentUser} />
          {authModal}
          <main className="container h-full pt-2">{children}</main>
        </RtkProvider>
        <Toaster />
      </body>
    </html>
  );
}
