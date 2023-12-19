import { AppendToResponse, PersonDetails } from "tmdb-ts";

export function Director({
  director,
}: {
  director: AppendToResponse<PersonDetails, "combined_credits"[], "person">;
}) {
  return (
    <div className="flex gap-4">
      <img
        className="rounded w-36"
        alt={director.name}
        src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
      />
      <div>
        <h2 className="text-2xl tracking-tighter font-bold">{director.name}</h2>
        <p>
          {new Date(director.birthday).getFullYear()} -{" "}
          {director.deathday ? new Date(director.deathday).getFullYear() : ""}
        </p>
        <p className="text-sm">
          Born: <span className="italic">{director.place_of_birth}</span>
        </p>
      </div>
    </div>
  );
}
