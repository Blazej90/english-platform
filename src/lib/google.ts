import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { readFileSync } from "fs";
import path from "path";

const keyFilePath = path.join(process.cwd(), "google-service-account.json");
const keyFile = JSON.parse(readFileSync(keyFilePath, "utf-8"));

const auth = new JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export const calendar = google.calendar({
  version: "v3",
  auth,
});
