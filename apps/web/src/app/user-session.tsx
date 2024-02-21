"use client";

import { Session } from "lucia";
import React from "react";

export const UserContext = React.createContext<Session | null>(null);

export function UserProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <UserContext.Provider value={session}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const user = React.useContext(UserContext);
  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}
