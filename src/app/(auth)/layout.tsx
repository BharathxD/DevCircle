import Image from "next/image";
import Link from "next/link";
import AspectRatio from "@/components/UI/AspectRatio";
import { FiGlobe } from "react-icons/fi";
import siteConfig from "@/config";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="absolute inset-0 w-full grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
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
        <div className="px-5 flex items-center justify-center md:justify-start absolute bottom-5 w-full text-center md:text-left">
          <Link
            href="https://optimizex.vercel.app"
            className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-700 text-sm font-medium hover:dark:text-zinc-200 border-2 border-zinc-600 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 hover:dark:bg-zinc-800 px-4 py-1 md:px-4 md:py-1 rounded-md w-max transition-colors"
            target="_blank"
          >
            Optimized by OptimizeX
          </Link>
        </div>
      </AspectRatio>
      <main className="bg-transparent md:bg-zinc-50 md:dark:bg-zinc-950 w-full absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center justify-center md:static md:top-0 md:col-span-1 md:flex md:translate-y-0">
        {children}
      </main>
    </div>
  );
}
