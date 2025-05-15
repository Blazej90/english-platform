// import { Navbar } from "@/components/navbar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 p-6 bg-muted/20">{children}</main>
//     </div>
//   );
// }

import { Navbar } from "@/components/navbar";
import { SyncUser } from "@/components/sync-user"; // ✅ dodaj import

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SyncUser /> {/* ✅ Dodaj komponent */}
      <Navbar />
      <main className="flex-1 p-6 bg-muted/20">{children}</main>
    </div>
  );
}
