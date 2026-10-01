import { SITE_URL } from "../content/site.ts";

const JANELA_MS = 10 * 60 * 1000;
const LIMITE = 5;
const envios = new Map<string, number[]>();

function origensPermitidas(): string[] {
  if (process.env.NODE_ENV === "production") return [SITE_URL];
  return [SITE_URL, "http://localhost:3000", "http://127.0.0.1:3000"];
}

export function originPermitida(request: Request): boolean {
  const origem = request.headers.get("origin");
  if (!origem) return process.env.NODE_ENV !== "production";
  return origensPermitidas().includes(origem);
}

function enderecoDe(request: Request): string {
  const encaminhado = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return encaminhado || request.headers.get("x-real-ip") || "desconhecido";
}

export function limiteExcedido(request: Request, agora = Date.now()): boolean {
  const endereco = enderecoDe(request);
  const recentes = (envios.get(endereco) ?? []).filter((instante) => agora - instante < JANELA_MS);
  if (recentes.length >= LIMITE) {
    envios.set(endereco, recentes);
    return true;
  }
  envios.set(endereco, [...recentes, agora]);
  return false;
}

export function limparLimites(): void {
  envios.clear();
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Dados = Record<string, unknown>;

export function texto(valor: unknown, limite: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, limite) : "";
}

export function resposta(status: number, corpo: { ok: true } | { erro: string }): Response {
  return Response.json(corpo, { status });
}

export async function lerCorpo(request: Request): Promise<Dados | null | undefined> {
  try {
    return (await request.json()) as Dados | null;
  } catch {
    return undefined;
  }
}

export function escapar(valor: string): string {
  const trocas: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return valor.replace(/[&<>"']/g, (c) => trocas[c]);
}
