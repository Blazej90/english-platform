// "use client";

// import { useVideo } from "@100mslive/react-sdk";
// import type { HMSPeer } from "@100mslive/react-sdk";

// export default function Peer({ peer }: { peer: HMSPeer }) {
//   const { videoRef } = useVideo({ trackId: peer.videoTrack });

//   return (
//     <div className="peer-container border rounded p-2 bg-black text-white">
//       <video
//         ref={videoRef}
//         className="w-full aspect-video rounded"
//         autoPlay
//         muted={peer.isLocal}
//         playsInline
//       />
//       <div className="peer-name text-center mt-2 text-sm">
//         {peer.name} {peer.isLocal ? "(You)" : ""}
//       </div>
//     </div>
//   );
// }

"use client";

import { useVideo } from "@100mslive/react-sdk";
import type { HMSPeer } from "@100mslive/react-sdk";
import { cn } from "@/lib/utils";

export default function Peer({ peer }: { peer: HMSPeer }) {
  const { videoRef } = useVideo({ trackId: peer.videoTrack });

  return (
    <div
      className={cn(
        "peer-container relative border-none rounded-2xl bg-gradient-to-tr from-emerald-300/30 via-blue-500/10 to-purple-500/10 shadow-lg overflow-hidden flex flex-col items-center",
        peer.isLocal && "ring-2 ring-emerald-400/60"
      )}
      style={{ minHeight: "170px" }}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video rounded-2xl bg-zinc-900/80"
        autoPlay
        muted={peer.isLocal}
        playsInline
      />
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-950/70 px-3 py-1 rounded-xl text-xs font-semibold text-white shadow
        bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600
        bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(34,211,238,0.45)]
      "
      >
        <span className="pr-1">{peer.name}</span>
        {peer.isLocal && <span className="text-emerald-400">(You)</span>}
      </div>
    </div>
  );
}
