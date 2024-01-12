"use client";
import { useFilter } from "@/app/filter-provider";
import { useUser } from "@/app/user-session";
import { cn } from "@/utils/tailwind";
import { FilmStrip } from "@phosphor-icons/react";
import {
  AnimatePresence,
  AnimationProps,
  LayoutGroup,
  motion,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const SPRING = {
  type: "spring",
  //   duration: 0.2,
  stiffness: 200,

  damping: 25,
} satisfies AnimationProps["transition"];
export function MagicHeader() {
  const user = useUser();
  const [isFocused, setIsFocused] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const { filter, setFilter } = useFilter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if (!enableFilter) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.header
      layout
      className={cn(
        "flex w-full grow mx-auto items-center justify-between max-w-5xl h-24 relative"
        // isFocused && "jus    tify-stretch"
      )}
    >
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {!isFocused && (
            <motion.div
              className="flex gap-4 items-center"
              transition={SPRING}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <LayoutGroup>
        <motion.input
          ref={inputRef}
          transition={SPRING}
          layout
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.currentTarget.blur();
            }
          }}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search…"
          // layout="size"
          whileFocus={{
            //   width: "100%",
            height: "48px",
            // borderRadius: "0px",
            borderRadius: "0px",
            // width: "100%",
            backgroundColor: "transparent",
            // position: "absolute",
            flexGrow: 1,
            //   scale: 1.1,
          }}
          //   initial={{
          //     borderRadius: "4px",
          //   }}
          // layout
          // transition={{
          //   type: "tween",
          //   duration: 0.2,
          //   //   damping: 10,
          //   //   stiffness: 200,
          // }}
          //   initial={false}
          //   transition={{
          //     // duration: 0.2,
          //     // delay: 0.1,
          //   }}
          style={{
            borderRadius: "12px",
            height: "36px",
            // width: "240px",
            backgroundColor: `rgb(39 39 42 / var(--tw-bg-opacity))`,
            paddingLeft: "16px",
          }}
          // style={{
          //   width: isFocused ? "100%" : "auto",
          // }}
          className={cn(
            " bg-zinc-800 flex text-sm text-zinc-400 border border-white/5 focus:ring-0 focus-visible:outline-none"
          )}
        />
      </LayoutGroup>
    </motion.header>
  );
}
