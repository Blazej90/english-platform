import { Navbar } from "@/components/navbar";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 p-6">{children}</main>
    </div>
  );
}
