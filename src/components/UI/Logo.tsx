import { FiGlobe } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: React.HTMLAttributes<HTMLDivElement["className"]>;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center hover:cursor-pointer gap-2", className)}
    >
      <FiGlobe size={30} />
      <p
        className={cn(
          "hidden text-zinc-800 dark:text-zinc-50 text-3xl font-bold md:block"
        )}
      >
        DevCircle
      </p>
    </Link>
  );
};

export default Logo;
