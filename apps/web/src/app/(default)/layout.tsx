import Head from "next/head";
import Header from "../header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {/* <MagicHeader /> */}
            <Head>
                <title>TSPDT Explorer</title>
            </Head>
            <main className="mx-auto max-w-5xl h-full grow">{children}</main>
        </>
    );
}
