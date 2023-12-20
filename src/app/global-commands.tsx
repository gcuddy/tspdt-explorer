"use client";
import { NavigationAction, useCommandBar } from "@/components/command";

export function GlobalCommands({ children }: { children: React.ReactNode }) {
  //   const bar = useCommandBar();

  //   bar.register("global", async () => {
  //     return [
  //       NavigationAction({
  //         title: "Home",
  //         category: "Navigation",
  //         path: "/",
  //       }),
  //     ];
  //   });

  return <>{children}</>;
}
