// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   return NextResponse.json({
// //     lessons: [
// //       {
// //         id: "1",
// //         studentEmail: "blazejbart@gmail.com",
// //         summary: "Test lesson",
// //         start: "2024-06-14T10:00:00.000Z",
// //         end: "2024-06-14T11:00:00.000Z",
// //       },
// //     ],
// //   });
// // }

// import { NextResponse } from "next/server";
// import { google } from "googleapis";

// import { calendar } from "@/lib/google";

// export async function GET() {
//   try {
//     const calendarId = process.env.GOOGLE_CALENDAR_ID!;
//     const now = new Date().toISOString();

//     const events = await calendar.events.list({
//       calendarId,
//       timeMin: "2024-01-01T00:00:00.000Z",
//       maxResults: 100,
//       singleEvents: true,
//       orderBy: "startTime",
//     });

//     const lessons = (events.data.items || []).map((event) => ({
//       id: event.id || "",
//       summary: event.summary || "Lesson",
//       start: event.start?.dateTime || event.start?.date || "",
//       end: event.end?.dateTime || event.end?.date || "",
//       studentEmail: event.description
//         ? event.description.match(/Student email: ([^,]+)/)?.[1] || ""
//         : "",
//       status: event.status,
//     }));

//     const filteredLessons = lessons.filter((l) => l.start && l.end);

//     return NextResponse.json({ lessons: filteredLessons });
//   } catch (error) {
//     console.error("❌ Failed to fetch lessons:", error);
//     return NextResponse.json({ lessons: [] }, { status: 500 });
//   }
// }

// src/app/api/teacher-lessons/route.ts
import { NextResponse } from "next/server";
import { calendar } from "@/lib/google";

// GET: Pobieranie lekcji
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

    const filteredLessons = lessons.filter((l) => l.start && l.end);

    return NextResponse.json({ lessons: filteredLessons });
  } catch (error) {
    console.error("❌ Failed to fetch lessons:", error);
    return NextResponse.json({ lessons: [] }, { status: 500 });
  }
}

// DELETE: Usuwanie lekcji
export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No ids provided" }, { status: 400 });
    }
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    for (const id of ids) {
      await calendar.events.delete({ calendarId, eventId: id });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete lessons" },
      { status: 500 }
    );
  }
}
