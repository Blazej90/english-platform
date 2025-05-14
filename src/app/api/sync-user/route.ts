import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId, sessionClaims } = await auth();

  if (!userId || !sessionClaims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = sessionClaims.email as string;
  const name = sessionClaims.first_name as string;
  const role = email === "lamiaoosthuzein@gmail.com" ? "teacher" : "student";

  const { error } = await supabase.from("users").upsert({
    clerk_id: userId,
    email,
    name,
    role,
  });

  if (error) {
    console.error("❌ Failed to sync user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }

  return NextResponse.json({ message: "✅ User synced successfully" });
}
