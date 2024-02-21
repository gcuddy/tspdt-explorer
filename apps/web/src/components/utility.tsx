export function PeopleList<T>({
  items,
  prefix,
  render,
  id,
}: {
  prefix?: string;
  items: Array<T>;
  render: (item: T) => React.ReactNode;
  id?: T extends { id: infer U } ? U : never;
}) {
  if (items.length === 1) {
    return (
      <span>
        {prefix ? `${prefix} ` : null}
        {render(items[0])}
      </span>
    );
  }

  return (
    <span>
      {prefix}
      {prefix ? " " : null}
      {items
        .map((item, index) => {
          const key =
            item &&
            typeof item === "object" &&
            "id" in item &&
            typeof id === "string"
              ? (item as any)[id]
              : index;
          if (index === items.length - 1) {
            return <span key={key}>and {render(item)}</span>;
          }

          return <span key={key}>{render(item)}</span>;
        })
        .join(", ")}
    </span>
  );
}
