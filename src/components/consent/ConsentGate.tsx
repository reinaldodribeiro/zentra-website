"use client";

import type { ReactNode } from "react";
import type { OptionalCookieCategory } from "@/lib/cookieConsent";
import { useCookieConsent } from "./CookieConsentProvider";

export function ConsentGate({ category, children }: { category: OptionalCookieCategory; children: ReactNode }) {
  const { isAllowed } = useCookieConsent();
  return isAllowed(category) ? <>{children}</> : null;
}
