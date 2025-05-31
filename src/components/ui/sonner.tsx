"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            group-[.toaster]:bg-white/90 dark:group-[.toaster]:bg-zinc-900/95
            group-[.toaster]:text-zinc-900 dark:group-[.toaster]:text-zinc-100
            group-[.toaster]:border group-[.toaster]:border-zinc-200 dark:group-[.toaster]:border-zinc-800
            group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl
            group-[.toaster]:backdrop-blur-lg
            group-[.toaster]:p-4
            group-[.toaster]:transition-all
            group-[.toaster]:duration-300
            group-[.toaster]:ring-1 ring-emerald-400/15
          `,
          description: `
            group-[.toast]:text-zinc-500 dark:group-[.toast]:text-zinc-400
            font-medium
          `,
          actionButton: `
            group-[.toast]:bg-emerald-600 group-[.toast]:text-white
            group-[.toast]:hover:bg-emerald-700
            rounded-lg px-4 py-2 font-semibold transition
          `,
          cancelButton: `
            group-[.toast]:bg-zinc-200 group-[.toast]:text-zinc-700
            dark:group-[.toast]:bg-zinc-800 dark:group-[.toast]:text-zinc-300
            rounded-lg px-4 py-2 font-semibold transition
          `,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
