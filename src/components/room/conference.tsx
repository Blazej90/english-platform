"use client";

import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  type HMSPeer,
} from "@100mslive/react-sdk";
import Peer from "@/components/room/peer";
import Chat from "@/components/room/chat";
import { Button } from "@/components/ui/button";

export default function Conference() {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const remotePeers = peers.filter((peer) => !peer.isLocal);

  // Główne okno: jeśli jest rozmówca, pokazuj go, jeśli nie — siebie
  const mainPeer: HMSPeer | undefined =
    remotePeers.length > 0 ? remotePeers[0] : localPeer;

  const otherThumbnails =
    remotePeers.length > 0 ? [localPeer, ...remotePeers.slice(1)] : []; // Miniaturki, jeśli więcej peerów

  const hmsActions = useHMSActions();
  const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  return (
    <div className="flex flex-col md:flex-row h-[70vh] gap-4">
      {/* LEWA STRONA: wideo */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Główne okno */}
        <div className="w-full flex-1 flex justify-center items-center min-h-[260px] bg-black relative">
          <div className="w-full max-w-2xl aspect-video relative">
            {mainPeer && <Peer peer={mainPeer} />}
            {remotePeers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10 rounded-xl">
                <span className="text-white text-lg font-semibold">
                  Waiting for another participant...
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Miniaturki pod głównym oknem */}
        {otherThumbnails.length > 0 && (
          <div className="flex gap-2 justify-center mt-2">
            {otherThumbnails.map(
              (peer) =>
                peer && (
                  <div
                    key={peer.id}
                    className="w-28 h-20 border rounded bg-black overflow-hidden"
                  >
                    <Peer peer={peer} />
                  </div>
                )
            )}
          </div>
        )}

        {/* Pasek przycisków */}
        <div className="flex justify-center gap-4 py-4 border-t border-zinc-800 bg-zinc-900">
          <Button
            onClick={() => hmsActions.setLocalAudioEnabled(!isAudioOn)}
            variant={isAudioOn ? "default" : "outline"}
          >
            {isAudioOn ? "Mute" : "Unmute"}
          </Button>
          <Button
            onClick={() => hmsActions.setLocalVideoEnabled(!isVideoOn)}
            variant={isVideoOn ? "default" : "outline"}
          >
            {isVideoOn ? "Hide Video" : "Show Video"}
          </Button>
          <Button variant="destructive" onClick={() => hmsActions.leave()}>
            Leave Room
          </Button>
        </div>
      </div>

      {/* PRAWA STRONA: chat */}
      <div className="w-full md:w-96 max-w-md bg-zinc-900 rounded-xl p-3 flex flex-col">
        <Chat />
      </div>
    </div>
  );
}
