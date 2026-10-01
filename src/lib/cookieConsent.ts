export const CONSENT_COOKIE_NAME = "zentra_cookie_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const CONSENT_SHARED_DOMAIN = "zentrabusiness.com.br";

export type OptionalCookieCategory = "analytics";
export type CookieCategory = "essential" | OptionalCookieCategory;
export type CookieCategoryChoices = Record<OptionalCookieCategory, boolean>;

export type CookieConsent = {
  version: string;
  categories: CookieCategoryChoices;
  decidedAt: string;
};

export const ALL_OPTIONAL_CATEGORIES: CookieCategoryChoices = { analytics: true };
export const NO_OPTIONAL_CATEGORIES: CookieCategoryChoices = { analytics: false };

export function rawConsent(cookieHeader: string): string | null {
  const prefix = `${CONSENT_COOKIE_NAME}=`;
  let newest: { raw: string; decidedAt: number } | null = null;

  for (const part of cookieHeader.split(";")) {
    const entry = part.trim();
    if (!entry.startsWith(prefix)) continue;

    const raw = entry.slice(prefix.length);
    const decidedAt = Date.parse(parseConsent(raw)?.decidedAt ?? "");
    if (Number.isNaN(decidedAt)) continue;
    if (newest === null || decidedAt > newest.decidedAt) newest = { raw, decidedAt };
  }

  return newest?.raw ?? null;
}

function isConsent(value: unknown): value is CookieConsent {
  const candidate = value as Partial<CookieConsent> | null;
  return (
    typeof candidate?.version === "string" &&
    candidate.version !== "" &&
    typeof candidate.decidedAt === "string" &&
    candidate.decidedAt !== "" &&
    typeof candidate.categories?.analytics === "boolean"
  );
}

export function parseConsent(raw: string | null): CookieConsent | null {
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    return isConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function needsDecision(policyVersion: string, consent: CookieConsent | null): boolean {
  return consent === null || consent.version !== policyVersion;
}

export function consentCookieDomain(hostname: string): string | null {
  const belongs = hostname === CONSENT_SHARED_DOMAIN || hostname.endsWith(`.${CONSENT_SHARED_DOMAIN}`);
  return belongs ? `.${CONSENT_SHARED_DOMAIN}` : null;
}

export function buildConsent(policyVersion: string, categories: CookieCategoryChoices, now: Date): CookieConsent {
  return {
    version: policyVersion,
    categories: { analytics: categories.analytics === true },
    decidedAt: now.toISOString(),
  };
}

export function consentCookie(consent: CookieConsent, hostname: string, secure: boolean): string {
  const attributes = ["path=/", `max-age=${CONSENT_MAX_AGE_SECONDS}`, "SameSite=Lax"];
  const domain = consentCookieDomain(hostname);
  if (domain) attributes.push(`domain=${domain}`);
  if (secure) attributes.push("Secure");

  return [`${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}`, ...attributes].join("; ");
}

export function expiredHostConsentCookie(): string {
  return `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`;
}

export function readConsent(): CookieConsent | null {
  try {
    return parseConsent(rawConsent(document.cookie));
  } catch {
    return null;
  }
}

export function saveConsent(policyVersion: string, categories: CookieCategoryChoices): CookieConsent {
  const consent = buildConsent(policyVersion, categories, new Date());

  try {
    if (consentCookieDomain(window.location.hostname)) document.cookie = expiredHostConsentCookie();
    document.cookie = consentCookie(consent, window.location.hostname, window.location.protocol === "https:");
  } catch {
    return consent;
  }

  return consent;
}
