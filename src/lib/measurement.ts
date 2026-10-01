import { consentCookieDomain } from "./cookieConsent.ts";

export const DEFAULT_POSTHOG_HOST = "https://eu.i.posthog.com";

export type MeasurementEnv = {
  posthogKey?: string;
  posthogHost?: string;
  gaId?: string;
};

export type MeasurementConfig = {
  posthogKey: string;
  posthogHost: string;
  gaId: string;
};

export function measurementConfig(env: MeasurementEnv): MeasurementConfig | null {
  const posthogKey = env.posthogKey?.trim();
  const gaId = env.gaId?.trim();
  if (!posthogKey || !gaId) return null;
  return { posthogKey, gaId, posthogHost: env.posthogHost?.trim() || DEFAULT_POSTHOG_HOST };
}

export function gaCookieNames(cookieHeader: string): string[] {
  return cookieHeader
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
}

export function gaCookieExpirations(cookieHeader: string, hostname: string): string[] {
  const shared = consentCookieDomain(hostname);
  const domains = [null, hostname, shared].filter((domain, index, all) => all.indexOf(domain) === index);
  return gaCookieNames(cookieHeader).flatMap((name) =>
    domains.map((domain) => `${name}=; path=/; max-age=0${domain ? `; domain=${domain}` : ""}`),
  );
}

export function isPosthogStorageKey(key: string): boolean {
  return key.startsWith("ph_") || key.startsWith("__ph_");
}
