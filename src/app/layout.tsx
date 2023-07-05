import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import siteConfig from "@/config";
import { SessionProvider } from "next-auth/react";

import RtkProvider from "@/providers/RtkProvider";
import Session from "@/providers/SessionProviders";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "@/providers/Toaster";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navigation/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Developer Circle",
    "Community for Developers",
    "Community",
    "Next.js",
    "Server Actions",
    "React",
    "Tailwind CSS",
    "Server Components",
  ],
  authors: [
    {
      name: "BharathxD",
      url: "https://github.com/BharathxD",
    },
  ],
  creator: "BharathxD",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.webp`],
    creator: "@Bharath_uwu",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: rootProps) {
  return (
    <html lang="en" className={cn("antialiased", montserrat.className)}>
      <RtkProvider>
        <Session>
          <body className="no-scrollbar bg-zinc-50 text-zinc-800 transition will-change-auto duration-200 ease-in-out dark:bg-zinc-950/20 dark:text-zinc-50">
            <ThemeProvider>
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </Session>
      </RtkProvider>
    </html>
  );
}
