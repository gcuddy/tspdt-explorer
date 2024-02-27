import { PersonDetails } from "tmdb-ts";
import Markdown from "react-markdown";
import Image from "next/image";
import { ReadMoreDialog } from "@/components/clamp";
import { clampText } from "@/utils/text";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function Person({
    person,
}: {
    person: PersonDetails;
}) {
    return (
        <div className="flex gap-4">
            <div className="shrink w-36">
                <Image
                    className="rounded w-full shrink-0"
                    alt={person.name}
                    width={144}
                    height={144 * 1.5}
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                />
            </div>
            <div className="shrink">
                <h2 className="text-2xl tracking-tighter font-bold">{person.name}</h2>
                <p>
                    {new Date(person.birthday).getFullYear()} -{" "}
                    {person.deathday ? new Date(person.deathday).getFullYear() : ""}
                </p>
                <p className="text-sm">
                    Born: <span className="italic">{person.place_of_birth}</span>
                </p>
                {/* TODO: dialog */}
                <ReadMoreDialog
                    header={
                        <>
                            <DialogTitle>{person.name}</DialogTitle>
                            <DialogDescription>
                                {new Date(person.birthday).getFullYear()} -{" "}
                                {person.deathday
                                    ? new Date(person.deathday).getFullYear()
                                    : ""}
                                <br />
                                Born: <span className="italic">{person.place_of_birth}</span>
                            </DialogDescription>
                        </>
                    }
                    collapsed={
                        <Markdown className="prose prose-sm prose-invert prose-zinc">
                            {clampText(person.biography, 210)}
                        </Markdown>
                    }
                    expanded={
                        <Markdown className="prose prose-sm prose-invert prose-zinc">
                            {person.biography}
                        </Markdown>
                    }
                />
                {/* <ClampText
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
        /> */}
            </div>
        </div>
    );
}
