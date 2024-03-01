"use server";

import React from "react";
import { client } from "@/lib/hono";
import { Button } from "@/components/ui/button";
import { CheckCircle, FilmReel, Heart, ListPlus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/tailwind";
import { getAuthHeaders } from "@/server/data-layer";

async function markAsSeen() {
    'use server';
    console.log("hey");
    return null;
    //         await client.movie[":id"].interaction.$post({ param: { id: movie.id }, form: { timeSeen: String(new Date()) } }, { headers: await getAuthHeaders() });
}
export async function ActionBar({ movie }: { movie: { id: string } }) {
    "use server";
    const userMovie = await client.movie[":id"].interaction.$get({ param: { id: movie.id } }, { headers: await getAuthHeaders() }).then((res) => res.json())
        .catch(e => {
            console.error(e);
            return null;
        })

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
            <form action={markAsSeen}>
                <Button
                    className={userMovie?.timeSeen ? "opacity-50" : ""}
                >
                    {userMovie?.timeSeen ? (
                        <CheckCircle className="mr-1.5" />
                    ) : (
                        <FilmReel className="mr-1.5" />
                    )}
                    {userMovie?.timeSeen ? "Seen" : "Mark Seen"}
                </Button>
            </form>
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
