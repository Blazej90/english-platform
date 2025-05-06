"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  eventId: string;
  start: string;
};

export function JoinButton({ eventId, start }: Props) {
  const router = useRouter();
  const [canJoin, setCanJoin] = useState(false);

  useEffect(() => {
    const checkJoinAvailability = () => {
      const startTime = new Date(start).getTime();
      const now = new Date().getTime();
      const diffInMinutes = (startTime - now) / 1000 / 60;
      setCanJoin(diffInMinutes <= 5 && diffInMinutes > -60);
    };

    checkJoinAvailability();
    const interval = setInterval(checkJoinAvailability, 30_000);
    return () => clearInterval(interval);
  }, [start]);

  const handleJoin = async () => {
    try {
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }), // obecnie nie używane, ale gotowe
      });

      const data = await res.json();

      if (res.ok && data.roomId) {
        router.push(`/room/${data.roomId}`);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to join the lesson");
    }
  };

  return (
    <Button onClick={handleJoin} disabled={!canJoin}>
      Join the lesson
    </Button>
  );
}

export default JoinButton;
