"use client";

import { createContext, useContext, useState } from "react";

export const ActionsContext = createContext<{
  slot: React.ReactNode;
  setSlot: (slot: React.ReactNode) => void;
} | null>(null);

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = useState<React.ReactNode>(null);
  return (
    <ActionsContext.Provider value={{ slot, setSlot }}>
      {children}
    </ActionsContext.Provider>
  );
}

export function useActions() {
  const ctx = useContext(ActionsContext);
  if (!ctx) {
    throw new Error("No actions context");
  }
  return ctx;
}
