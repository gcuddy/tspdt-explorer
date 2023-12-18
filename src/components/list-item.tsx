import Link from "next/link";

export default function ListItem({
	movie,
}: {
	movie: {
		ranking: number | null;
		title: string | null;
		year: number | null;
		director: { id: number; name: string }[];
	};
}) {
	return (
		<li className="flex items-center gap-1">
			<span className="text-gray-500 text-sm">{movie.ranking}</span>
			<span className="font-bold tracking-tight text-xl truncate">
				{movie.title}
			</span>
			<span>{movie.year}</span>
			<div className="flex truncate flex-1">
				{movie.director.map((director) => (
					<Link href={`/director/${director.id}`} key={director.id}>
						<span>{director.name}</span>
					</Link>
				))}
			</div>
		</li>
	);
}
