import { google } from "googleapis";
import path from "path";
import fs from "fs";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

let credentials: any;

if (process.env.NODE_ENV === "production") {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_B64;
  if (!base64) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_B64 in production");
  }
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  credentials = JSON.parse(decoded);
} else {
  const keyFilePath = path.join(
    process.cwd(),
    "src",
    "config",
    "calendar-service-account.json"
  );
  if (!fs.existsSync(keyFilePath)) {
    throw new Error("Missing local service-account file");
  }
  credentials = JSON.parse(fs.readFileSync(keyFilePath, "utf-8"));
}

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

export const calendar = google.calendar({
  version: "v3",
  auth,
});

export { auth };
