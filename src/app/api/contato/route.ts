import { contact } from "../../../content/site.ts";
import { recordLead } from "../../../lib/leads.ts";
import { parseReferralCode } from "../../../lib/referral.ts";
import { EMAIL, cleanText, escapeHtml, isAllowedOrigin, isRateLimited, jsonResponse, readBody, type RequestData } from "../../../lib/requestGuard.ts";

const RECIPIENT = "contato@zentrabusiness.com.br";
const SENDER = "Site Zentra Business Data <noreply@zentrabusiness.com.br>";
const MAX_LENGTHS = { nome: 120, email: 200, whatsapp: 40, area: 80, mensagem: 2000 } as const;
const LABELS = {
  nome: "Nome",
  email: "E-mail",
  whatsapp: "WhatsApp",
  area: "Área de atuação",
  mensagem: "Mensagem",
} as const;
const REQUIRED_FIELDS = ["nome", "email", "whatsapp", "area"] as const;

type FieldName = keyof typeof MAX_LENGTHS;
type ContactFields = Record<FieldName, string>;

function optionsOf(name: string): readonly string[] {
  const field = contact.fields.find((item) => item.name === name);
  return field && "options" in field ? field.options : [];
}

function readFields(data: RequestData): ContactFields {
  const entries = Object.entries(MAX_LENGTHS).map(([field, maxLength]) => [field, cleanText(data[field], maxLength)]);
  return Object.fromEntries(entries) as ContactFields;
}

function isValid(fields: ContactFields): boolean {
  const digits = fields.whatsapp.replace(/\D/g, "");
  return (
    REQUIRED_FIELDS.every((field) => fields[field]) &&
    EMAIL.test(fields.email) &&
    (digits.length === 10 || digits.length === 11) &&
    optionsOf("area").includes(fields.area)
  );
}

function buildEmailBody(fields: ContactFields): string {
  const lines = (Object.keys(LABELS) as FieldName[])
    .filter((field) => fields[field])
    .map((field) => `<p><strong>${LABELS[field]}:</strong> ${escapeHtml(fields[field]).replace(/\n/g, "<br>")}</p>`);
  return `<h2>Novo contato pelo site</h2>${lines.join("")}`;
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

  const fields = readFields(data ?? {});
  if (!isValid(fields)) {
    return jsonResponse(422, { erro: "Preencha nome, e-mail, WhatsApp com DDD e escolha sua área de atuação." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, { erro: "O envio está fora do ar agora. Escreva para contato@zentrabusiness.com.br." });
  }

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: fields.email,
      subject: `Contato pelo site: ${fields.area}`,
      html: buildEmailBody(fields),
    }),
  });

  if (!delivery.ok) {
    return jsonResponse(502, { erro: "Não conseguimos enviar agora. Escreva para contato@zentrabusiness.com.br." });
  }

  await recordLead({
    form: "contact",
    name: fields.nome,
    email: fields.email,
    whatsapp: fields.whatsapp,
    area: fields.area,
    message: fields.mensagem,
    referral_code: parseReferralCode(data?.referral_code),
  });

  return jsonResponse(200, { ok: true });
}
