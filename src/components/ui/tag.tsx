import { cn } from "@/utils/tailwind";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 grow-0 basis-auto tracking-widest text-center justify-center text-xs h-[26px] items-center uppercase rounded-lg leading-4 bg-zinc-600 px-1",
        className
      )}
    >
      {children}
    </div>
  );
}
