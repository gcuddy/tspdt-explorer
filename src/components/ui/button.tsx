import { cn } from "@/utils/tailwind";
import { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-white/5 border border-white/[.08] hover:border-white/10 hover:bg-white/[.08] shadow-lg rounded-md h-8 px-2 flex items-center transition text-sm text-white",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
