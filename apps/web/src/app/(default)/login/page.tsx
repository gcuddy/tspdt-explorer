import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/tailwind";
import { DiscordLogo } from "@phosphor-icons/react/dist/ssr";

const Page = async () => {
    return (
        <div className="grid h-full w-full place-content-center">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold mb-4 leading-tight text-center">Sign in</h1>
                    <div className="max-w-xs">
                        <p className="text-base leading-tight text-zinc-400 text-center">
                            Sign in to save progress, heart movies, add movies to your watchlist, and more.
                        </p>
                    </div>
                </div>
                <div>
                    <a className={cn(buttonVariants({ size: "lg" }),
                        // "bg-[#5a64ea]",
                        "text-center justify-center"
                    )} href="/login/discord">
                        <DiscordLogo weight="light" className="h-5 w-5 mr-2" color="#5a64ea" />
                        Sign in with Discord</a>
                </div>
            </div>
        </div>
    );
};

export default Page;
