"use client";
import Link from "next/link";
import { SearchButton } from "./search-button";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tailwind";
import { useEffect, useState } from "react";
import { useFilter } from "./filter-provider";

export default function Header({
  children,
  enableFilter = true,
}: {
  children?: React.ReactNode;
  enableFilter?: boolean;
}) {
  const pathname = usePathname();
  const isMovie = pathname.startsWith("/movie");
  const [showFilter, setShowFilter] = useState(false);
  const { filter, setFilter } = useFilter();

  useEffect(() => {
    if (!enableFilter) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        console.log("show filter");
        setShowFilter(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableFilter]);

  return (
    <header
      className={cn(
        "flex w-full grow mx-auto items-center justify-between max-w-5xl h-24",
        isMovie && "h-16 pt-8"
      )}
    >
      {showFilter ? (
        <input
          // biome-ignore lint/a11y/noAutofocus: <explanation>
          autoFocus
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onBlur={() => setShowFilter(false)}
          placeholder="Filter…"
          type="text"
          className="h-full w-full bg-transparent border-none outline-none focus:ring-0"
        />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <Link href="/">
              <h1
                className={`${
                  isMovie ? "text-xl" : "text-2xl"
                } border bg-zinc-50 leading-tight text-zinc-950 font-semibold tracking-tight drop-shadow-md`}
              >
                TSPDT
              </h1>
            </Link>
            <Link href="/me">
              <span className="text-zinc-400">Me</span>
            </Link>
          </div>
          <div className="flex items-center">
            {children}
            <SearchButton mini={!!children || isMovie} />
          </div>
        </>
      )}
    </header>
  );
}
