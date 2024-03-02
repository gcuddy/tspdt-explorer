"use client";

import { Button } from "@/components/ui/button";
import { markAsSeen, toggleFavorite, toggleWatchlist } from "@/server/actions";
import { cn } from "@/utils/tailwind";
import { CheckCircle, FilmReel, Heart, ListPlus } from "@phosphor-icons/react";
import { useOptimistic, useState } from 'react'


export function MarkAsSeen({ id, seen }: { id: string, seen: boolean }) {
    const mark = markAsSeen.bind(null, id, seen, false);

    // TODO: is there a reason to use useOptimistic here?
    const [optimistic, setOptimistic] = useState(seen);

    return <form action={async () => {
        setOptimistic(optimistic => !optimistic);
        await mark();
    }}>
        <Button
            className={optimistic ? "opacity-50" : ""}
        >
            {optimistic ? (
                <CheckCircle className="mr-1.5" />
            ) : (
                <FilmReel className="mr-1.5" />
            )}
            {optimistic ? "Seen" : "Mark Seen"}
        </Button>
    </form>
}

export function WatchlistButton({ id, onWatchlist }: { id: string, onWatchlist: boolean }) {
    const toggle = toggleWatchlist.bind(null, id, onWatchlist, false);
    const [optimistic, setOptimistic] = useState(onWatchlist);
    return (
        <form action={async () => {
            setOptimistic(optimistic => !optimistic);
            await toggle();
        }}>
            <Button
                className={optimistic ? "opacity-50" : ""}
            >
                {optimistic ? (
                    <CheckCircle className="mr-1.5" />
                ) : (
                    <ListPlus className="mr-1.5" />
                )}
                {optimistic ? "On Watchlist" : "Watchlist"}
            </Button>
        </form>
    )
}

export function HeartButton({ id, favorited }: { id: string, favorited: boolean }) {
    const toggle = toggleFavorite.bind(null, id, favorited, false);
    const [optimistic, setOptimistic] = useState(favorited);
    return (
        <form action={async () => {
            setOptimistic(optimistic => !optimistic);
            await toggle();
        }}>
            <Button
                className={cn(
                    "hover:scale-105 transition active:scale-95",
                    optimistic ? "bg-white/[.02] border-white/5" : ""
                )}
            >
                <Heart
                    weight={optimistic ? "fill" : "regular"}
                    className={optimistic ? "text-red-500" : "text-white"}
                />
                <span className="sr-only">Favorite</span>
            </Button>
        </form>
    )
}
