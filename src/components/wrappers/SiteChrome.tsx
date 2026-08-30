"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Routes that render as a focused full-screen flow, without site chrome. */
const BARE_ROUTES = ["/diagnose"];

/**
 * Header and Footer live in the root layout and would otherwise render on every
 * route. Children are passed through rather than imported here so server
 * components (Footer) stay server-rendered.
 */
const SiteChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some((route) => pathname?.startsWith(route));

  if (isBare) return null;
  return <>{children}</>;
};

export default SiteChrome;
