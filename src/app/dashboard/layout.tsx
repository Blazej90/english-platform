import { StudentNavbar } from "@/components/student/student-navbar";
import { SyncUser } from "@/components/sync-user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SyncUser />
      <StudentNavbar />
      <main className="flex-1 p-6 bg-muted/20">{children}</main>
    </div>
  );
}
