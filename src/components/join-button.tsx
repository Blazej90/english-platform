// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// type Props = {
//   eventId: string;
//   start: string;
// };

// export function JoinButton({ eventId, start }: Props) {
//   const router = useRouter();
//   const [canJoin, setCanJoin] = useState(false);

//   useEffect(() => {
//     const checkJoinAvailability = () => {
//       const startTime = new Date(start).getTime();
//       const now = new Date().getTime();
//       const diffInMinutes = (startTime - now) / 1000 / 60;
//       setCanJoin(diffInMinutes <= 5 && diffInMinutes > -60);
//     };

//     checkJoinAvailability();
//     const interval = setInterval(checkJoinAvailability, 30_000);
//     return () => clearInterval(interval);
//   }, [start]);

//   const handleJoin = async () => {
//     try {
//       const res = await fetch("/api/rooms/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ eventId }),
//       });

//       const data = await res.json();

//       if (res.ok && data.roomId) {
//         router.push(`/room/${data.roomId}`);
//       } else {
//         throw new Error(data.error || "Something went wrong");
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         toast.error(err.message);
//       } else {
//         toast.error("Failed to join the lesson");
//       }
//     }
//   };

//   return (
//     <Button onClick={handleJoin} disabled={!canJoin}>
//       Join the lesson
//     </Button>
//   );
// }

// export default JoinButton;

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
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();

      if (res.ok && data.roomId) {
        // roomId to teraz ID pokoju (np. 681a8a67cbcb6ea2f34ef43b)
        router.push(`/room/${data.roomId}`);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to join the lesson");
      }
    }
  };

  return (
    <Button onClick={handleJoin} disabled={!canJoin}>
      Join the lesson
    </Button>
  );
}

export default JoinButton;
