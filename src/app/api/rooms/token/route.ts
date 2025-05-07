import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = process.env.HMS_MANAGEMENT_TOKEN;
  const { searchParams } = new URL(req.url);

  const roomName = searchParams.get("roomName");
  const roomId = searchParams.get("id");

  if (!token || !roomName || !roomId) {
    return NextResponse.json(
      { error: "Missing HMS credentials, roomName or roomId" },
      { status: 400 }
    );
  }

  try {
    const verifyRes = await fetch("https://api.100ms.live/v2/rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const list = await verifyRes.json();
    const found = list.rooms?.find(
      (r: { id: string; name: string }) =>
        r.id === roomId && r.name === roomName
    );

    if (!found) {
      return NextResponse.json(
        {
          error: `Room not found or mismatched name/id (${roomName}, ${roomId})`,
        },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Room verification failed:", err);
    return NextResponse.json(
      { error: "Failed to verify room", details: String(err) },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.100ms.live/v2/room-codes/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: roomId,
        user_id: `guest-${Math.random().toString(36).substring(2, 10)}`,
        role: "guest",
      }),
    });

    const raw = await res.text();
    console.log("🔎 Token generation raw response:", raw);

    const data = JSON.parse(raw);

    if (!res.ok || !data.code) {
      return NextResponse.json(
        { error: "Token generation failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ token: data.code });
  } catch (error) {
    console.error("❌ Unexpected token generation error:", error);
    return NextResponse.json(
      { error: "Unexpected error", details: String(error) },
      { status: 500 }
    );
  }
}
