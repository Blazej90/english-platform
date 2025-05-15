"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function TeacherNavbar() {
  return (
    <header className="w-full border-b border-white/10 bg-black text-white shadow-sm">
      <div className="px-4 md:px-6 py-3">
        {/* Mobile */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4 bg-black text-white">
              <nav className="flex flex-col gap-4 mt-6 text-sm font-medium">
                <Link
                  href="/dashboard-teacher"
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard-teacher/students"
                  className="hover:text-gray-300 transition-colors"
                >
                  Students
                </Link>
                <Link
                  href="/dashboard-teacher/history"
                  className="hover:text-gray-300 transition-colors"
                >
                  History
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="pr-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex max-w-7xl mx-auto w-full items-center justify-between">
          <Link href="/dashboard-teacher" className="text-lg font-bold">
            Teacher Dashboard
          </Link>

          <nav className="flex gap-6 text-sm font-medium justify-center flex-1">
            <Link
              href="/dashboard-teacher"
              className="hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard-teacher/students"
              className="hover:text-gray-300 transition-colors"
            >
              Students
            </Link>
            <Link
              href="/dashboard-teacher/history"
              className="hover:text-gray-300 transition-colors"
            >
              History
            </Link>
          </nav>

          <div className="pl-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}
