import type { Metadata } from "next";
import "./globals.css";
import { CommandBar } from "@/components/command";
import { GlobalCommands } from "./global-commands";
import { BodyProvider } from "./body-provider";
import { FilterProvider } from "./filter-provider";
import Providers from "./providers";

// export const runtime = "edge";

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

    return (
        <html lang="en">
            {/* <UserProvider session={session}> */}
            {/* <R> */}
            <Providers>
                <CommandBar>
                    <BodyProvider>
                        {/* <ActionProvider> */}
                        <FilterProvider>
                            <GlobalCommands>{children}</GlobalCommands>
                        </FilterProvider>
                        {/* </ActionProvider> */}
                    </BodyProvider>
                </CommandBar>
            </Providers>
            {/* </R> */}
            {/* </UserProvider> */}
        </html>
    );
}
