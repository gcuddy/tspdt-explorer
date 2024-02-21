"use client";

import React from "react";
import * as Dialog from "./ui/dialog";
import { Button } from "./ui/button";

// TODO: this is a *strange* way to do this, but it works
export function ReadMoreDialog({
  collapsed,
  expanded,
  header,
}: {
  collapsed: React.ReactNode;
  expanded: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <>
      <Dialog.Root>
        <div>
          {collapsed}
          <Dialog.Trigger asChild>
            <button>Read More</button>
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="max-h-[90vh] overflow-y-auto">
            <Dialog.Header>{header}</Dialog.Header>
            {expanded}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
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
