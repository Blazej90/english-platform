// import { NextResponse } from "next/server";

// export async function POST() {
//   const token = process.env.HMS_MANAGEMENT_TOKEN;
//   const templateId = process.env.HMS_TEMPLATE;

//   if (!token || !templateId) {
//     return NextResponse.json(
//       { error: "Missing HMS credentials or template ID" },
//       { status: 500 }
//     );
//   }

//   const roomName = `lesson-${Math.random().toString(36).substring(2, 10)}`;

//   const roomPayload = {
//     name: roomName,
//     template_id: templateId,
//     description: `Lesson room created at ${new Date().toISOString()}`,
//     enabled: true,
//     region: "eu",
//   };

//   try {
//     const roomRes = await fetch("https://api.100ms.live/v2/rooms", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(roomPayload),
//     });

//     const roomData = await roomRes.json();

//     if (!roomRes.ok || !roomData.id) {
//       console.error("❌ Failed to create room", roomData);
//       return NextResponse.json(
//         { error: "Failed to create room", details: roomData },
//         { status: 500 }
//       );
//     }

//     const roomId = roomData.id;

//     const codeRes = await fetch(
//       "https://api.100ms.live/v2/room-codes/generate",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           room_id: roomId,
//           role: "guest",
//         }),
//       }
//     );

//     const codeData = await codeRes.json();

//     if (!codeRes.ok || !codeData.code) {
//       console.error("❌ Failed to generate room code", codeData);
//       return NextResponse.json(
//         { error: "Failed to generate room code", details: codeData },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       roomId,
//       roomName,
//       roomCode: codeData.code,
//     });
//   } catch (error) {
//     console.error("❌ API error:", error);
//     return NextResponse.json(
//       { error: "Unexpected error while creating room" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST() {
  const token = process.env.HMS_MANAGEMENT_TOKEN;
  const templateId = process.env.HMS_TEMPLATE;

  if (!token || !templateId) {
    return NextResponse.json(
      { error: "Missing HMS credentials or template ID" },
      { status: 500 }
    );
  }

  const roomName = `lesson-${Math.random().toString(36).substring(2, 10)}`;

  const roomPayload = {
    name: roomName,
    template_id: templateId,
    description: `Lesson room created at ${new Date().toISOString()}`,
    enabled: true,
    region: "eu",
  };

  try {
    // 1. Tworzymy pokój
    const roomRes = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomPayload),
    });

    const roomData = await roomRes.json();
    console.log("🟢 Room create status:", roomRes.status);
    console.log("🟢 Room data:", roomData);

    if (!roomRes.ok || !roomData.id) {
      console.error("❌ Failed to create room", roomData);
      return NextResponse.json(
        { error: "Failed to create room", details: roomData },
        { status: 500 }
      );
    }

    const roomId = roomData.id;

    // 2. Generujemy kod pokoju dla roli "guest" zgodnie z dokumentacją 100ms:
    const codeRes = await fetch(
      `https://api.100ms.live/v2/room-codes/room/${roomId}/role/guest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const codeData = await codeRes.json();
    console.log("🟢 Room code data:", codeData);

    if (!codeRes.ok || !codeData.code) {
      console.error("❌ Failed to generate room code", codeData);
      return NextResponse.json(
        { error: "Failed to generate room code", details: codeData },
        { status: 500 }
      );
    }

    return NextResponse.json({
      roomId,
      roomName,
      roomCode: codeData.code,
    });
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Unexpected error while creating room" },
      { status: 500 }
    );
  }
}
