import Header from "../../../header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header sticky={false} />
      {/* <MagicHeader /> */}
      <main className="mx-auto max-w-5xl">{children}</main>
    </>
  );
}
