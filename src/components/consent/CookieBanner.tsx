"use client";

import Link from "next/link";
import { cookieConsent, links } from "@/content/site";
import { ALL_OPTIONAL_CATEGORIES, NO_OPTIONAL_CATEGORIES } from "@/lib/cookieConsent";
import { useCookieConsent } from "./CookieConsentProvider";
import styles from "./Consent.module.css";

export function CookieBanner() {
  const { shouldAsk, preferencesOpen, decide, openPreferences } = useCookieConsent();
  if (!shouldAsk || preferencesOpen) return null;

  return (
    <section aria-label={cookieConsent.bannerLabel} className={styles.banner}>
      <div className={styles.bannerInner}>
        <p className={styles.bannerText}>
          {cookieConsent.bannerText}{" "}
          <Link href={links.cookies} className={styles.link}>
            {cookieConsent.policyLink}
          </Link>
        </p>
        <div className={styles.actions}>
          <button type="button" className={`btn btn-ghost ${styles.button}`} onClick={openPreferences}>
            {cookieConsent.configure}
          </button>
          <button type="button" className={`btn btn-primary ${styles.button}`} onClick={() => decide(NO_OPTIONAL_CATEGORIES)}>
            {cookieConsent.rejectNonEssential}
          </button>
          <button type="button" className={`btn btn-primary ${styles.button}`} onClick={() => decide(ALL_OPTIONAL_CATEGORIES)}>
            {cookieConsent.acceptAll}
          </button>
        </div>
      </div>
    </section>
  );
}
