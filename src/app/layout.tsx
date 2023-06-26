import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import siteConfig from "@/config";
import RtkProvider from "@/providers/RtkProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/providers/Toaster";
import ThemeProvider from "@/providers/ThemeProvider";
import { Metadata } from "next";

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
    "Next.js",
    "Server Actions",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Community for Developers",
    "Community",
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
    images: [`${siteConfig.url}/seo/og-image.jpg`],
    creator: "@BharathxD",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

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
