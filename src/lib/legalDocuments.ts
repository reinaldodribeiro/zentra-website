import { legalSource } from "../content/site.ts";
import { isExternalHref } from "./externalLink.ts";

export type LegalDocumentKind = "terms-of-use" | "privacy-policy" | "cookie-policy";

export type LegalDocument = {
  title: string;
  version: string;
  effectiveAt: string;
  html: string;
};

type Fetcher = (input: string, init?: RequestInit & { next?: { revalidate: number } }) => Promise<Response>;

export const LEGAL_REVALIDATE_SECONDS = 3600;
const LEGAL_TIMEOUT_MS = 8000;

const systemHost = new URL(legalSource).host;

export function legalDocumentsUrl(): string {
  return (process.env.LEGAL_DOCUMENTS_URL || legalSource).replace(/\/+$/, "");
}

function hrefHost(href: string): string | null {
  try {
    return new URL(href.replace(/&amp;/g, "&")).host;
  } catch {
    return null;
  }
}

export function withoutSystemLinks(html: string): string {
  return html.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (anchor, href: string, text: string) =>
    hrefHost(href) === systemHost ? text : anchor,
  );
}

export function withExternalLinksInNewTab(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (anchor, attributes: string) => {
    const href = /\bhref="([^"]*)"/i.exec(attributes)?.[1];
    if (!href || !isExternalHref(href.replace(/&amp;/g, "&"))) return anchor;
    const rest = attributes.replace(/\s(target|rel)="[^"]*"/gi, "");
    return `<a${rest} target="_blank" rel="noopener noreferrer">`;
  });
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

export function parseLegalDocument(payload: unknown): LegalDocument | null {
  const data = (payload as { data?: Record<string, unknown> } | null)?.data;
  if (!data || typeof data !== "object") return null;

  const { title, version, effective_at: effectiveAt, html } = data;
  if (!isText(title) || !isText(version) || !isText(effectiveAt) || !isText(html)) return null;

  return { title, version, effectiveAt, html: withExternalLinksInNewTab(withoutSystemLinks(html)) };
}

export async function fetchLegalDocument(
  kind: LegalDocumentKind,
  fetcher: Fetcher = fetch,
): Promise<LegalDocument | null> {
  try {
    const response = await fetcher(`${legalDocumentsUrl()}/${kind}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: LEGAL_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(LEGAL_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    return parseLegalDocument(await response.json());
  } catch {
    return null;
  }
}
