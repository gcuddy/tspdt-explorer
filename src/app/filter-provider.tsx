"use client";
import { createContext, useContext, useState } from "react";

export const FilterContext = createContext<{
  filter: string;
  setFilter: (filter: string) => void;
} | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
