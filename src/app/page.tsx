import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 text-center space-y-8 bg-background text-foreground">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-emerald-500">English Platform</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg mb-8">
          Learn English with personalized lessons and professional guidance.
          Sign in to start booking your sessions and track your progress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignedOut>
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl px-8 py-4 text-base sm:text-lg transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/sign-in">Start Learning</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl px-8 py-4 text-base sm:text-lg transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/dashboard">Continue to Your Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
