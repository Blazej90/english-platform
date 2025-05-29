import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HeroButton } from "@/components/ui/hero-button";

export default function HomePage() {
  return (
    <HeroHighlight containerClassName="min-h-screen flex items-center justify-center px-2 sm:px-0 overflow-x-hidden">
      <div
        className="
          w-full
          max-w-md
          sm:max-w-xl
          lg:max-w-2xl
          mx-auto
          text-center
          flex flex-col
          items-center
          justify-center
          gap-8
          z-20
          py-10
        "
        style={{
          minHeight: "80vh", // Na mobile niech sekcja nie rozpycha się na 100vh przez klawiaturę, ale wyśrodkowana
        }}
      >
        <h1 className="text-2xl xs:text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          Welcome to <Highlight>English Platform</Highlight>
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
