import { cn } from "@/utils/tailwind";
import React from "react";

type DivProps = React.BaseHTMLAttributes<HTMLDivElement>;

export const Stack = React.forwardRef<HTMLDivElement, DivProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col", className)}>
        {children}
      </div>
    );
  }
);
