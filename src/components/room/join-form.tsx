// "use client";

// import { useState } from "react";
// import { useHMSActions } from "@100mslive/react-sdk";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// export default function JoinForm() {
//   const hmsActions = useHMSActions();
//   const [userName, setUserName] = useState("");
//   const [roomCode, setRoomCode] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const joinWithCode = async () => {
//     setError(null);
//     try {
//       const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
//       await hmsActions.join({
//         userName,
//         authToken,
//         settings: {
//           isAudioMuted: false,
//           isVideoMuted: true,
//         },
//       });
//     } catch (err: any) {
//       console.error("❌ Failed to join:", err);
//       setError(err.message || "Could not join the room.");
//     }
//   };

//   const createRoomAndJoin = async () => {
//     setError(null);
//     setLoading(true);

//     try {
//       const res = await fetch("/api/rooms/create", { method: "POST" });
//       const data = await res.json();

//       if (!res.ok || !data.roomCode) {
//         throw new Error(data.error || "Failed to create room");
//       }

//       const authToken = await hmsActions.getAuthTokenByRoomCode({
//         roomCode: data.roomCode,
//       });

//       await hmsActions.join({
//         userName,
//         authToken,
//         settings: {
//           isAudioMuted: false,
//           isVideoMuted: true,
//         },
//       });
//     } catch (err: any) {
//       console.error("❌ Failed to create/join:", err);
//       setError(err.message || "Could not join the room.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         joinWithCode();
//       }}
//       className="max-w-md mx-auto p-4 space-y-4"
//     >
//       <h2 className="text-2xl font-bold text-center">Join a Room</h2>

//       <div>
//         <Label htmlFor="name">Your Name</Label>
//         <Input
//           id="name"
//           placeholder="Enter your name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <Label htmlFor="code">Room Code</Label>
//         <Input
//           id="code"
//           placeholder="Enter room code (e.g. abc-def-ghi)"
//           value={roomCode}
//           onChange={(e) => setRoomCode(e.target.value)}
//         />
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <div className="flex gap-2">
//         <Button type="submit" className="w-full" disabled={loading}>
//           Join with Code
//         </Button>
//         <Button
//           type="button"
//           className="w-full"
//           variant="secondary"
//           onClick={createRoomAndJoin}
//           disabled={loading}
//         >
//           Create Room & Join
//         </Button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Conference from "@/components/room/conference";

export default function JoinForm() {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const [userName, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
      await hmsActions.join({
        userName,
        authToken,
        settings: {
          isAudioMuted: false,
          isVideoMuted: true,
        },
      });
    } catch (err: any) {
      console.error("❌ Failed to join:", err);
      setError(err.message || "Could not join the room.");
    }
  };

  if (isConnected) return <Conference />;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center">Join a Room</h2>

      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="code">Room Code</Label>
        <Input
          id="code"
          placeholder="Enter room code (e.g. abc-def-ghi)"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full">
        Join Room
      </Button>
    </form>
  );
}
