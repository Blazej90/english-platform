import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  const user = await currentUser();

  if (!user) {
    console.error("🔒 Brak użytkownika (currentUser zwrócił null)");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email =
    user.emailAddresses?.[0]?.emailAddress || "no-email@unknown.com";
  const name = user.firstName || user.username || "Unnamed";
  const userId = user.id;
  const role = email === "lamiaoosthuzein@gmail.com" ? "teacher" : "student";

  console.log("📤 SYNC USER payload:", {
    clerk_id: userId,
    email,
    name,
    role,
  });

  const { error } = await supabase.from("users").upsert(
    {
      clerk_id: userId,
      email,
      name,
      role,
    },
    { onConflict: "clerk_id" }
  );

  if (error) {
    console.error("❌ Supabase error:", error);
    return NextResponse.json(
      { error: "Failed to sync user", details: error.message },
      { status: 500 }
    );
  }

  console.log("✅ User synced successfully");
  return NextResponse.json({ message: "User synced successfully" });
}
