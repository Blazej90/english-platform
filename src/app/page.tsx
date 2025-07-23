import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HeroButton } from "@/components/ui/hero-button";

export default function HomePage() {
  return (
    <HeroHighlight containerClassName="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="
        w-full
        max-w-4xl
        mx-auto
        text-center
        flex flex-col
        items-center
        justify-center
        gap-8
        z-20
        py-10
      "
        style={{ minHeight: "80vh" }}
      >
        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-snug sm:leading-tight">
          Welcome to <Highlight>English Learn Platform</Highlight>
        </h1>
        <p className="text-muted-foreground text-sm xs:text-base sm:text-lg mb-6 sm:mb-8">
          Learn English with personalized lessons and professional guidance.
          <br className="hidden xs:block" />
          Sign in to start booking your sessions and track your progress.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 w-full items-center justify-center">
          <SignedOut>
            <HeroButton href="/sign-in">Start Learning</HeroButton>
          </SignedOut>
          <SignedIn>
            <HeroButton href="/dashboard">
              Continue to Your Dashboard
            </HeroButton>
          </SignedIn>
        </div>
      </div>
    </HeroHighlight>
  );
}
