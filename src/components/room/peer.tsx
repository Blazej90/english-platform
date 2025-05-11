"use client";

import { useVideo } from "@100mslive/react-sdk";
import type { HMSPeer } from "@100mslive/react-sdk";

export default function Peer({ peer }: { peer: HMSPeer }) {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });

  return (
    <div className="peer-container border rounded p-2 bg-black text-white">
      <video
        ref={videoRef}
        className="w-full aspect-video rounded"
        autoPlay
        muted={peer.isLocal}
        playsInline
      />
      <div className="peer-name text-center mt-2 text-sm">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}
