"use client";

import { createContext, useContext, useRef } from "react";

type ScrollContextType = {
  aboutRef: React.RefObject<HTMLElement | null>;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const aboutRef = useRef<HTMLElement | null>(null);

  return (
    <ScrollContext.Provider value={{ aboutRef }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used within ScrollProvider");
  return context;
}
