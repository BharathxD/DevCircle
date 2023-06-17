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
}

export default async function RootLayout({ children }: rootProps) {
  const currentUser = await getCurrentUser();
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body className="min-h-screen pt-[5rem] bg-slate-50 antialiased">
        <Navbar currentUser={currentUser} />
        <main className="container max-w-7xl mx-auto h-full pt-2">
          <RtkProvider>{children}</RtkProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
