import Link from "next/link";
import { FiGlobe } from "react-icons/fi";

import siteConfig from "@/config/site";
import AspectRatio from "@/components/ui/aspect-ratio";
import { BlurImage } from "@/components/ui/blur-image";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute inset-0 grid min-h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <BlurImage
          src="/images/auth-bg.jpeg"
          alt="An abstract art"
          className="absolute inset-0 rounded-none bg-zinc-300 object-cover dark:bg-zinc-700"
          priority
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <FiGlobe className="mr-2 size-6" aria-hidden="true" />
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
  );
}
