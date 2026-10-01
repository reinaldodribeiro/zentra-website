"use client";

import { useEffect, useState, type ComponentType } from "react";

type DeferredProps<P extends object> = {
  load: () => Promise<ComponentType<P>>;
  props: P;
  delayMs?: number;
};

export function Deferred<P extends object>({ load, props, delayMs = 2000 }: DeferredProps<P>) {
  const [View, setView] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      load().then((component) => setView(() => component));
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [load, delayMs]);

  return View ? <View {...props} /> : null;
}
