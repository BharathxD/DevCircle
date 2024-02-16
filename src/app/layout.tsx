import "./globals.css";

import type { PropsWithChildren, ReactNode } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import { env } from "@/env.mjs";

import RtkProvider from "@/providers/rtk-provider";
import Session from "@/providers/session-provider";
import ThemeProvider from "@/providers/theme-provider";
import { Toaster } from "@/providers/toaster";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import CookieBanner from "@/components/analytics/cookie-behavior";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import Navbar from "@/components/navigation/navbar";

/**
 * Font options for the Montserrat font from Google Fonts.
 * @type {NextFont}
 */
const montserrat = Montserrat({ subsets: ["latin"] });

interface Props {
  userModal: ReactNode;
}

/**
 * Metadata object for the Next.js page.
 * @type {Metadata}
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function}
 */
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  // Icon URLs for various platforms
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  description: siteConfig.description,
  // Keywords relevant to the website's content
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Authors and creator information
  authors: [
    {
      name: "BharathxD",
      url: "https://github.com/BharathxD",
    },
  ],
  creator: "BharathxD",
  // OpenGraph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // Twitter card metadata for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: "@Bharath_uwu",
  },
};

const TopLoader = dynamic(() => import("@/components/ui/top-loader"));

/**
 * The root layout component that wraps the entire application.
 * @param {Props} - The props containing the main content and user modal component.
 * @returns {ReactNode} - The rendered HTML with global styles and common components.
 */
const RootLayout = ({
  children,
  userModal,
}: PropsWithChildren & Props): ReactNode => {
  return (
    <html lang="en" className={cn("antialiased", montserrat.className)}>
      <GoogleAnalytics
        GA_MEASUREMENT_ID={env.GOOGLE_ANALYTICS_MEASUREMENT_ID}
      />
      <body className="no-scrollbar bg-zinc-50 text-zinc-800 transition duration-200 ease-in-out will-change-auto dark:bg-zinc-950 dark:bg-gradient-to-t dark:from-zinc-950 dark:to-[#111] dark:text-zinc-50">
        <Session>
          <RtkProvider>
            <ThemeProvider>
              <TopLoader />
              <CookieBanner />
              <Navbar />
              {userModal}
              {children}
              <Toaster />
            </ThemeProvider>
          </RtkProvider>
        </Session>
      </body>
    </html>
  );
};

export default RootLayout;
