"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeacherNavbar() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard-teacher", label: "Home" },
    { href: "/dashboard-teacher/students", label: "Students" },
    { href: "/dashboard-teacher/history", label: "History" },
  ];

  return (
    <header className="w-full border-b border-white/10 bg-white/25 dark:bg-zinc-950/25 shadow-sm backdrop-blur-[8px] z-20">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between max-w-4xl mx-auto">
        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center w-full">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md focus:outline-none bg-transparent hover:bg-emerald-100/30 dark:hover:bg-zinc-800 transition">
                <Menu className="h-6 w-6 text-emerald-500" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-4/5 max-w-xs bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-none"
            >
              <nav className="flex flex-col gap-3 mt-6 text-base font-medium">
                {links.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "relative px-2 py-2 rounded-md transition-all duration-200 outline-none",
                        isActive
                          ? "font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(34,211,238,0.65)]"
                          : "text-zinc-700 dark:text-zinc-200",
                        "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2.5px] after:rounded-full after:transition-all after:duration-300 after:w-full",
                        isActive
                          ? "after:scale-x-100 after:bg-gradient-to-r after:from-emerald-400 after:to-purple-500"
                          : "after:scale-x-0 hover:after:scale-x-100 hover:after:bg-gradient-to-r hover:after:from-emerald-400 hover:after:to-purple-500",
                        "hover:text-emerald-400"
                      )}
                      style={{ paddingBottom: "0.2rem" }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/dashboard-teacher"
            className="ml-3 font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(34,211,238,0.55)]"
          >
            English Platform
          </Link>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center w-full justify-between">
          <Link
            href="/dashboard-teacher"
            className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(34,211,238,0.55)]"
          >
            English Platform
          </Link>
          <nav className="flex gap-2 sm:gap-4 text-base font-medium">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-2 py-1 rounded-md transition-all duration-200 outline-none",
                    isActive
                      ? "font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(34,211,238,0.65)]"
                      : "text-zinc-700 dark:text-zinc-200",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2.5px] after:rounded-full after:transition-all after:duration-300 after:w-full",
                    isActive
                      ? "after:scale-x-100 after:bg-gradient-to-r after:from-emerald-400 after:to-purple-500"
                      : "after:scale-x-0 hover:after:scale-x-100 hover:after:bg-gradient-to-r hover:after:from-emerald-400 hover:after:to-purple-500",
                    "hover:text-emerald-400"
                  )}
                  style={{ paddingBottom: "0.2rem" }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
