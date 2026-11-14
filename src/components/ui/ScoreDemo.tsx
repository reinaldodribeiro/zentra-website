"use client";

import { useEffect, useRef, useState } from "react";
import { creditAnalysis } from "@/content/site";
import styles from "./ScoreDemo.module.css";

const { demo } = creditAnalysis;
const DURATION_MS = 1200;
const BAND_COLORS = ["#d9603f", "#e8893a", "#e2b453", "#7fb76a", "#2f9e6f"] as const;
const ARC = "M 20 100 A 80 80 0 0 1 180 100";
const OUTER_ARC = "M 12 100 A 88 88 0 0 1 188 100";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function ScoreDemo() {
  const [value, setValue] = useState<number>(demo.score);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let frame = requestAnimationFrame(() => setValue(0));

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        setValue(Math.round(demo.score * easeOutCubic(progress)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    observer.observe(card);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const filled = Math.round((value / demo.scoreMax) * 10000) / 100;

  return (
    <div ref={cardRef} className={styles.card} role="group" aria-label={demo.ariaLabel}>
      <div className={`mono ${styles.header}`}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{demo.header}</span>
      </div>
      <div className={styles.gauge}>
        <svg viewBox="0 0 200 116" className={styles.svg} aria-hidden="true" focusable="false">
          {BAND_COLORS.map((color, i) => (
            <path
              key={color}
              d={OUTER_ARC}
              pathLength={100}
              fill="none"
              stroke={color}
              strokeWidth={4}
              strokeOpacity={0.45}
              strokeDasharray="19 81"
              strokeDashoffset={-i * 20}
            />
          ))}
          <path d={ARC} pathLength={100} fill="none" stroke="rgba(244, 246, 250, 0.1)" strokeWidth={10} strokeLinecap="round" />
          <path
            d={ARC}
            pathLength={100}
            fill="none"
            stroke="var(--gold-bright)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={`${filled} 100`}
          />
          <text x="100" y="94" textAnchor="middle" className={styles.number} aria-live="off">
            {value}
          </text>
          <text x="100" y="112" textAnchor="middle" className={styles.scale}>
            de {demo.scoreMax}
          </text>
        </svg>
        <p className={`mono ${styles.band}`}>{demo.band}</p>
        <p className={styles.probability}>{demo.probability}</p>
      </div>
      <ul className={styles.tiles}>
        {demo.tiles.map((tile) => (
          <li key={tile.label} className={styles.tile}>
            <span className={styles.tileLabel}>{tile.label}</span>
            <span className={`mono ${styles.tileValue}`}>{tile.value}</span>
          </li>
        ))}
      </ul>
      <p className={`mono ${styles.footer}`}>{demo.footer}</p>
    </div>
  );
}
