import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <section className="max-w-2xl mx-auto mt-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome back{user?.firstName ? `, ${user.firstName}` : "!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            You are logged in as{" "}
            <span className="font-mono">
              {user?.emailAddresses?.[0]?.emailAddress}
            </span>
          </p>
          <p>
            Here you’ll be able to book lessons, manage your profile, and more.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
