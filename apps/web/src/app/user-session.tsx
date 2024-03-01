"use client";

import { Session, User } from "lucia";
import React from "react";

export const UserContext = React.createContext<{ session: Session | null; user: User | null } | null>(null);

export function UserProvider({
    children,
    session,
    user
}: {
    children: React.ReactNode;
    session: Session | null;
    user: User | null;
}) {
    return (
        <UserContext.Provider value={{ session, user }}>{children}</UserContext.Provider>
    );
}

export function useUser() {
    const user = React.useContext(UserContext);
    return user;
}
