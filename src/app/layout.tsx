import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { env } from "@/env.mjs";

import RtkProvider from "@/providers/RtkProvider";
import Session from "@/providers/SessionProviders";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "@/providers/Toaster";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import CookieBanner from "@/components/analytics/CookiesBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Navbar from "@/components/navigation/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

interface rootProps {
  children: React.ReactNode;
  userModal: React.ReactNode;
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
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: "@Bharath_uwu",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children, userModal }: rootProps) {
  return (
    <html lang="en" className={cn("antialiased", montserrat.className)}>
      <GoogleAnalytics
        GA_MEASUREMENT_ID={env.GOOGLE_ANALYTICS_MEASUREMENT_ID}
      />
      <body className="no-scrollbar bg-zinc-50 text-zinc-800 transition will-change-auto duration-200 ease-in-out dark:bg-zinc-950 dark:bg-gradient-to-t dark:from-zinc-950 dark:to-[#111] dark:text-zinc-50">
        <Session>
          <RtkProvider>
            <ThemeProvider>
              <Navbar />
              {userModal}
              {children}
              <Toaster />
              <CookieBanner />
            </ThemeProvider>
          </RtkProvider>
        </Session>
      </body>
    </html>
  );
}
