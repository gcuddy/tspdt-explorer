"use client";

import ListItem from "@/components/list-item";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { type JSX } from "react";
import { useFilter } from "./filter-provider";
import type { Movie, Director } from "tspdt-api/src/db/schema";


export function List({
    movies,
}: {
    movies: Array<Movie & {
        moviesToDirectors?: Array<{
            director?: Director | null
        }>
    }>
    component?: JSX.Element;
}) {
    const { filter } = useFilter();

    const filteredMovies = React.useMemo(() => {
        if (!filter) return movies;
        return movies.filter(
            (movie) =>
                movie.title.toLowerCase().includes(filter.toLowerCase()) ||
                movie.moviesToDirectors?.some(({ director }) =>
                    director?.name.toLowerCase().includes(filter.toLowerCase())
                )
        );
    }, [movies, filter]);

    const listRef = React.useRef<HTMLDivElement>(null);
    const virtualizer = useWindowVirtualizer({
        count: filteredMovies.length,
        estimateSize: () => 120,
        overscan: 10,
        scrollMargin: listRef.current?.offsetTop ?? 0,
        getItemKey: (index) => filteredMovies[index].id,
    });
    return (
        <>
            <div ref={listRef}>
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {virtualizer.getVirtualItems().map((item) => (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${item.size}px`,
                                transform: `translateY(${item.start - virtualizer.options.scrollMargin
                                    }px)`,
                            }}
                            key={item.key}
                        >
                            {/* <component movie={movies[item.index]} /> */}
                            <ListItem movie={filteredMovies[item.index]} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
