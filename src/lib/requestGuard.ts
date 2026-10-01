import { SITE_URL } from "../content/site.ts";

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const submissions = new Map<string, number[]>();

function allowedOrigins(): string[] {
  if (process.env.NODE_ENV === "production") return [SITE_URL];
  return [SITE_URL, "http://localhost:3000", "http://127.0.0.1:3000"];
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  return allowedOrigins().includes(origin);
}

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "desconhecido";
}

export function isRateLimited(request: Request, now = Date.now()): boolean {
  const address = clientAddress(request);
  const recent = (submissions.get(address) ?? []).filter((moment) => now - moment < WINDOW_MS);
  if (recent.length >= LIMIT) {
    submissions.set(address, recent);
    return true;
  }
  submissions.set(address, [...recent, now]);
  return false;
}

export function clearRateLimits(): void {
  submissions.clear();
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type RequestData = Record<string, unknown>;

export function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function jsonResponse(status: number, body: { ok: true } | { erro: string }): Response {
  return Response.json(body, { status });
}

export async function readBody(request: Request): Promise<RequestData | null | undefined> {
  try {
    return (await request.json()) as RequestData | null;
  } catch {
    return undefined;
  }
}

export function escapeHtml(value: string): string {
  const replacements: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, (char) => replacements[char]);
}
