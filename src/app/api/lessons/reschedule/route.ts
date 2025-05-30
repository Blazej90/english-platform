// import { NextResponse } from "next/server";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { addHours } from "date-fns";
// import { calendar } from "@/lib/google";

// export async function POST(req: Request) {
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { date, time, eventId } = body;

//     if (!date || !time || !eventId) {
//       return NextResponse.json(
//         { error: "Missing date, time or eventId" },
//         { status: 400 }
//       );
//     }

//     const client = await clerkClient();
//     const user = await client.users.getUser(userId);
//     const studentEmail = user.emailAddresses[0]?.emailAddress || "Unknown";

//     try {
//       await calendar.events.delete({
//         calendarId: process.env.GOOGLE_CALENDAR_ID!,
//         eventId,
//       });
//     } catch (error: any) {
//       if (error?.code !== 410) {
//         throw error;
//       }
//     }

//     const start = new Date(`${date}T${time}:00`);
//     const end = addHours(start, 1);

//     const response = await calendar.events.insert({
//       calendarId: process.env.GOOGLE_CALENDAR_ID!,
//       requestBody: {
//         summary: `Lesson with Lamia`,
//         description: `Student email: ${studentEmail}, User ID: ${userId}`,
//         start: {
//           dateTime: start.toISOString(),
//           timeZone: "Europe/Warsaw",
//         },
//         end: {
//           dateTime: end.toISOString(),
//           timeZone: "Europe/Warsaw",
//         },
//       },
//     });

//     return NextResponse.json({ success: true, event: response.data });
//   } catch (error) {
//     console.error("Failed to reschedule lesson:", error);
//     return NextResponse.json(
//       { error: "Failed to reschedule lesson" },
//       { status: 500 }
//     );
//   }
// }

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
    const { date, time, eventId } = body;

    if (!date || !time || !eventId) {
      return NextResponse.json(
        { error: "Missing date, time or eventId" },
        { status: 400 }
      );
    }

    // Pobierz dane użytkownika
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const studentEmail = user.emailAddresses?.[0]?.emailAddress || "Unknown";

    // Najpierw usuń stare wydarzenie – jeśli już nie istnieje, kontynuuj
    try {
      await calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        eventId,
      });
    } catch (error: any) {
      // GCal 410 = "Resource has been deleted" – ignorujemy i lecimy dalej
      if (!(error && error.code === 410)) {
        throw error;
      }
    }

    // Tworzenie nowego wydarzenia
    const start = new Date(`${date}T${time}:00`);
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
