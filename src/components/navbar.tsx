"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="w-full border-b shadow-sm">
      <div className="px-4 md:px-6 py-3">
        {/* Mobile */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4">
              <nav className="flex flex-col gap-4 mt-6 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Me
                </Link>
                <Link href="/booking">Lesson Booking</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="pr-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex max-w-7xl mx-auto w-full items-center justify-between">
          <Link href="/dashboard" className="text-lg font-bold">
            English Platform
          </Link>

          <nav className="flex gap-6 text-sm font-medium justify-center flex-1">
            <Link href="/dashboard">Home</Link>
            <Link href="/about">About Me</Link>
            <Link href="/booking">Lesson Booking</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="pl-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
