"use client";
import Link from "next/link";
import { SearchButton } from "./search-button";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tailwind";
import { useEffect, useState } from "react";
import { useFilter } from "./filter-provider";
import { FilmStrip } from "@phosphor-icons/react";
import { useUser } from "./user-session";

export default function Header({
    children,
    enableFilter = true,
    sticky = true,
}: {
    children?: React.ReactNode;
    enableFilter?: boolean;
    sticky?: boolean;
}) {
    const [showFilter, setShowFilter] = useState(false);
    const { filter, setFilter } = useFilter();
    const user = useUser();

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
                "flex bg-inherit z-50 w-full grow mx-auto items-center justify-center h-24",
                sticky && "sticky top-0",
            )}
        >
            <div className="flex items-center justify-between max-w-5xl grow">
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
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-white/90 text-black px-1"
                            >
                                <FilmStrip className="w-5 h-5" />
                                <span className="font-bold leading-tight tracking-tight drop-shadow-md">
                                    TSPDT
                                </span>
                            </Link>
                            {user ? (
                                <Link href="/me">Me</Link>
                            ) : (
                                <Link href="/login">Login</Link>
                            )}
                        </div>
                        <div className="flex items-center">
                            {children}
                            <SearchButton />
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
