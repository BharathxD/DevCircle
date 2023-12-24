import Image from "next/image";

import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: React.HTMLAttributes<HTMLDivElement["className"]>;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <a
      href="/"
      className={cn("flex items-center gap-2 hover:cursor-pointer", className)}
      aria-label={`${siteConfig.name} logotype`}
    >
      <Image
        src={"/logo.svg"}
        alt="Logo Image"
        height={40}
        width={40}
        className="rounded-full bg-zinc-700 p-0.5 dark:bg-transparent"
      />
      <p
        className={cn(
          "hidden text-4xl font-bold text-zinc-800 md:block dark:bg-gradient-to-tr dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent"
        )}
      >
        DevCircle
      </p>
    </a>
  );
};

export default Logo;
