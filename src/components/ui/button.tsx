import { cn } from "@/utils/tailwind";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "rounded-md flex items-center transition text-sm text-white",
  {
    variants: {
      variant: {
        default:
          "bg-white/5 border border-white/[.08] hover:border-white/10 hover:bg-white/[.08] shadow-lg rounded-md h-8 px-2 flex items-center transition text-sm text-white",
        outline:
          "bg-transparent border border-white/[.08] hover:border-white/10 hover:bg-white/[.08] shadow-lg rounded-md h-8 px-2 flex items-center transition text-sm text-white",
        ghost:
          "bg-transparent hover:border-white/10 hover:bg-white/[.08] rounded-md h-8 px-2 flex items-center transition text-sm text-white",
      },

      size: {
        default: "h-8 px-2",
      },

      squishy: {
        true: "hover:scale-105 transition active:scale-95",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, squishy, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className, squishy }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
