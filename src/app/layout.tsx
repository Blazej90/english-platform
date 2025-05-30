// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "sonner";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" className="dark">
//         <body>
//           {children}
//           <Toaster />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { BackgroundBeams } from "@/components/ui/background-beams"; // importuj swój komponent!
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ścieżki bez animowanego tła:
  const noBackground = ["/", "/sign-in", "/sign-up", "/login"];

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body>
          {/* Animowane tło wszędzie oprócz podanych ścieżek */}
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
