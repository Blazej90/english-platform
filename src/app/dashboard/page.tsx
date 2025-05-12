"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Welcome } from "@/components/welcome";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (email === "lamiaoosthuzein@gmail.com") {
      router.replace("/dashboard-teacher");
    } else {
      setCheckingRole(false);
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || checkingRole) return null;

  return <Welcome />;
}
