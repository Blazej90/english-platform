import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { calendar } from "@/lib/google";

export async function DELETE(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
  }

  try {
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      eventId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to cancel event:", error);
    return NextResponse.json(
      { error: "Failed to cancel lesson" },
      { status: 500 }
    );
  }
}
