"use client";
import { Poster } from "@/components/poster";
import { getRecommendations } from "@/server/data-layer";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function Recomendations({
	movie,
}: {
	movie: TODO
}) {
	const { data, isLoading, isError, failureReason } = useQuery({
		queryKey: ["recommendations", movie.id],
		queryFn: () => getRecommendations(movie),
	});

	if (isError) return <div>Error: {failureReason?.message}</div>;
	if (!data || isLoading)
		return (
			<div className="grid grid-cols-4 w-full gap-4 mt-4">
				<div className="flex flex-col gap-2 items-center min-w-0 truncate">
					<div className="rounded overflow-hidden w-fit">
						<div className="bg-zinc-400 w-36 h-52 animate-pulse" />
					</div>
					<span className="text-sm text-zinc-400 whitespace-normal">
						Loading...
					</span>
				</div>
				<div className="flex flex-col gap-2 items-center min-w-0 truncate">
					<div className="rounded overflow-hidden w-fit">
						<div className="bg-zinc-400 w-36 h-52 animate-pulse" />
					</div>
					<span className="text-sm text-zinc-400 whitespace-normal">
						Loading...
					</span>
				</div>
				<div className="flex flex-col gap-2 items-center min-w-0 truncate">
					<div className="rounded overflow-hidden w-fit">
						<div className="bg-zinc-400 w-36 h-52 animate-pulse" />
					</div>
					<span className="text-sm text-zinc-400 whitespace-normal">
						Loading...
					</span>
				</div>
				<div className="flex flex-col gap-2 items-center min-w-0 truncate">
					<div className="rounded overflow-hidden w-fit">
						<div className="bg-zinc-400 w-36 h-52 animate-pulse" />
					</div>
					<span className="text-sm text-zinc-400 whitespace-normal">
						Loading...
					</span>
				</div>
			</div>
		);

	return (
		<div className="grid grid-cols-4 gap-4 w-full mt-4">
			{data?.vectorQuery?.map((movie) => {
				return (
					<Link
						href={`/movie/${movie.id}`}
						className="flex flex-col gap-2 items-center min-w-0 truncate"
						key={movie.id}
					>
						<div className="rounded overflow-hidden w-fit">
							<Poster poster_path={movie.metadata.posterPath} />
						</div>
						<span className="text-xs text-zinc-400 whitespace-normal line-clamp-2 px-4 text-center">
							{movie.metadata.title} ({movie.metadata.year})
						</span>
					</Link>
				);
			})}
		</div>
	);
}
