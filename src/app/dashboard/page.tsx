import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
      <p className="text-muted-foreground">
        You are logged in as <span className="font-mono">{userId}</span>
      </p>
      <p>Here you’ll be able to book lessons, manage your profile, and more.</p>
    </section>
  );
}
