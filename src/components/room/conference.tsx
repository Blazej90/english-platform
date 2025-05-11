// "use client";

// import {
//   useHMSStore,
//   useHMSActions,
//   selectPeers,
//   selectIsLocalAudioEnabled,
//   selectIsLocalVideoEnabled,
// } from "@100mslive/react-sdk";
// import { Button } from "@/components/ui/button";

// export default function Conference() {
//   const peers = useHMSStore(selectPeers);
//   const hmsActions = useHMSActions();
//   const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);
//   const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-xl font-semibold">You’re in the room</h2>

//       <div className="grid grid-cols-2 gap-4">
//         {peers.map((peer) => (
//           <div
//             key={peer.id}
//             className="border rounded-md p-2 text-center text-sm"
//           >
//             <p>{peer.name}</p>
//             <p>{peer.isLocal ? "(You)" : ""}</p>
//             <p>{peer.audioTrack ? "🎤 On" : "🔇 Off"}</p>
//             <p>{peer.videoTrack ? "🎥 On" : "📷 Off"}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-4">
//         <Button
//           onClick={() =>
//             isAudioOn
//               ? hmsActions.setLocalAudioEnabled(false)
//               : hmsActions.setLocalAudioEnabled(true)
//           }
//         >
//           {isAudioOn ? "Mute" : "Unmute"}
//         </Button>
//         <Button
//           onClick={() =>
//             isVideoOn
//               ? hmsActions.setLocalVideoEnabled(false)
//               : hmsActions.setLocalVideoEnabled(true)
//           }
//         >
//           {isVideoOn ? "Hide Video" : "Show Video"}
//         </Button>
//         <Button variant="destructive" onClick={() => hmsActions.leave()}>
//           Leave Room
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from "@100mslive/react-sdk";
import Peer from "./peer";
import { Button } from "@/components/ui/button";

export default function Conference() {
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">You’re in the room</h2>

      <div className="grid grid-cols-2 gap-4">
        {peers.map((peer) => (
          <div key={peer.id} className="border rounded-md p-2 bg-black">
            <Peer peer={peer} />
            <div className="text-center text-white mt-2">
              <p>
                {peer.name} {peer.isLocal ? "(You)" : ""}
              </p>
              <p>{peer.audioTrack ? "🎤 On" : "🔇 Off"}</p>
              <p>{peer.videoTrack ? "🎥 On" : "📷 Off"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => hmsActions.setLocalAudioEnabled(!isAudioOn)}>
          {isAudioOn ? "Mute" : "Unmute"}
        </Button>
        <Button onClick={() => hmsActions.setLocalVideoEnabled(!isVideoOn)}>
          {isVideoOn ? "Hide Video" : "Show Video"}
        </Button>
        <Button variant="destructive" onClick={() => hmsActions.leave()}>
          Leave Room
        </Button>
      </div>
    </div>
  );
}
