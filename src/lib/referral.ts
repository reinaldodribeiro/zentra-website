import { referralWhatsappNote } from "../content/site.ts";

const STORAGE_KEY = "zentra_ref";
const REFERRAL_CODE = /^[A-Z0-9]{4,10}$/;
const WHATSAPP_HOST = "wa.me";

export function parseReferralCode(value: unknown): string {
  return typeof value === "string" && REFERRAL_CODE.test(value) ? value : "";
}

export function captureReferralFromUrl(): void {
  try {
    const code = parseReferralCode(new URLSearchParams(window.location.search).get("ref"));
    if (code) window.sessionStorage.setItem(STORAGE_KEY, code);
  } catch {
    return;
  }
}

export function readReferral(): string | null {
  try {
    return parseReferralCode(window.sessionStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function referralField(): { referral_code?: string } {
  const code = readReferral();
  return code ? { referral_code: code } : {};
}

export function whatsappHrefWithReferral(href: string, code: string | null): string {
  if (!code) return href;

  try {
    const url = new URL(href);
    const text = url.searchParams.get("text") ?? "";
    if (url.hostname !== WHATSAPP_HOST || text.includes(code)) return href;
    url.searchParams.set("text", `${text} ${referralWhatsappNote.replace("{codigo}", code)}`.trim());
    return url.toString();
  } catch {
    return href;
  }
}

export function tagWhatsappLink(target: EventTarget | null): void {
  if (!(target instanceof Element)) return;
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return;
  const href = whatsappHrefWithReferral(anchor.href, readReferral());
  if (href !== anchor.href) anchor.href = href;
}
