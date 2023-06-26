import Image from "next/image"
import Link from "next/link"
import siteConfig from "@/config"
import { FiGlobe } from "react-icons/fi"

import AspectRatio from "@/components/UI/AspectRatio"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="absolute inset-0 grid min-h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-bg.jpeg"
          alt="An abstract art"
          className="absolute inset-0 object-cover"
          priority
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <FiGlobe className="mr-2 h-6 w-6" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="absolute bottom-5 flex w-full items-center justify-center px-5 text-center md:justify-start md:text-left">
          <Link
            href="https://optimizex.vercel.app"
            className="w-max rounded-md border-2 border-zinc-600 bg-zinc-50 px-4 py-1 text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 hover:dark:bg-zinc-800 hover:dark:text-zinc-200 md:px-4 md:py-1"
            target="_blank"
          >
            Optimized by OptimizeX
          </Link>
        </div>
      </AspectRatio>
      <main className="absolute top-1/2 col-span-1 flex w-full -translate-y-1/2 items-center justify-center bg-transparent md:static md:top-0 md:col-span-1 md:flex md:translate-y-0 md:bg-zinc-50 md:dark:bg-zinc-950">
        {children}
      </main>
    </div>
  )
}
