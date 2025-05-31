import { StudentNavbar } from "@/components/student/student-navbar";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudentNavbar />
      <main className="max-w-2xl mx-auto mt-10 p-4">{children}</main>
    </>
  );
}
