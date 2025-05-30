"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noBackground = ["/", "/sign-in", "/sign-up", "/login"];

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body>
          {!noBackground.includes(pathname) && (
            <BackgroundBeams className="absolute inset-0 -z-10 pointer-events-none" />
          )}
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
