import { NextResponse } from "next/server";
import { calendar } from "@/lib/google";

const calendarId = process.env.GOOGLE_CALENDAR_ID;

export async function GET() {
  try {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const response = await calendar.events.list({
      calendarId: calendarId!,
      timeMin: now.toISOString(),
      timeMax: nextWeek.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return NextResponse.json({
      status: "success",
      upcomingEventsCount: response.data.items?.length || 0,
      sampleEvent: response.data.items?.[0] || null,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Calendar diagnostic failed:", error);
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to Google Calendar",
          error: error.message,
        },
        { status: 500 }
      );
    }

    console.error("Calendar diagnostic failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to Google Calendar",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
