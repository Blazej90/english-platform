// src/app/api/teacher-lessons/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Tu potem zrobisz pobieranie z Supabase!
  return NextResponse.json({
    lessons: [
      { id: 1, student: "Błażej", date: "2024-06-14", summary: "Test lesson" },
    ],
  });
}
