"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { About } from "@/components/about";

export function Welcome() {
  const { user, isLoaded } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const name = user?.firstName;

  if (!isLoaded) return null;

  return (
    <div className="space-y-10 px-4">
      <section className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome back{name ? `, ${name}` : "!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              You are logged in as <span className="font-mono">{email}</span>
            </p>
            <p>
              Here you’ll be able to book lessons, manage your profile, and
              more.
            </p>
          </CardContent>
        </Card>
      </section>

      <About />
    </div>
  );
}
