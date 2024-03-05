"use client";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { For } from "million/react";

export function WindowList<T>({
  items,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {

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
