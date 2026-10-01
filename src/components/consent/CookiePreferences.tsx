"use client";

import { useEffect, useRef, useState } from "react";
import { cookieConsent } from "@/content/site";
import { useCookieConsent } from "./CookieConsentProvider";
import styles from "./Consent.module.css";

export function CookiePreferencesButton({ label, className }: { label: string; className?: string }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button type="button" className={className} onClick={openPreferences}>
      {label}
    </button>
  );
}

export function CookiePreferences() {
  const { preferencesOpen } = useCookieConsent();
  return preferencesOpen ? <PreferencesDialog /> : null;
}

function PreferencesDialog() {
  const { consent, policyVersion, decide, closePreferences } = useCookieConsent();
  const dialog = useRef<HTMLDialogElement>(null);
  const current = consent !== null && consent.version === policyVersion;
  const [analytics, setAnalytics] = useState(current ? consent.categories.analytics : false);

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
  }, []);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="preferencias-cookies-titulo" onClose={closePreferences}>
      <div className={styles.dialogHead}>
        <h2 id="preferencias-cookies-titulo" className={styles.dialogTitle}>
          {cookieConsent.preferencesTitle}
        </h2>
        <button type="button" className={styles.close} onClick={closePreferences}>
          {cookieConsent.close}
        </button>
      </div>
      <p className={styles.dialogText}>{cookieConsent.preferencesIntro}</p>
      <section className={styles.category}>
        <div className={styles.categoryHead}>
          <h3 className={styles.categoryTitle}>{cookieConsent.essentialTitle}</h3>
          <span className={`mono ${styles.badge}`}>{cookieConsent.essentialBadge}</span>
        </div>
        <p className={styles.dialogText}>{cookieConsent.essentialText}</p>
      </section>
      <section className={styles.category}>
        <label className={styles.categoryHead}>
          <span className={styles.categoryTitle}>{cookieConsent.analyticsTitle}</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
        </label>
        <p className={styles.dialogText}>{cookieConsent.analyticsText}</p>
      </section>
      <div className={styles.dialogActions}>
        <button type="button" className="btn btn-primary" onClick={() => decide({ analytics })}>
          {cookieConsent.save}
        </button>
      </div>
    </dialog>
  );
}
