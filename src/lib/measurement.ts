import { consentCookieDomain } from "./cookieConsent.ts";

export const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export type MeasurementEnv = {
  posthogKey?: string;
  posthogHost?: string;
  gaId?: string;
};

export type PosthogConfig = {
  posthogKey: string;
  posthogHost: string;
};

export type ConsentValue = "granted" | "denied";

export type GaConsent = {
  analytics_storage: ConsentValue;
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

export function gaMeasurementId(env: MeasurementEnv): string | null {
  return env.gaId?.trim() || null;
}

export function posthogConfig(env: MeasurementEnv): PosthogConfig | null {
  const posthogKey = env.posthogKey?.trim();
  if (!posthogKey) return null;
  return { posthogKey, posthogHost: env.posthogHost?.trim() || DEFAULT_POSTHOG_HOST };
}

export function gaConsent(analyticsAllowed: boolean): GaConsent {
  return {
    analytics_storage: analyticsAllowed ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
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
