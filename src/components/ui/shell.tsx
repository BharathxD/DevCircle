import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface HomepageLayoutProps
  extends HTMLAttributes<HTMLDivElement>,
    React.PropsWithChildren {
  isLoggedIn?: boolean;
}

const Shell: React.FC<HomepageLayoutProps> = ({
  children,
  className,
  isLoggedIn,
  ...props
}) => {
  return (
    <main className={cn("container", className)} {...props}>
      <div
        className={cn(
          "grid h-[91vh] grid-cols-1 gap-y-4 border-x-0 border-zinc-800 md:grid-cols-4 md:border-x-2",
          className,
          !isLoggedIn && "md:grid-cols-3 md:border-r-0"
        )}
      >
        {children}
      </div>
    </main>
  );
};

export default Shell;
