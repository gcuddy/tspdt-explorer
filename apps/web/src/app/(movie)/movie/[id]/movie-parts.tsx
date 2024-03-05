import { useMemo } from "react";
import * as Dialog from "@/components/ui/dialog";
import * as tmdb from "@/app/api/tmdb";
import { Button } from "@/components/ui/button";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card";
import { Poster } from "@/components/poster";

async function getMovieData({ tmdbId }: { tmdbId: number }) {
	const tmovie = await tmdb.getMovie({ tmdbId });
	return tmovie;
}

export async function Trailer({ tmdbId }: { tmdbId: number }) {

	const movie = await getMovieData({ tmdbId });


	const trailer = useMemo(() => {
		return movie?.videos.results.find((v) => v.type === "Trailer");
	}, [movie?.videos.results]);

	if (!trailer) return null;

	return (<div>{!!trailer ? (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button variant="ghost">
					<Play className="mr-1.5" size={12} weight="fill" />
					Trailer
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title>Trailer</Dialog.Title>
					<div className="flex justify-center">
						{/* TODO: make this bigger */}
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							style={{ border: "0px" }}
						/>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	) : null} </div>);
}


export async function MovieOverview({ tmdbId }: { tmdbId: number }) {
	const movie = await getMovieData({ tmdbId });

	if (!movie) return null;

	return (<Card className="h-72 flex flex-row gap-16">
		<div className="pl-6 py-6 gap-4 h-full flex flex-col justify-center">
			<span className=" text-xl leading-tight drop-shadow  tracking-tight text-balance text-zinc-50 font-semibold">
				{movie.tagline}
			</span>
			<p className="text-sm text-zinc-400">{movie.overview}</p>
		</div>
		<div className="pr-6 shrink-0">
			{(movie.images.posters?.length ?? 0) > 1 ? (
				<Dialog.Root>
					<Dialog.Trigger className="contents">
						{/* this makes distance 32, outer radius is 8 so 8 - 32 is negative - no radius needed */}
						<Poster
							poster_path={
								movie.poster_path ?? ""
								//   userMovie?.posterPath ?? movie.poster_path ?? ""
							}
						/>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay />
						<Dialog.Content>
							<Dialog.Title>Change Poster</Dialog.Title>
							<div className="flex flex-wrap max-h-96 overflow-y-auto">
								{movie.images.posters.map((p) => (
									<div key={p.file_path} className="w-1/4 p-2">
										{/* {JSON.stringify(p)} */}
										<button
											onClick={() => {
												//   replicache.mutate.movie_poster_path({
												//     id: movie.id,
												//     posterPath: p.file_path,
												//   });
											}}
										>
											<Poster
												width={p.width}
												poster_path={p.file_path}
											/>
										</button>
									</div>
								))}
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			) : (
				<Poster poster_path={movie.poster_path ?? ""} />
			)}
		</div>
	</Card>
	)
}

export function MovieOverviewSkeleton() {
	return (
		<Card className="h-72 flex flex-row gap-16">
			<div className="pl-6 py-6 gap-4 h-full flex flex-col justify-center">
				<div className="w-[150px] h-6 bg-zinc-400 animate-pulse">
				</div>
				<div className="w-[300px] h-12 bg-zinc-400 animate-pulse">
				</div>
			</div>
			<div className="pr-6 shrink-0">
				<div className="w-[150px] h-[225px] bg-zinc-400 animate-pulse">
				</div>
			</div>
		</Card>
	)
}
