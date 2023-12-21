import { AppendToResponse, PersonDetails } from "tmdb-ts";
import Markdown from "react-markdown";
import Image from "next/image";
import { ClampText } from "@/components/clamp";
import { clampText } from "@/utils/text";

export function Director({
  director,
}: {
  director: AppendToResponse<PersonDetails, "combined_credits"[], "person">;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink w-36">
        <Image
          className="rounded w-full shrink-0"
          alt={director.name}
          width={144}
          height={144 * 1.5}
          src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
        />
      </div>
      <div className="shrink">
        <h2 className="text-2xl tracking-tighter font-bold">{director.name}</h2>
        <p>
          {new Date(director.birthday).getFullYear()} -{" "}
          {director.deathday ? new Date(director.deathday).getFullYear() : ""}
        </p>
        <p className="text-sm">
          Born: <span className="italic">{director.place_of_birth}</span>
        </p>
        <ClampText
          collapsed={
            <Markdown className="prose prose-sm prose-invert prose-zinc">
              {clampText(director.biography, 210)}
            </Markdown>
          }
          expanded={
            <Markdown className="prose prose-sm prose-invert prose-zinc">
              {director.biography}
            </Markdown>
          }
        />
      </div>
    </div>
  );
}
