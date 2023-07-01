import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface HomepageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        "grid h-[91vh] grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-x-4 ",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default HomepageLayout;
