import { recordLead } from "../../../lib/leads.ts";
import { parseReferralCode } from "../../../lib/referral.ts";
import { EMAIL, cleanText, isAllowedOrigin, isRateLimited, jsonResponse, readBody } from "../../../lib/requestGuard.ts";

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

  const name = cleanText(data?.nome, 120);
  const email = cleanText(data?.email, 200);
  if (!name || !EMAIL.test(email)) {
    return jsonResponse(422, { erro: "Preencha o nome e um e-mail válido." });
  }
  if (data?.consentimento !== true) {
    return jsonResponse(422, { erro: "Aceite receber os e-mails para assinar." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return jsonResponse(503, { erro: "A assinatura está fora do ar agora. Tente de novo mais tarde." });
  }

  const delivery = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, first_name: name, unsubscribed: false, segments: [{ id: audienceId }] }),
  });

  if (!delivery.ok) {
    return jsonResponse(502, { erro: "Não conseguimos cadastrar agora. Tente de novo mais tarde." });
  }

  await recordLead({ form: "newsletter", name, email, referral_code: parseReferralCode(data?.referral_code) });

  return jsonResponse(200, { ok: true });
}
