import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { addHours } from "date-fns";
import { calendar } from "@/lib/google";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { datetime, eventId } = body;
    if (!datetime || !eventId) {
      return NextResponse.json(
        { error: "Missing datetime or eventId" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const studentEmail = user.emailAddresses?.[0]?.emailAddress || "Unknown";

    try {
      await calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        eventId,
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: number }).code !== 410
      ) {
        throw error;
      }
    }

    const start = new Date(datetime);
    const end = addHours(start, 1);

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: {
        summary: "Lesson with Lamia",
        description: `Student email: ${studentEmail}, User ID: ${userId}`,
        start: {
          dateTime: start.toISOString(),
          timeZone: "Europe/Warsaw",
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: "Europe/Warsaw",
        },
      },
    });

    return NextResponse.json({ success: true, event: response.data });
  } catch (error) {
    console.error("Failed to reschedule lesson:", error);
    return NextResponse.json(
      { error: "Failed to reschedule lesson" },
      { status: 500 }
    );
  }
}
