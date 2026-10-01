"use client";

import { Deferred } from "./Deferred";

const loadNetworkCanvas = () => import("./NetworkCanvas").then((module) => module.NetworkCanvas);

export function LazyNetworkCanvas({ className }: { className?: string }) {
  return <Deferred load={loadNetworkCanvas} props={{ className }} delayMs={1200} />;
}
