"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function SyncUser() {
  const { isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      fetch("/api/sync-user", { method: "POST" });
    }
  }, [isLoaded]);

  return null;
}
