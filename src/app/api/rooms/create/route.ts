import { NextResponse } from "next/server";

export async function POST() {
  const token = process.env.HMS_MANAGEMENT_TOKEN;
  const templateId = process.env.HMS_TEMPLATE;

  if (!token || !templateId) {
    return NextResponse.json(
      { error: "Missing HMS credentials" },
      { status: 500 }
    );
  }

  const payload = {
    name: `lesson-${Math.random().toString(36).substring(2, 10)}`,
    template_id: templateId,
    description: `Lesson room created at ${new Date().toISOString()}`,
    enabled: true,
    recording_info: { enabled: false },
    region: "eu",
  };

  try {
    const response = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Created room data:", data);

    if (!response.ok) {
      console.error("Failed to create room", data);
      return NextResponse.json(
        { error: "Failed to create room", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      roomName: data.name, // "lesson-..."
      roomId: data.id, // ← to będzie potrzebne do tokena!
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Unexpected error while creating room" },
      { status: 500 }
    );
  }
}
