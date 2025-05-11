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

  console.log("✅ Loaded HMS_MANAGEMENT_TOKEN:", token.slice(0, 10) + "...");
  console.log("🔍 Verifying room:", { roomId, roomName });

  await new Promise((res) => setTimeout(res, 2000));

  try {
    const roomRes = await fetch(`https://api.100ms.live/v2/rooms/${roomId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const rawRoom = await roomRes.text();
    console.log("📦 Room fetch response:", rawRoom);

    if (!roomRes.ok) {
      console.error("❌ Failed to fetch room info");
      return NextResponse.json(
        { error: "Room not found", raw: rawRoom },
        { status: 404 }
      );
    }

    const roomData = JSON.parse(rawRoom);

    if (roomData.name !== roomName) {
      console.error("❌ Room name mismatch", {
        expected: roomName,
        got: roomData.name,
      });
      return NextResponse.json(
        {
          error: `Room name mismatch: expected "${roomName}", got "${roomData.name}"`,
        },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("❌ Room lookup failed:", err);
    return NextResponse.json(
      { error: "Room verification error", details: String(err) },
      { status: 500 }
    );
  }

  try {
    const payload = {
      room: roomName,
      user_id: `guest-${Math.random().toString(36).substring(2, 10)}`,
      role: "guest",
      type: "app",
    };

    console.log("📤 Sending token request with body:", payload);

    const res = await fetch("https://api.100ms.live/v2/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();
    console.log("🔑 Token generation raw response:", raw);

    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from token API" },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("❌ Failed to parse JSON response:", err, raw);
      return NextResponse.json(
        { error: "Failed to parse JSON from token API", raw },
        { status: 500 }
      );
    }

    if (!res.ok || !data.token) {
      return NextResponse.json(
        { error: "Token generation failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ token: data.token });
  } catch (error) {
    console.error("❌ Unexpected token generation error:", error);
    return NextResponse.json(
      { error: "Unexpected error", details: String(error) },
      { status: 500 }
    );
  }
}
