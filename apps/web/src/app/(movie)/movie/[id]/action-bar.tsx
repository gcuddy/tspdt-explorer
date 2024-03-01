"use server";

import React from "react";
import { client } from "@/lib/hono";
import { Button } from "@/components/ui/button";
import { CheckCircle, FilmReel, Heart, ListPlus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/tailwind";
import { getAuthHeaders, getUserMovie } from "@/server/data-layer";
import { markAsSeen } from "@/server/actions";

async function MarkAsSeen({ id, seen }: { id: string, seen: boolean }) {
    const mark = markAsSeen.bind(null, id);
    return <form action={mark}>
        <Button
            className={seen ? "opacity-50" : ""}
        >
            {seen ? (
                <CheckCircle className="mr-1.5" />
            ) : (
                <FilmReel className="mr-1.5" />
            )}
            {seen ? "Seen" : "Mark Seen"}
        </Button>
    </form>
}

export async function ActionBar({ movie }: { movie: { id: string } }) {
    const userMovieId = getUserMovie.bind(null, movie.id);
    const userMovie = await userMovieId();

    async function addToWatchlist() {
        await client.movie[":id"].interaction.$post({ param: { id: movie.id }, form: { timeAdded: String(new Date()) } }, { headers: await getAuthHeaders() });
    }
    async function heart() {
        await client.movie[":id"].interaction.$post({ param: { id: movie.id }, form: { timeFavorited: String(new Date()) } }, { headers: await getAuthHeaders() });
    }

    console.log({ userMovie, addToWatchlist, heart })

    if (userMovie && "authorized" in userMovie) {
        return null;
    }

    return (
        <>
            <MarkAsSeen id={movie.id} seen={!!userMovie?.timeSeen} />
            <Button
                className={userMovie?.timeAdded ? "opacity-50" : ""}
            >
                {userMovie?.timeAdded ? (
                    <CheckCircle className="mr-1.5" />
                ) : (
                    <ListPlus className="mr-1.5" />
                )}
                {userMovie?.timeAdded ? "On Watchlist" : "Watchlist"}
            </Button>
            <Button
                className={cn(
                    "hover:scale-105 transition active:scale-95",
                    userMovie?.timeFavorited ? "bg-white/[.02] border-white/5" : ""
                )}
            >
                <Heart
                    weight={userMovie?.timeFavorited ? "fill" : "regular"}
                    className={userMovie?.timeFavorited ? "text-red-500" : "text-white"}
                />
                <span className="sr-only">Favorite</span>
            </Button>
        </>
    );
}
