import Link from "next/link";
import { FiGlobe } from "react-icons/fi";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: React.HTMLAttributes<HTMLDivElement["className"]>;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 hover:cursor-pointer", className)}
    >
      <FiGlobe size={40} className="text-zinc-800 dark:text-zinc-300" />
      <p
        className={cn(
          "hidden text-4xl font-bold text-zinc-800 dark:bg-gradient-to-tr dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent md:block"
        )}
      >
        DevCircle
      </p>
    </Link>
  );
};

export default Logo;
