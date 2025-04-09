import { ScrollProvider } from "@/context/scroll-context";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-muted/20">{children}</main>
      </div>
    </ScrollProvider>
  );
}
