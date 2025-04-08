import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-6 flex items-center justify-between border-b">
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About Me
          </Link>
          <Link href="/booking" className="hover:underline">
            Lesson Booking
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <main className="flex-1 p-6 bg-muted/20">{children}</main>
    </div>
  );
}
