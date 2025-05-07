import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = process.env.HMS_MANAGEMENT_TOKEN;
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!token || !roomId) {
    return NextResponse.json(
      { error: "Missing HMS_MANAGEMENT_TOKEN or roomId" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://api.100ms.live/v2/room-codes/generate",
      {
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
      }
    );

    const rawText = await response.text();
    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      parsed = { error: "Failed to parse JSON", rawText };
    }

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: parsed,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", details: String(err) },
      { status: 500 }
    );
  }
}
