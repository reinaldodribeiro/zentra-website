import { firm } from "../../../content/site.ts";
import { validPhone } from "../../../lib/phone.ts";
import { cleanText, escapeHtml, isAllowedOrigin, isRateLimited, jsonResponse, readBody } from "../../../lib/requestGuard.ts";

const SENDER = "Site Zentra Business Data <noreply@zentrabusiness.com.br>";
const ORIGINS = ["cartao", "modal"] as const;

type DemoOrigin = (typeof ORIGINS)[number];

type DemoRequest = { name: string; whatsapp: string; origin: DemoOrigin; page: string };

function readDemoRequest(data: Record<string, unknown>): DemoRequest | null {
  const name = cleanText(data.nome, 120);
  const whatsapp = cleanText(data.whatsapp, 40);
  const origin = ORIGINS.find((item) => item === data.origem);
  if (name.length < 2 || !validPhone(whatsapp) || !origin) return null;
  return { name, whatsapp, origin, page: cleanText(data.pagina, 200) };
}

function buildEmailBody({ name, whatsapp, origin, page }: DemoRequest): string {
  const lines = [
    ["Nome", name],
    ["WhatsApp", whatsapp],
    ["Origem", origin],
    ["Página", page],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`);
  return `<h2>Pedido de demonstração pelo site</h2>${lines.join("")}`;
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) return jsonResponse(403, { erro: "Origem não permitida." });
  if (isRateLimited(request)) {
    return jsonResponse(429, { erro: "Muitas tentativas. Aguarde alguns minutos e tente de novo." });
  }

  const data = await readBody(request);
  if (data === undefined) {
    return jsonResponse(400, { erro: "Não conseguimos ler o formulário. Tente de novo." });
  }

  if (cleanText(data?.site, 200)) {
    return jsonResponse(200, { ok: true });
  }

  const demoRequest = readDemoRequest(data ?? {});
  if (!demoRequest) {
    return jsonResponse(422, { erro: "Preencha o nome e o WhatsApp com DDD." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, { erro: `O envio está fora do ar agora. Escreva para ${firm.email}.` });
  }

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: [firm.email],
      subject: `Pedido de demonstração: ${demoRequest.origin}`,
      html: buildEmailBody(demoRequest),
    }),
  });

  if (!delivery.ok) {
    return jsonResponse(502, { erro: `Não conseguimos enviar agora. Escreva para ${firm.email}.` });
  }

  return jsonResponse(200, { ok: true });
}
