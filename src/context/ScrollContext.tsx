"use client";

import { createContext, useContext, useRef } from "react";

interface ScrollContextType {
  downloadSectionRef: React.RefObject<HTMLDivElement>;
  scrollToDownload: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDownload = () => {
    if (downloadSectionRef.current) {
      const yOffset = -100;
      const y =
        downloadSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ downloadSectionRef, scrollToDownload }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}
