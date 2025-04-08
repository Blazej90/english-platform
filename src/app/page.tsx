import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to English Platform</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        Learn English with personalized lessons and professional guidance. Log
        in to start booking your sessions!
      </p>

      <SignedOut>
        <Link
          href="/sign-in"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Get Started
        </Link>
      </SignedOut>

      <SignedIn>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          Go to Dashboard
        </Link>
      </SignedIn>
    </main>
  );
}
