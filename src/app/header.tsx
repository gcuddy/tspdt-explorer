"use client";
import Link from "next/link";
import { SearchButton } from "./search-button";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tailwind";

export default function Header({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const isMovie = pathname.startsWith("/movie");
  return (
    <header
      className={cn(
        "flex w-full grow mx-auto items-center justify-between max-w-5xl h-24",
        isMovie && "h-16 pt-8"
      )}
    >
      <Link href="/">
        <h1
          className={`${
            isMovie ? "text-xl" : "text-2xl"
          } border bg-zinc-50 leading-tight text-zinc-950 font-semibold tracking-tight drop-shadow-md`}
        >
          TSPDT
        </h1>
      </Link>
      <div className="flex items-center">
        {children}
        <SearchButton mini={!!children || isMovie} />
      </div>
    </header>
  );
}
