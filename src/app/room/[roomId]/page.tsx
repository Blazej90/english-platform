// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   HMSRoomProvider,
//   useHMSActions,
//   useHMSStore,
//   selectIsConnectedToRoom,
// } from "@100mslive/react-sdk";
// import { Button } from "@/components/ui/button";

// function RoomContent() {
//   const { roomId } = useParams();
//   const router = useRouter();
//   const hmsActions = useHMSActions();
//   const isConnected = useHMSStore(selectIsConnectedToRoom);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const joinRoom = async () => {
//       if (!roomId || typeof roomId !== "string") return;

//       try {
//         const res = await fetch(`/api/rooms/token?roomId=${roomId}`);
//         const data = await res.json();

//         if (!res.ok || !data.token) {
//           throw new Error(data.error || "Failed to fetch token");
//         }

//         await hmsActions.join({
//           userName: "Guest",
//           authToken: data.token,
//           settings: { isAudioMuted: false, isVideoMuted: true },
//         });
//       } catch (err) {
//         console.error("Failed to join room:", err);
//         router.push("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     joinRoom();
//   }, [roomId, hmsActions, router]);

//   if (loading) return <p className="text-center mt-10">Joining the room...</p>;
//   if (!isConnected) return null;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Welcome to the Room</h1>
//       <p className="text-muted-foreground mb-4">
//         You are connected to room <strong>{roomId}</strong>.
//       </p>
//       <Button onClick={() => hmsActions.leave()}>Leave Room</Button>
//     </div>
//   );
// }

// export default function RoomPage() {
//   return (
//     <HMSRoomProvider>
//       <RoomContent />
//     </HMSRoomProvider>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  HMSRoomProvider,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { Button } from "@/components/ui/button";

function RoomContent() {
  const { roomName } = useParams();
  const router = useRouter();
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const joinRoom = async () => {
      if (!roomName || typeof roomName !== "string") return;

      const searchParams = new URLSearchParams(window.location.search);
      const roomId = searchParams.get("id");

      if (!roomId) {
        console.error("❌ Missing roomId in query string");
        setError("Missing roomId. Redirecting...");
        setTimeout(() => router.push("/dashboard"), 3000);
        return;
      }

      try {
        const res = await fetch(`/api/rooms/token?roomId=${roomId}`);
        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          console.error("❌ Failed to parse JSON:", text);
          throw new Error("Failed to parse JSON response");
        }

        if (!res.ok || !data.token) {
          console.error("❌ Token fetch failed:", res.status, data);
          throw new Error(data.error || "Failed to fetch token");
        }

        await hmsActions.join({
          userName: "Guest",
          authToken: data.token,
          settings: { isAudioMuted: false, isVideoMuted: true },
        });
      } catch (err) {
        console.error("❌ Failed to join room:", err);
        setError("Could not join the room. Redirecting...");
        setTimeout(() => router.push("/dashboard"), 3000);
      } finally {
        setLoading(false);
      }
    };

    joinRoom();
  }, [roomName, hmsActions, router]);

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

export default function RoomPage() {
  return (
    <HMSRoomProvider>
      <RoomContent />
    </HMSRoomProvider>
  );
}
