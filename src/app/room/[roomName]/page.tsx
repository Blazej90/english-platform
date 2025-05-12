"use client";

import { HMSRoomProvider } from "@100mslive/react-sdk";
import JoinForm from "@/components/room/join-form";

export default function RoomPage() {
  return (
    <HMSRoomProvider>
      <JoinForm />
    </HMSRoomProvider>
  );
}
