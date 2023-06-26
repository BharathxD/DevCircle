import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 disabled:bg-opacity-50 dark:focus:ring-zinc-800 disabled:cursor-not-allowed disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "text-zinc-900 dark:text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700",
        inverted:
          "text-zinc-100 bg-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700 dark:disabled:text-zinc-600",
        destructive:
          "text-zinc-800 dark:bg-red-300 hover:text-zinc-50 hover:bg-red-500 dark:hover:bg-red-500 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700",
        outline:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-2 outline-zinc-300",
        skeleton:
          "text-zinc-700 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700",
        body: "text-zinc-700 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg hover:rounded-sm",
        subtle: "hover:bg-zinc-200 bg-zinc-100 text-zinc-900",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
