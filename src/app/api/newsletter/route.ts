import { EMAIL, lerCorpo, limiteExcedido, originPermitida, resposta, texto } from "../../../lib/requestGuard.ts";

export async function POST(request: Request): Promise<Response> {
  if (!originPermitida(request)) return resposta(403, { erro: "Origem não permitida." });
  if (limiteExcedido(request)) {
    return resposta(429, { erro: "Muitas tentativas. Aguarde alguns minutos e tente de novo." });
  }

  const dados = await lerCorpo(request);
  if (dados === undefined) {
    return resposta(400, { erro: "Não conseguimos ler o formulário. Tente de novo." });
  }

  if (texto(dados?.site, 200)) {
    return resposta(200, { ok: true });
  }

  const nome = texto(dados?.nome, 120);
  const email = texto(dados?.email, 200);
  if (!nome || !EMAIL.test(email)) {
    return resposta(422, { erro: "Preencha o nome e um e-mail válido." });
  }
  if (dados?.consentimento !== true) {
    return resposta(422, { erro: "Aceite receber os e-mails para assinar." });
  }

  const chave = process.env.RESEND_API_KEY;
  const lista = process.env.RESEND_AUDIENCE_ID;
  if (!chave || !lista) {
    return resposta(503, { erro: "A assinatura está fora do ar agora. Tente de novo mais tarde." });
  }

  const envio = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, first_name: nome, unsubscribed: false, segments: [{ id: lista }] }),
  });

  if (!envio.ok) {
    return resposta(502, { erro: "Não conseguimos cadastrar agora. Tente de novo mais tarde." });
  }

  return resposta(200, { ok: true });
}
