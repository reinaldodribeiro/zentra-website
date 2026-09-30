"use client";

import { useState } from "react";
import { purposes } from "@/content/site";
import styles from "./PurposeSwitcher.module.css";

export function PurposeSwitcher() {
  const [active, setActive] = useState(0);
  const current = purposes.options[active];

  return (
    <div className={styles.wrap}>
      <div role="tablist" aria-label={purposes.title} aria-orientation="vertical" className={styles.tabs}>
        {purposes.options.map((option, i) => (
          <button
            key={option.label}
            id={`finalidade-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="finalidade-panel"
            tabIndex={active === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              const last = purposes.options.length - 1;
              const next =
                event.key === "ArrowDown" || event.key === "ArrowRight"
                  ? (i + 1) % (last + 1)
                  : event.key === "ArrowUp" || event.key === "ArrowLeft"
                    ? (i + last) % (last + 1)
                    : null;
              if (next === null) return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`finalidade-tab-${next}`)?.focus();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div
        id="finalidade-panel"
        role="tabpanel"
        aria-labelledby={`finalidade-tab-${active}`}
        aria-label={purposes.panelLabel}
        className={styles.panel}
      >
        <div key={active} className={styles.content}>
          <p className={`mono ${styles.label}`}>{purposes.recordedLabel}</p>
          <ul className={`mono ${styles.record}`}>
            {current.record.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className={`mono ${styles.label}`}>{purposes.returnedLabel}</p>
          <p className={styles.returned}>{current.returned}</p>
        </div>
        <p className={`mono ${styles.note}`}>{purposes.panelLabel}</p>
      </div>
    </div>
  );
}
