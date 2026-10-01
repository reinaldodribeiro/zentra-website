"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  needsDecision,
  parseConsent,
  rawConsent,
  saveConsent,
  type CookieCategory,
  type CookieCategoryChoices,
  type CookieConsent,
} from "@/lib/cookieConsent";

type CookieConsentContextValue = {
  policyVersion: string | null;
  consent: CookieConsent | null;
  shouldAsk: boolean;
  preferencesOpen: boolean;
  isAllowed: (category: CookieCategory) => boolean;
  decide: (categories: CookieCategoryChoices) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const listeners = new Set<() => void>();
let snapshot: { raw: string | null; consent: CookieConsent | null } = { raw: null, consent: null };

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyConsentChanged(): void {
  for (const listener of listeners) listener();
}

function consentSnapshot(): CookieConsent | null {
  let raw: string | null = null;
  try {
    raw = rawConsent(document.cookie);
  } catch {
    raw = null;
  }
  if (raw !== snapshot.raw) snapshot = { raw, consent: parseConsent(raw) };

  return snapshot.consent;
}

function serverSnapshot(): undefined {
  return undefined;
}

export function CookieConsentProvider({
  policyVersion,
  children,
}: {
  policyVersion: string | null;
  children: ReactNode;
}) {
  const stored = useSyncExternalStore<CookieConsent | null | undefined>(subscribe, consentSnapshot, serverSnapshot);
  const hydrated = stored !== undefined;
  const consent = stored ?? null;
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const current = policyVersion !== null && consent?.version === policyVersion;

  const isAllowed = useCallback(
    (category: CookieCategory) => category === "essential" || (current && consent?.categories[category] === true),
    [consent, current],
  );

  const decide = useCallback(
    (categories: CookieCategoryChoices) => {
      setPreferencesOpen(false);
      if (policyVersion === null) return;
      saveConsent(policyVersion, categories);
      notifyConsentChanged();
    },
    [policyVersion],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      policyVersion,
      consent,
      shouldAsk: hydrated && policyVersion !== null && needsDecision(policyVersion, consent),
      preferencesOpen,
      isAllowed,
      decide,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [policyVersion, consent, hydrated, preferencesOpen, isAllowed, decide],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}
