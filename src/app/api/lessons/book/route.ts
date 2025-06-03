import { NextResponse } from "next/server";
import { calendar } from "@/lib/google";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { addHours } from "date-fns";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { datetime } = body;

    if (!datetime) {
      return NextResponse.json({ error: "Missing datetime" }, { status: 400 });
    }

    const user = await (await clerkClient()).users.getUser(userId);
    const studentEmail = user.emailAddresses[0]?.emailAddress || "Unknown";

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
    console.error("Failed to book lesson:", error);
    return NextResponse.json(
      { error: "Failed to book lesson" },
      { status: 500 }
    );
  }
}
