"use client";

import { Poster } from "@/components/poster";
import { Button } from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";
import { TMDBMovie } from "@/utils/tmdb";
import { Play } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";

export function Trailer({ trailerKey }: { trailerKey: string }) {

	return (
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
							src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							style={{ border: "0px" }}
						/>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export function PosterSelector({ movie }: { movie: TMDBMovie }) {
	if (!movie) return null;
	return (

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
	)
}

export function Credits(
	{ movie, groupedCrew }: { movie: NonNullable<TMDBMovie>; groupedCrew: [string, { id: string; name: string }[]][] }
) {
	return (

		<Dialog.Root>
			<Tabs.Root
				className="flex flex-col justify-between grow h-full w-full"
				defaultValue="cast"
			>
				<Tabs.Content value="cast">
					<div className="flex flex-wrap text-balance gap-x-3 gap-y-1">
						{movie.credits.cast.slice(0, 10).map((c) => (
							<div
								className="text-sm rounded-md  text-zinc-400 font-semibold hover:text-zinc-50 transition"
								key={c.id}
							>
								<Link href={`/actor/${c.id}`}>
									<span>{c.name}</span>
								</Link>
								{/* <span>{c.character}</span> */}
							</div>
						))}
						{(movie.credits.cast?.length ?? 0) > 10 && (
							<>
								<Dialog.Trigger className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition">
									Show more
									{/* {expandedTabsState.cast ? "Show Less" : "Show More"} */}
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
									<Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl animate-in fade-in ring-1 ring-black/10 translate-x-[-50%] translate-y-[-50%] gap-4 bg-black/90 backdrop-blur-md p-6 shadow-lg rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
										<Dialog.Title>The Cast</Dialog.Title>
										<div className="flex flex-col gap-x-4 gap-y-1 text-lg font-normal leading-tight text-white max-h-80 overflow-y-auto">
											{movie.credits.cast.map((c) => (
												<div className=" transition" key={c.id}>
													<Link
														href={`/actor/${c.id}`}
														className="text-white font-medium"
													>
														{c.name}
													</Link>{" "}
													<span className="text-zinc-400">
														as {c.character}
													</span>
													{/* <span>{c.character}</span> */}
												</div>
											))}
										</div>
									</Dialog.Content>
								</Dialog.Portal>
							</>
						)}
					</div>
				</Tabs.Content>
				<Tabs.Content
					className="min-w-0 w-full flex flex-col grow gap-y-1"
					value="crew"
				>
					{groupedCrew
						.map(([job, crew]) => (
							<div
								className="flex w-full justify-between min-w-0 gap-1 truncate"
								key={job as string}
							>
								<span className="text-sm font-semibold text-zinc-400">
									{job as string}
								</span>
								<div className="flex flex-wrap shrink-0 grow-0 basis-auto min-w-0 text-sm gap-1 truncate">
									{crew.map((c) => (
										<div
											className="min-w-0 truncate no-wrap shrink-0 text-zinc-400"
											key={c.id}
										>
											{c.name}{crew.indexOf(c) !== crew.length - 1 ? ", " : ""}
										</div>
									))}
								</div>
							</div>
						))}
					<Dialog.Trigger className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition ml-auto">Show more</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay />
						<Dialog.Content>
							<Dialog.Title>The Crew</Dialog.Title>
							<div className="flex flex-col gap-x-4 gap-y-1 text-lg font-normal leading-tight text-white max-h-80 overflow-y-auto">
								{groupedCrew.map(([job, crew]) => (
									<div
										key={job as string}
										className="flex w-full justify-between min-w-0"
									>
										<span className="font-semibold text-zinc-400">
											{job as string}
										</span>
										<div className="flex shrink-0 grow-0 basis-auto min-w-0 gap-1 truncate">
											{crew.map((c) => (
												<div
													className="min-w-0 truncate no-wrap shrink-0"
													key={c.id}
												>
													{c.name}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Tabs.Content>
				<Tabs.List className="flex gap-2 text-sm">
					<Tabs.Trigger
						className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition  hover:bg-zinc-500/10"
						value="cast"
					>
						Cast
					</Tabs.Trigger>
					<Tabs.Trigger
						className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition hover:bg-zinc-500/10"
						value="crew"
					>
						Crew
					</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</Dialog.Root>
	)
}
