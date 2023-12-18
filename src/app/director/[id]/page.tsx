import { db } from "@/db/client";
import { notFound } from "next/navigation";

async function getDirector(id: string) {
	const director = await db.query.directors.findFirst({
		with: {
			directorsToMovies: {
				with: {
					movie: {
						with: {
							rankings: {
								orderBy(fields, { desc }) {
									return desc(fields.year);
								},
								limit: 1,
							},
						},
					},
				},
			},
		},
		where: (director, { eq }) => eq(director.id, id),
	});

	if (!director) {
		notFound();
	}

	director.directorsToMovies.sort((a, b) => {
		return (a.movie.year ?? 0) - (b.movie.year ?? 0);
	});

	return director;
}

export default async function Page({ params }: { params: { id: string } }) {
	const director = await getDirector(params.id);
	return (
		<div>
			<h1>{director.name}</h1>
			<ul>
				{director.directorsToMovies.map((directorToMovie) => (
					<li key={directorToMovie.movie.id}>
						{directorToMovie.movie.rankings[0].ranking <= 1000
							? "★ "
							: directorToMovie.movie.rankings[0].ranking <= 2500
							  ? "● "
							  : ""}
						{directorToMovie.movie.title} ({directorToMovie.movie.year})
						{directorToMovie.movie.rankings[0].ranking}
					</li>
				))}
			</ul>
		</div>
	);
}
