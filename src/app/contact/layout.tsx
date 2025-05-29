import { Navbar } from "@/components/navbar";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-10 p-4">{children}</main>
    </>
  );
}
