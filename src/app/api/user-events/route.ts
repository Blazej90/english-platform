import { auth } from "@clerk/nextjs/server";
import { calendar } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: now.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = (response.data.items || []).filter(
      (event) =>
        event.description?.includes(userId) || event.summary?.includes(userId)
    );

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Failed to fetch user events", error);
    return NextResponse.json(
      { error: "Failed to fetch user events" },
      { status: 500 }
    );
  }
}
