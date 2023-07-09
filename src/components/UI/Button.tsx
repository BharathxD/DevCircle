import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-zinc-100 text-zinc-900 hover:text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:text-zinc-50 border border-2 border-zinc-800 hover:cursor-pointer disabled:dark:text-zinc-600 disabled:bg-zinc-500",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        skeleton:
          "text-zinc-800 hover:bg-zinc-700 hover:text-zinc-50 dark:text-zinc-50 rounded-lg hover:rounded-sm border border-2 border-zinc-700",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "flex flex-row gap-2",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
