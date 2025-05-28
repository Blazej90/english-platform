"use client";

import { useState } from "react";
import {
  useHMSStore,
  selectHMSMessages,
  useHMSActions,
  HMSMessage,
} from "@100mslive/react-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const messages = useHMSStore(selectHMSMessages);
  const hmsActions = useHMSActions();

  const sendMessage = async () => {
    if (msg.trim().length === 0) return;
    await hmsActions.sendBroadcastMessage(msg);
    setMsg("");
  };

  return (
    <div className="flex flex-col h-full border rounded bg-muted p-2">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((m: HMSMessage) => (
          <div key={m.id} className="mb-1">
            <span className="font-semibold">{m.senderName}: </span>
            <span>{m.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} type="button">
          Send
        </Button>
      </div>
    </div>
  );
}
