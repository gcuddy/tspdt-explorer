"use client";

import { getData } from "./page";
import ListItem from "@/components/list-item";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export function List({
  movies,
  component,
}: {
  movies: Awaited<ReturnType<typeof getData>>;
  component?: JSX.Element;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useWindowVirtualizer({
    count: movies.length,
    estimateSize: () => 48,
    overscan: 10,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    getItemKey: (index) => movies[index].id,
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
                transform: `translateY(${
                  item.start - virtualizer.options.scrollMargin
                }px)`,
              }}
              key={item.key}
            >
              {/* <component movie={movies[item.index]} /> */}
              <ListItem movie={movies[item.index]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
