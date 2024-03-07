import type { Metadata } from "next";
import "./globals.css";
import { CommandBar } from "@/components/command";
import { BodyProvider } from "./body-provider";
import { FilterProvider } from "./filter-provider";
import Providers from "./providers";
import { getPageSession } from "@/server/auth";
import { UserProvider } from "./user-session";

export const runtime = "edge";

export const metadata: Metadata = {
    title: "TSPDT Explorer",
    description: "is this enough movies for you?",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
    actions: React.ReactNode;
}) {
    //   const session = await getPageSession();
    const seshData = await getPageSession();
    console.log({ seshData });
    const { session, user } = seshData;

    return (
        <html lang="en">
            <UserProvider session={session ? {
                ...session,
                expiresAt: new Date(session.expiresAt),
            } : null} user={user}>
                <Providers>
                    {/* <R> */}
                    <CommandBar>
                        <BodyProvider>
                            {/* <ActionProvider> */}
                            <FilterProvider>
                                {children}
                            </FilterProvider>
                            {/* </ActionProvider> */}
                        </BodyProvider>
                    </CommandBar>
                    {/* </R> */}
                </Providers>
            </UserProvider>
        </html>
    );
}
