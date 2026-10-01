import { firm } from "../../../content/site.ts";
import { validPhone } from "../../../lib/phone.ts";
import { escapar, lerCorpo, limiteExcedido, originPermitida, resposta, texto } from "../../../lib/requestGuard.ts";

const REMETENTE = "Site Zentra Business Data <noreply@zentrabusiness.com.br>";
const ORIGENS = ["cartao", "modal"] as const;

type Origem = (typeof ORIGENS)[number];

type Pedido = { nome: string; whatsapp: string; origem: Origem; pagina: string };

function lerPedido(dados: Record<string, unknown>): Pedido | null {
  const nome = texto(dados.nome, 120);
  const whatsapp = texto(dados.whatsapp, 40);
  const origem = ORIGENS.find((item) => item === dados.origem);
  if (nome.length < 2 || !validPhone(whatsapp) || !origem) return null;
  return { nome, whatsapp, origem, pagina: texto(dados.pagina, 200) };
}

function corpoDoEmail({ nome, whatsapp, origem, pagina }: Pedido): string {
  const linhas = [
    ["Nome", nome],
    ["WhatsApp", whatsapp],
    ["Origem", origem],
    ["Página", pagina],
  ]
    .filter(([, valor]) => valor)
    .map(([rotulo, valor]) => `<p><strong>${rotulo}:</strong> ${escapar(valor)}</p>`);
  return `<h2>Pedido de demonstração pelo site</h2>${linhas.join("")}`;
}

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

  const pedido = lerPedido(dados ?? {});
  if (!pedido) {
    return resposta(422, { erro: "Preencha o nome e o WhatsApp com DDD." });
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    return resposta(503, { erro: `O envio está fora do ar agora. Escreva para ${firm.email}.` });
  }

  const envio = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMETENTE,
      to: [firm.email],
      subject: `Pedido de demonstração: ${pedido.origem}`,
      html: corpoDoEmail(pedido),
    }),
  });

  if (!envio.ok) {
    return resposta(502, { erro: `Não conseguimos enviar agora. Escreva para ${firm.email}.` });
  }

  return resposta(200, { ok: true });
}
