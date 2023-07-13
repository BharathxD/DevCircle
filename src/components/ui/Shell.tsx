import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface HomepageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Shell: React.FC<HomepageLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main
      className={cn(
        "container grid h-[91vh] grid-cols-1 gap-y-4 md:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default Shell;
