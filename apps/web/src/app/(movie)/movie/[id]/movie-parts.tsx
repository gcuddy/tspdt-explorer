import { groupBy } from "remeda";
import * as tmdb from "@/app/api/tmdb";
import { Card } from "@/components/ui/card";
import { Poster } from "@/components/poster";
import { objectEntries } from "@antfu/utils";
import { cn } from "@/utils/tailwind";
import { Credits, PosterSelector, Trailer } from "./movie-client-parts";

async function getMovieData({ tmdbId }: { tmdbId: number }) {
	const tmovie = await tmdb.getMovie({ tmdbId });
	return tmovie;
}

export async function TrailerWrapper({ tmdbId }: { tmdbId: number }) {

	const movie = await getMovieData({ tmdbId });


	const trailer = movie?.videos.results.find((v) => v.type === "Trailer");

	if (!trailer) return null;

	return (<div>{!!trailer ? (
		<Trailer trailerKey={trailer.key} />
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
				<PosterSelector movie={movie} />
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

const JOBS_TO_SHOW = [
	"Screenplay",
	"Producer",
	"Cinematography",
	"Director of Photography",
	"Editor",
	"Original Music Composer",
	"Music",
];


export async function MovieCreditsCard({
	tmdbId,
	className,
}: {
	tmdbId: number;
	className?: string;
}) {

	const movie = await getMovieData({ tmdbId });
	if (!movie) return null;
	const groupedCrew = objectEntries(groupBy(movie.credits.crew ?? [], (c) => c.job))
		.filter(([job, _crew]) => JOBS_TO_SHOW.includes(job as string))
		//   display in same order
		.sort(([jobA, _crewA], [jobB, _crewB]) => {
			return (
				JOBS_TO_SHOW.indexOf(jobA as string) -
				JOBS_TO_SHOW.indexOf(jobB as string)
			);
		})

	return (
		<Card className={cn("col-span-8 p-6", className)}>
			<Credits movie={movie} groupedCrew={groupedCrew as any} />
		</Card>
	);
}

export function MovieCreditsCardSkeleton() {
	return (
		<Card className="col-span-8 p-6">
			<div className="flex flex-wrap text-balance gap-x-3 gap-y-1">
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						className="w-[150px] h-6 bg-zinc-400 animate-pulse"
						key={i}
					>
					</div>
				))}
				<div className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition">
					Show more
				</div>
			</div>
		</Card>
	);
}
