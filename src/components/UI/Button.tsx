import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center gap-2 justify-between active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 disabled:bg-opacity-50 dark:focus:ring-zinc-800 disabled:cursor-not-allowed disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "text-zinc-900 dark:text-zinc-50 hover:bg-zinc-800 hover:text-zinc-100 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700 disabled:bg-zinc-400 disabled:text-zinc-500",
        inverted:
          "text-zinc-100 bg-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700 dark:disabled:text-zinc-600",
        destructive:
          "text-zinc-800 text-zinc-50 hover:text-zinc-50 hover:bg-red-600 dark:hover:bg-red-400 rounded-lg hover:rounded-sm outline outline-2 outline-red-900 hover:dark:outline-red-400",
        outline:
          "bg-zinc-100 text-zinc-900 hover:text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-50 outline outline-2 outline-zinc-800 hover:cursor-pointer disabled:dark:text-zinc-600 disabled:bg-zinc-500",
        skeleton:
          "text-zinc-800 hover:bg-zinc-700 hover:text-zinc-50 dark:text-zinc-50 rounded-lg hover:rounded-sm outline outline-2 outline-zinc-700",
        body: "text-zinc-700 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg hover:rounded-sm",
        subtle: "hover:bg-zinc-200 bg-zinc-100 text-zinc-900",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  asChild?: boolean;
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
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
