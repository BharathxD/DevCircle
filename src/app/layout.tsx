import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import siteConfig from "@/config";
import RtkProvider from "@/providers/RtkProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/providers/Toaster";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthModal from "@/components/Modal/AuthModal";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.siteName,
  description: "A community for all the BCA members, just like reddit!",
};

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default async function RootLayout({ children }: rootProps) {
  return (
    <html lang="en" className={cn("antialiased", montserrat.className)}>
      <body className="dark:bg-zinc-950 bg-zinc-50 text-zinc-800 dark:text-zinc-50">
        <ThemeProvider>
          <RtkProvider>
            <Navbar />
            <AuthModal />
            <main className="container h-full">{children}</main>
          </RtkProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
