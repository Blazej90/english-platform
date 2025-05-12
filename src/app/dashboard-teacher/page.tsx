"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardTeacherPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const email = user?.emailAddresses[0]?.emailAddress;
    if (email !== "lamiaoosthuzein@gmail.com") {
      toast.error("Access denied – teacher only");
      router.replace("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Teacher Dashboard</h1>
      <p className="text-muted-foreground mb-2">
        Welcome, {user?.firstName}! This is your teaching panel.
      </p>
    </div>
  );
}
