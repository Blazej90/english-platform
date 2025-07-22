import { NextResponse } from "next/server";
import { calendar } from "@/lib/google";

export async function GET() {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    const events = await calendar.events.list({
      calendarId,
      timeMin: "2024-01-01T00:00:00.000Z",
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("All events from Google Calendar:", events.data.items);

    const lessons = (events.data.items || []).map((event) => ({
      id: event.id || "",
      summary: event.summary || "Lesson",
      start: event.start?.dateTime || event.start?.date || "",
      end: event.end?.dateTime || event.end?.date || "",
      studentEmail: event.description
        ? event.description.match(/Student email: ([^,]+)/)?.[1] || ""
        : "",
      status: event.status,
    }));

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("❌ Failed to fetch lessons:", error);
    return NextResponse.json({ lessons: [] }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No ids provided" }, { status: 400 });
    }
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    for (const id of ids) {
      try {
        await calendar.events.delete({ calendarId, eventId: id });
      } catch (error) {
        // Rzutowanie typu na "unknown", potem "as" na obiekt z code/response
        const err = error as { code?: number; response?: { status?: number } };
        if (err?.code === 410 || err?.response?.status === 410) {
          continue;
        }
        throw error;
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to delete lessons:", error);
    return NextResponse.json(
      { error: "Failed to delete lessons" },
      { status: 500 }
    );
  }
}
