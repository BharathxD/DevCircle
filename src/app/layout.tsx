import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import siteConfig from "@/config";
import RtkProvider from "@/providers/RtkProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/providers/Toaster";
import ThemeProvider from "@/providers/ThemeProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.name,
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
        <RtkProvider>
          <ThemeProvider>
            <Navbar />
            <main className="container h-full">{children}</main>
            <Toaster />
          </ThemeProvider>
        </RtkProvider>
      </body>
    </html>
  );
}
