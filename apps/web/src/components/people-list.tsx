import * as React from "react";
import Link from "next/link";

export type Person = {
  id: string;
  name: string;
};


export function PersonLink({
  person,
}: {
  person: Person;
}) {
  return (
    <Link href={`/director/${person.id}`} className="text-zinc-300">
      {person.name}
    </Link>
  );
}

export function PeopleList({
  people,
  prefix,
}: {
  people: Array<Person>;
  prefix?: string;
}) {
  if (people.length === 1) {
    return (
      <span className="truncate">
        {prefix} <PersonLink person={people[0]} />
      </span>
    );
  }

  return (
    <span className="truncate">
      {prefix}{" "}
      {people.map((director, index) => {
        if (index === people.length - 1) {
          return (
            <span key={director.id}>
              and <PersonLink person={director} />
            </span>
          );
        }

        return (
          <React.Fragment key={director.id}>
            <PersonLink key={director.id} person={director} />
            {", "}
          </React.Fragment>
        );
      })}
    </span>
  );
}
