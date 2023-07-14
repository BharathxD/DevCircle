import { FiGlobe } from "react-icons/fi";

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
      <FiGlobe size={40} className="text-zinc-800 dark:text-zinc-300" />
      <p
        className={cn(
          "hidden text-4xl font-bold text-zinc-800 dark:bg-gradient-to-tr dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent md:block"
        )}
      >
        DevCircle
      </p>
    </a>
  );
};

export default Logo;
