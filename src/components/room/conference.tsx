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
import { Mic, MicOff, Video, VideoOff, LogOut } from "lucide-react";

export default function Conference() {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const remotePeers = peers.filter((peer) => !peer.isLocal);

  const mainPeer: HMSPeer | undefined =
    remotePeers.length > 0 ? remotePeers[0] : localPeer;

  const otherThumbnails =
    remotePeers.length > 0 ? [localPeer, ...remotePeers.slice(1)] : [];

  const hmsActions = useHMSActions();
  const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);

  return (
    <div className="flex flex-col md:flex-row h-[70vh] gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <div className="w-full flex-1 flex justify-center items-center min-h-[260px]">
          <div className="w-full max-w-2xl aspect-video relative rounded-2xl shadow-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-none">
            {mainPeer && <Peer peer={mainPeer} />}
            {remotePeers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  Waiting for another participant
                  <span className="animate-bounce">...</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {otherThumbnails.length > 0 && (
          <div className="flex gap-2 justify-center mt-2">
            {otherThumbnails.map(
              (peer) =>
                peer && (
                  <div
                    key={peer.id}
                    className="w-28 h-20 rounded-xl shadow border bg-white/80 dark:bg-zinc-900/80 overflow-hidden"
                  >
                    <Peer peer={peer} />
                  </div>
                )
            )}
          </div>
        )}
        <div className="flex justify-center gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md rounded-b-2xl">
          <Button
            onClick={() => hmsActions.setLocalAudioEnabled(!isAudioOn)}
            className={`rounded-xl font-semibold px-5 py-2 text-base transition active:scale-95 shadow flex items-center gap-2 ${
              isAudioOn
                ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            }`}
            variant={isAudioOn ? "default" : "outline"}
          >
            {isAudioOn ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
            {isAudioOn ? "Mute" : "Unmute"}
          </Button>
          <Button
            onClick={() => hmsActions.setLocalVideoEnabled(!isVideoOn)}
            className={`rounded-xl font-semibold px-5 py-2 text-base transition active:scale-95 shadow flex items-center gap-2 ${
              isVideoOn
                ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            }`}
            variant={isVideoOn ? "default" : "outline"}
          >
            {isVideoOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
            {isVideoOn ? "Hide Video" : "Show Video"}
          </Button>
          <Button
            variant="destructive"
            className="rounded-xl font-semibold px-5 py-2 text-base transition active:scale-95 shadow flex items-center gap-2"
            onClick={() => hmsActions.leave()}
          >
            <LogOut className="w-5 h-5" />
            Leave Room
          </Button>
        </div>
      </div>
      <div className="w-full md:w-96 max-w-md bg-white/80 dark:bg-zinc-900/80 rounded-2xl p-3 flex flex-col shadow-lg backdrop-blur-md border-none">
        <Chat />
      </div>
    </div>
  );
}
