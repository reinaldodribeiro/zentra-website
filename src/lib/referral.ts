const STORAGE_KEY = "zentra_ref";
const REFERRAL_CODE = /^[A-Z0-9]{4,10}$/;

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
