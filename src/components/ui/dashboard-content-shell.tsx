import { cn } from "@/lib/utils";

interface DashboardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DashboardContentShell = ({
  children,
  className,
  ...props
}: DashboardContentProps) => {
  return (
    <section
      className={cn(
        "no-scrollbar relative w-full overflow-hidden overflow-y-scroll pb-[4.5rem] pt-4 md:col-span-3 md:border-r-2 md:border-zinc-800 md:px-4 md:pb-4",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default DashboardContentShell;
