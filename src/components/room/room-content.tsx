"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { Button } from "@/components/ui/button";

export default function RoomContent() {
  const params = useParams();
  const roomName =
    typeof params.roomName === "string" ? params.roomName : undefined;
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const joinRoom = async () => {
      if (!roomName) {
        setError("Invalid room name");
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const roomId = searchParams.get("id");

      if (!roomId) {
        setError("Missing room ID in the URL");
        return;
      }

      try {
        const res = await fetch(
          `/api/rooms/token?roomName=${roomName}&id=${roomId}`
        );
        const raw = await res.text();
        console.log("🔁 Raw token response:", raw);

        if (!raw) {
          setError("Empty response from server");
          return;
        }

        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          console.error("❌ Failed to parse JSON:", raw);
          setError("Server response was not valid JSON");
          return;
        }

        if (!res.ok || !data.token) {
          console.error("❌ Token fetch failed:", res.status, data);
          setError(data.error || "Failed to get auth token");
          return;
        }

        await hmsActions.join({
          userName: "Guest",
          authToken: data.token,
          settings: {
            isAudioMuted: false,
            isVideoMuted: true,
          },
        });
      } catch (err) {
        console.error("❌ Failed to join room:", err);
        setError("Could not join the room. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    joinRoom();
  }, [roomName, hmsActions]);

  if (loading) return <p className="text-center mt-10">Joining the room...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!isConnected) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Room</h1>
      <p className="text-muted-foreground mb-4">
        You are connected to room <strong>{roomName}</strong>.
      </p>
      <Button onClick={() => hmsActions.leave()}>Leave Room</Button>
    </div>
  );
}
