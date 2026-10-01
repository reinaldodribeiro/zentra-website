const DEFAULT_LEADS_URL = "https://app-data.zentrabusiness.com.br/api/leads";
const LEADS_TIMEOUT_MS = 4000;

export type LeadPayload = {
  form: "contact" | "demo" | "newsletter";
  name: string;
  origin?: string;
  email?: string;
  whatsapp?: string;
  area?: string;
  message?: string;
  page?: string;
};

export function leadsUrl(): string {
  return (process.env.LEADS_URL || DEFAULT_LEADS_URL).replace(/\/+$/, "");
}

function withoutEmpty(payload: LeadPayload): Record<string, string> {
  const entries = Object.entries(payload).filter(([, value]) => value);
  const body = Object.fromEntries(entries) as Record<string, string>;
  if (body.whatsapp) body.whatsapp = body.whatsapp.replace(/\D/g, "");
  return body;
}

export async function recordLead(payload: LeadPayload): Promise<boolean> {
  const token = process.env.ZENTRA_SITE_LEAD_TOKEN;
  const url = leadsUrl();
  if (!token || !url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Zentra-Site-Token": token },
      body: JSON.stringify(withoutEmpty(payload)),
      signal: AbortSignal.timeout(LEADS_TIMEOUT_MS),
    });
    return response.ok;
  } catch {
    return false;
  }
}
