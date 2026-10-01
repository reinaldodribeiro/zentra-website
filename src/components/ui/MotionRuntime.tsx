"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-observe]"));

    let observer: IntersectionObserver | null = null;

    const pinAll = () => {
      targets.forEach((el) => el.classList.add("in"));
      observer?.disconnect();
      observer = null;
    };

    const arm = () => {
      if (observer) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      targets.forEach((el) => {
        if (!el.classList.contains("in")) observer?.observe(el);
      });
    };

    const pinAboveTheFold = () => {
      targets
        .filter((el) => el.getBoundingClientRect().top < window.innerHeight * 0.92)
        .forEach((el) => el.classList.add("in"));
    };

    const boot = () => {
      if (reduce.matches) pinAll();
      else {
        pinAboveTheFold();
        arm();
      }
      document.documentElement.dataset.motion = "";
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1500 })
      : window.setTimeout(boot, 600);

    const onReduceChange = (e: MediaQueryListEvent) => {
      if (e.matches) pinAll();
      else arm();
    };
    reduce.addEventListener("change", onReduceChange);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      observer?.disconnect();
      delete document.documentElement.dataset.motion;
      reduce.removeEventListener("change", onReduceChange);
    };
  }, [pathname]);

  return null;
}
