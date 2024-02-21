"use client";
import { useRef } from "react";
import { For } from "million/react";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";

export function WindowList<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  const parentRef = useRef<HTMLElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: 10000,
    estimateSize: () => 48,
  });

  console.log({ items });
  return (
    <>
      <div>
        <For
          each={rowVirtualizer.getVirtualItems()}
          as="div"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {(virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                fontSize: "20px",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Item {virtualItem.index}
              {/* {render(items[virtualItem.index])} */}
            </div>
          )}
        </For>
      </div>
    </>
  );
}
