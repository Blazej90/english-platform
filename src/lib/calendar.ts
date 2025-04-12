import { google } from "googleapis";
import { auth } from "./google";

const calendar = google.calendar({ version: "v3", auth });

export async function getBusyTimeSlots(startDate: string, endDate: string) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(startDate).toISOString(),
      timeMax: new Date(endDate).toISOString(),
      timeZone: "Europe/Warsaw",
      items: [{ id: calendarId }],
    },
  });

  const busy = res.data.calendars?.[calendarId]?.busy ?? [];

  return busy.map((slot) => ({
    start: slot.start ?? "",
    end: slot.end ?? "",
  }));
}
