"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export function BodyProvider({ children }: { children: React.ReactNode }) {
  // seems kind of hacky...
  const pathname = usePathname();
  return (
    <body
      className={`${inter.className} ${
        pathname.startsWith("/movie/") ? "bg-zinc-925" : "bg-zinc-900"
      } text-zinc-50`}
    >
      {children}
    </body>
  );
}
