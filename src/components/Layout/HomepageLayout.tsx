import cn from "@/libs/classNames";
import { HTMLAttributes } from "react";

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
        "grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-4",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default HomepageLayout;
