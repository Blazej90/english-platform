"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  eventId: string;
  lesson: {
    id: string;
    summary?: string;
    start: string;
    end: string;
    studentEmail?: string;
  };
};
console.log("✅ join-as-teacher-button loaded");
export function JoinAsTeacherButton({ eventId, lesson }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          role: "host",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.roomName || !data.roomId) {
        throw new Error(data.error || "Failed to create teacher room");
      }

      router.push(`/room/${data.roomName}?id=${data.roomId}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to join as teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleJoin} disabled={loading}>
      {loading ? "Joining..." : "Join as teacher"}
    </Button>
  );
}
