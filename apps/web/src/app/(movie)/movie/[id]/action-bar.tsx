import { getUserMovie } from "@/server/data-layer";
import { HeartButton, MarkAsSeen, WatchlistButton } from "./action-buttons";

export async function ActionBar({ movie }: { movie: { id: string } }) {
    const userMovieId = getUserMovie.bind(null, movie.id);
    const userMovie = await userMovieId();

    if (userMovie && "authorized" in userMovie) {
        return null;
    }

    return (
        <>
            <MarkAsSeen id={movie.id} seen={!!userMovie?.timeSeen} />
            <WatchlistButton id={movie.id} onWatchlist={!!userMovie?.timeAdded} />
            <HeartButton id={movie.id} favorited={!!userMovie?.timeFavorited} />
        </>
    );
}
