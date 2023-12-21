import Header from "../header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl">{children}</main>
    </>
  );
}
