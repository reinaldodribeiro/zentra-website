"use client";

import { useEffect } from "react";

export function MotionRuntime() {
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

    if (reduce.matches) pinAll();
    else arm();
    document.documentElement.dataset.motion = "";

    const onReduceChange = (e: MediaQueryListEvent) => {
      if (e.matches) pinAll();
      else arm();
    };
    reduce.addEventListener("change", onReduceChange);

    return () => {
      observer?.disconnect();
      delete document.documentElement.dataset.motion;
      reduce.removeEventListener("change", onReduceChange);
    };
  }, []);

  return null;
}
