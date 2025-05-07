import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const HMS_MANAGEMENT_TOKEN = process.env.HMS_MANAGEMENT_TOKEN;
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!HMS_MANAGEMENT_TOKEN || !roomId) {
    return NextResponse.json(
      { error: "Missing HMS credentials or roomId" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://api.100ms.live/v2/room-codes/generate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HMS_MANAGEMENT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: roomId,
          user_id: `guest-${Math.random().toString(36).substring(2, 10)}`,
          role: "guest",
        }),
      }
    );

    // 🛡 Bezpieczne parsowanie odpowiedzi tylko jeśli jest OK
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      console.error("Token generation failed", data);
      return NextResponse.json(
        { error: "Failed to generate token", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ token: data.token });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Unexpected error", details: error },
      { status: 500 }
    );
  }
}
