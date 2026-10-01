"use client";

import { useEffect, useState } from "react";
import { lookupDemo } from "@/content/site";
import styles from "./LookupDemo.module.css";

const STEP_MS = 700;
const REST_MS = 8000;
const TOTAL = lookupDemo.blocks.length;

export function LookupDemo() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let timer = 0;
    const advance = (n: number) => {
      setShown(n);
      const next = n < TOTAL ? n + 1 : 0;
      timer = window.setTimeout(() => advance(next), n < TOTAL ? STEP_MS : REST_MS);
    };
    timer = window.setTimeout(() => advance(1), STEP_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.card} role="group" aria-label={lookupDemo.ariaLabel} aria-live="off" data-reveal style={{ ["--i" as string]: 3 }}>
      <div className={`mono ${styles.header}`}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{lookupDemo.header}</span>
      </div>
      <p className={`mono ${styles.purpose}`}>{lookupDemo.purposeLine}</p>
      <ul className={styles.blocks}>
        {lookupDemo.blocks.map((block, i) => (
          <li key={block.title} className={styles.block} data-on={i < shown}>
            <div className={styles.blockHead}>
              <span className={styles.blockTitle}>{block.title}</span>
              <span className={`mono ${styles.count}`}>{block.count}</span>
            </div>
            <span className={`mono ${styles.example}`}>{block.example}</span>
          </li>
        ))}
      </ul>
      <p className={`mono ${styles.footer}`}>{lookupDemo.footer}</p>
    </div>
  );
}
