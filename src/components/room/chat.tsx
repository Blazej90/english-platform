// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   useHMSStore,
//   selectHMSMessages,
//   useHMSActions,
//   HMSMessage,
// } from "@100mslive/react-sdk";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Send } from "lucide-react";

// export default function Chat() {
//   const [msg, setMsg] = useState("");
//   const messages = useHMSStore(selectHMSMessages);
//   const hmsActions = useHMSActions();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messages.length) console.log(messages.map((m) => m.message));
//   }, [messages]);

//   const sendMessage = async () => {
//     if (msg.trim().length === 0) return;
//     await hmsActions.sendBroadcastMessage(msg);
//     setMsg("");
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div
//       className="flex flex-col h-full bg-white/80 dark:bg-zinc-950/90 rounded-2xl shadow-xl backdrop-blur-md border-none p-3"
//       style={{
//         minWidth: 350,
//         maxWidth: 430,
//         marginLeft: "auto",
//       }}
//     >
//       <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-1">
//         {messages.length === 0 ? (
//           <div className="text-muted-foreground text-center py-8 text-sm">
//             No messages yet. Start the conversation!
//           </div>
//         ) : (
//           messages.map((m: HMSMessage) => (
//             <div
//               key={m.id}
//               className="flex flex-col animate-fade-in bg-gradient-to-r from-emerald-50/70 dark:from-zinc-800/60 via-transparent p-2 rounded-xl"
//             >
//               <span className="font-semibold text-emerald-600 dark:text-emerald-400">
//                 {m.senderName}
//               </span>
//               <span className="text-base text-foreground break-words">
//                 {m.message}
//               </span>
//             </div>
//           ))
//         )}
//         <div ref={bottomRef} />
//       </div>
//       <form
//         className="flex gap-2 pt-2"
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendMessage();
//         }}
//       >
//         <Input
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//           className="rounded-xl px-4 py-2 text-base bg-white/60 dark:bg-zinc-900/60 border-none flex-1 min-w-[0] max-w-[260px] md:max-w-[350px]"
//           style={{
//             minWidth: 0,
//             flexGrow: 1,
//             fontSize: "1rem",
//           }}
//           autoFocus
//         />
//         <Button
//           onClick={sendMessage}
//           type="submit"
//           className="rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white px-5 py-2 flex gap-2 font-semibold shadow active:scale-95 transition"
//         >
//           <Send className="w-4 h-4" />
//           Send
//         </Button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import {
  useHMSStore,
  selectHMSMessages,
  useHMSActions,
  HMSMessage,
} from "@100mslive/react-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const messages = useHMSStore(selectHMSMessages);
  const hmsActions = useHMSActions();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Filtr na unikalne ID wiadomości (fix duplikatów z 100ms)
  const uniqueMessages = messages.filter(
    (msg, idx, arr) => arr.findIndex((m) => m.id === msg.id) === idx
  );

  useEffect(() => {
    if (uniqueMessages.length) {
      console.log(
        "unique messages:",
        uniqueMessages.map((m) => m.message)
      );
    }
  }, [uniqueMessages]);

  const sendMessage = async () => {
    if (msg.trim().length === 0) return;
    await hmsActions.sendBroadcastMessage(msg);
    setMsg("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [uniqueMessages]);

  return (
    <div
      className="flex flex-col h-full bg-white/80 dark:bg-zinc-950/90 rounded-2xl shadow-xl backdrop-blur-md border-none p-3"
      style={{
        minWidth: 350,
        maxWidth: 430,
        marginLeft: "auto",
      }}
    >
      <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-1">
        {uniqueMessages.length === 0 ? (
          <div className="text-muted-foreground text-center py-8 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          uniqueMessages.map((m: HMSMessage) => (
            <div
              key={m.id}
              className="flex flex-col animate-fade-in bg-gradient-to-r from-emerald-50/70 dark:from-zinc-800/60 via-transparent p-2 rounded-xl"
            >
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {m.senderName}
              </span>
              <span className="text-base text-foreground break-words">
                {m.message}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <form
        className="flex gap-2 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="rounded-xl px-4 py-2 text-base bg-white/60 dark:bg-zinc-900/60 border-none flex-1 min-w-[0] max-w-[260px] md:max-w-[350px]"
          style={{
            minWidth: 0,
            flexGrow: 1,
            fontSize: "1rem",
          }}
          autoFocus
        />
        <Button
          onClick={sendMessage}
          type="submit"
          className="rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white px-5 py-2 flex gap-2 font-semibold shadow active:scale-95 transition"
        >
          <Send className="w-4 h-4" />
          Send
        </Button>
      </form>
    </div>
  );
}
