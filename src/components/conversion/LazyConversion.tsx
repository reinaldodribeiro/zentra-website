"use client";

import { Deferred } from "@/components/ui/Deferred";

const loadEngagementCard = () => import("./EngagementCard").then((module) => module.EngagementCard);

export function LazyConversion() {
  return <Deferred load={loadEngagementCard} props={{}} delayMs={2500} />;
}
