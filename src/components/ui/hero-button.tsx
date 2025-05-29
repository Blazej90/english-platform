"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} passHref>
      <Button
        size="lg"
        className="
          relative px-10 py-4 text-lg rounded-2xl shadow-xl bg-gradient-to-br
          from-emerald-500 via-indigo-500 to-purple-500
          text-white font-bold transition-all
          hover:scale-105 hover:brightness-110
          before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl before:blur-[8px] before:-z-10
          after:absolute after:inset-0 after:rounded-2xl after:ring-2 after:ring-indigo-400/20 after:opacity-0 hover:after:opacity-100 after:transition
          backdrop-blur-md
          overflow-hidden
          w-full sm:w-auto
        "
        asChild
      >
        <span>{children}</span>
      </Button>
    </Link>
  );
}
