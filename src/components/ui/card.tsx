export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-zinc-925 shadow-lg  flex flex-col p-2">
      {children}
    </div>
  );
}
