import { google } from "googleapis";
import path from "path";

const KEYFILEPATH = path.join(
  process.cwd(),
  "src",
  "config",
  "calendar-service-account.json"
);

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const calendar = google.calendar({
  version: "v3",
  auth,
});

export { auth };
