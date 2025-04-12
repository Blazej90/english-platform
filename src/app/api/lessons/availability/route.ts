import { calendar } from "@/lib/google";
import { NextResponse } from "next/server";

const calendarId = process.env.GOOGLE_CALENDAR_ID as string;

export async function GET(req: Request) {
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(now.getMonth() + 1);

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: nextMonth.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    const busySlots = events.map((event) => ({
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
    }));

    return NextResponse.json({ busy: busySlots });
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json(
      { error: "Unable to fetch availability" },
      { status: 500 }
    );
  }
}
