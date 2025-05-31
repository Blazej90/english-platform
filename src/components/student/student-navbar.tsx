// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";
// import { cn } from "@/lib/utils";

// export function StudentNavbar() {
//   const pathname = usePathname();
//   const links = [
//     { href: "/dashboard", label: "Home" },
//     { href: "/about", label: "About Me" },
//     { href: "/booking", label: "Booking" },
//     { href: "/contact", label: "Contact" },
//   ];

//   return (
//     <header className="w-full border-b bg-white/80 dark:bg-zinc-950/80 shadow-sm backdrop-blur-md">
//       <div className="px-4 md:px-8 py-3 flex items-center justify-between max-w-4xl mx-auto">
//         <Link
//           href="/dashboard"
//           className="font-bold text-lg tracking-tight text-emerald-600 dark:text-emerald-400"
//         >
//           English Platform
//         </Link>
//         <nav className="flex gap-2 sm:gap-4 text-base font-medium">
//           {links.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 className={cn(
//                   "relative px-2 py-1 rounded-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400 outline-none",
//                   isActive
//                     ? "text-emerald-600 dark:text-emerald-400 font-bold"
//                     : "text-muted-foreground hover:text-emerald-500 dark:hover:text-emerald-400",
//                   "after:content-[''] after:block after:h-[2px] after:bg-emerald-400 after:rounded-full after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left",
//                   isActive && "after:scale-x-100"
//                 )}
//                 style={{
//                   paddingBottom: "0.2rem",
//                 }}
//               >
//                 {label}
//               </Link>
//             );
//           })}
//         </nav>
//         <UserButton afterSignOutUrl="/" />
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export function StudentNavbar() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/booking", label: "Booking" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-white/10 bg-white/25 dark:bg-zinc-950/25 shadow-sm backdrop-blur-[8px] z-20">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/dashboard"
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
                  // Linia pod spodem na aktywnym lub na hover
                  "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2.5px] after:rounded-full after:transition-all after:duration-300 after:w-full",
                  isActive
                    ? "after:scale-x-100 after:bg-gradient-to-r after:from-emerald-400 after:to-purple-500"
                    : "after:scale-x-0 hover:after:scale-x-100 hover:after:bg-gradient-to-r hover:after:from-emerald-400 hover:after:to-purple-500",
                  // Brak żadnego tła na hover
                  "hover:text-emerald-400"
                )}
                style={{
                  paddingBottom: "0.2rem",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
