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
import { TypewriterEffectLoop } from "@/components/ui/typewriter-effect";
import { LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          isVideoMuted: false,
        },
      });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "Could not join the room.");
    }
  };

  if (isConnected) return <Conference />;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md px-3 sm:px-0 space-y-6"
        autoComplete="off"
      >
        <TypewriterEffectLoop
          words={[
            {
              text: "Join",
              className: "text-emerald-600 dark:text-emerald-400",
            },
            {
              text: "a",
              className: "text-blue-600 dark:text-blue-400",
            },
            {
              text: "Room",
              className: "text-yellow-500 dark:text-yellow-300",
            },
          ]}
          className="!text-2xl sm:!text-3xl font-bold mb-1 text-center"
          cursorClassName="bg-emerald-500"
        />

        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="rounded-xl px-4 py-2 mt-1 shadow focus:ring-2 focus:ring-emerald-400 border-zinc-200 dark:border-zinc-800 transition"
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
            className="rounded-xl px-4 py-2 mt-1 shadow focus:ring-2 focus:ring-blue-400 border-zinc-200 dark:border-zinc-800 transition"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full rounded-xl font-semibold px-6 py-3 text-base
          bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-500
          text-white shadow-emerald-500/30 shadow-lg hover:shadow-emerald-400/60
          focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
          relative overflow-hidden flex items-center justify-center gap-2
          active:scale-95 transition duration-150"
        >
          <LogIn className="w-5 h-5 mr-1" />
          Join Room
        </Button>
      </motion.form>
    </div>
  );
}
