export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-900 shadow-lg  flex flex-col p-2">
      {children}
    </div>
  );
}
