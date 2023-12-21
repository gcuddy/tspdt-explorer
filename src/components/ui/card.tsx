import { cn } from "@/utils/tailwind";

export function Card({
  children,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  as: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-zinc-925 shadow-lg  flex flex-col relative  p-2 justify-between items-center ",
        className
      )}
    >
      {children}
    </div>
  );
}
