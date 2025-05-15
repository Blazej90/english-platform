import { TeacherNavbar } from "@/components/teacher/teacher-navbar";

export default function DashboardTeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col dark bg-muted/20">
      <TeacherNavbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
