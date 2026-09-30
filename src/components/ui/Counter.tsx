"use client";

import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const DURATION_MS = 1400;

const label = (n: number) => Math.round(n).toLocaleString("pt-BR");

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const write = (n: number) => {
      node.textContent = `${prefix}${label(n)}${suffix}`;
    };

    let raf = 0;
    write(0);

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        write(value * easeOut(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      write(value);
    };
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {label(value)}
      {suffix}
    </span>
  );
}
