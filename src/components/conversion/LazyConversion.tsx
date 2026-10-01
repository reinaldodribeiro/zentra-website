"use client";

import { Deferred } from "@/components/ui/Deferred";

const loadEngagementCard = () => import("./EngagementCard").then((module) => module.EngagementCard);
const loadExitModal = () => import("./ExitModal").then((module) => module.ExitModal);
const loadWhatsAppBubble = () => import("./WhatsAppBubble").then((module) => module.WhatsAppBubble);
const loadMobileBar = () => import("./MobileBar").then((module) => module.MobileBar);

export function LazyConversion() {
  return (
    <>
      <Deferred load={loadEngagementCard} props={{}} delayMs={2500} />
      <Deferred load={loadExitModal} props={{}} delayMs={2500} />
      <Deferred load={loadWhatsAppBubble} props={{}} delayMs={2500} />
      <Deferred load={loadMobileBar} props={{}} delayMs={2500} />
    </>
  );
}
