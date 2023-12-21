export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-white/5 border border-white/[.08] hover:border-white/10 hover:bg-white/[.08] shadow-lg rounded-md h-8 px-2 flex items-center transition text-sm text-white">
      {children}
    </button>
  );
}
