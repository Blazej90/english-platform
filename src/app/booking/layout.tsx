import { StudentNavbar } from "@/components/student/student-navbar";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentNavbar />
      <main className="flex-1 bg-muted/20 p-6">{children}</main>
    </div>
  );
}
