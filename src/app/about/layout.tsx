import { StudentNavbar } from "@/components/student/student-navbar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentNavbar />
      <main className="flex-1 p-6 bg-muted/20">{children}</main>
    </div>
  );
}
