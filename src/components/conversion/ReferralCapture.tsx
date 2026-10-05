"use client";

import { useEffect } from "react";
import { captureReferralFromUrl, tagWhatsappLink } from "@/lib/referral";

const WHATSAPP_INTENT_EVENTS = ["pointerdown", "click"] as const;

export function ReferralCapture() {
  useEffect(() => {
    captureReferralFromUrl();

    const tag = (event: Event) => tagWhatsappLink(event.target);
    WHATSAPP_INTENT_EVENTS.forEach((name) => document.addEventListener(name, tag, true));

    return () => WHATSAPP_INTENT_EVENTS.forEach((name) => document.removeEventListener(name, tag, true));
  }, []);

  return null;
}
