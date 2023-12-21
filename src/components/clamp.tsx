"use client";

import React from "react";

// This is a hacky way to do it so that we can include react-markdown in rsc. But really it's probably trivial.
export function ClampText({
  expanded,
  collapsed,
}: {
  expanded: React.ReactNode;
  collapsed: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <div
        style={{
          display: isExpanded ? "none" : "revert",
        }}
      >
        {collapsed}
        <button onClick={() => setIsExpanded(true)}>Read more</button>
      </div>
      <div
        style={{
          display: isExpanded ? "revert" : "none",
        }}
      >
        {expanded}
        <button onClick={() => setIsExpanded(false)}>Read less</button>
      </div>
    </>
  );
}
