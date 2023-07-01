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
      <FiGlobe size={30} />
      <p
        className={cn(
          "hidden text-3xl font-bold text-zinc-800 dark:text-zinc-50 md:block"
        )}
      >
        DevCircle
      </p>
    </Link>
  );
};

export default Logo;
