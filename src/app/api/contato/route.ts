import { contact } from "../../../content/site.ts";
import { EMAIL, lerCorpo, limiteExcedido, originPermitida, resposta, texto, type Dados } from "../../../lib/requestGuard.ts";

const DESTINO = "contato@zentrabusiness.com.br";
const REMETENTE = "Site Zentra Business Data <noreply@zentrabusiness.com.br>";
const LIMITES = { nome: 120, email: 200, whatsapp: 40, perfil: 80, convenio: 80, interesse: 80, mensagem: 2000 } as const;
const ROTULOS = {
  nome: "Nome",
  email: "E-mail",
  whatsapp: "WhatsApp",
  perfil: "Perfil",
  convenio: "Convênio",
  interesse: "Interesse",
  mensagem: "Mensagem",
} as const;
const OBRIGATORIOS = ["nome", "email", "whatsapp", "perfil", "convenio", "interesse"] as const;

type Campo = keyof typeof LIMITES;
type Campos = Record<Campo, string>;

function opcoesDe(nome: string): readonly string[] {
  const campo = contact.fields.find((item) => item.name === nome);
  return campo && "options" in campo ? campo.options : [];
}

function escapar(valor: string): string {
  const trocas: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return valor.replace(/[&<>"']/g, (c) => trocas[c]);
}

function lerCampos(dados: Dados): Campos {
  const campos = Object.entries(LIMITES).map(([campo, limite]) => [campo, texto(dados[campo], limite)]);
  return Object.fromEntries(campos) as Campos;
}

function valido(campos: Campos): boolean {
  const digitos = campos.whatsapp.replace(/\D/g, "");
  return (
    OBRIGATORIOS.every((campo) => campos[campo]) &&
    EMAIL.test(campos.email) &&
    (digitos.length === 10 || digitos.length === 11) &&
    opcoesDe("perfil").includes(campos.perfil) &&
    opcoesDe("convenio").includes(campos.convenio) &&
    opcoesDe("interesse").includes(campos.interesse)
  );
}

function corpoDoEmail(campos: Campos): string {
  const linhas = (Object.keys(ROTULOS) as Campo[])
    .filter((campo) => campos[campo])
    .map((campo) => `<p><strong>${ROTULOS[campo]}:</strong> ${escapar(campos[campo]).replace(/\n/g, "<br>")}</p>`);
  return `<h2>Novo contato pelo site</h2>${linhas.join("")}`;
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

  const campos = lerCampos(dados ?? {});
  if (!valido(campos)) {
    return resposta(422, { erro: "Preencha nome, e-mail, WhatsApp com DDD e escolha seu perfil, o convênio e a solução." });
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    return resposta(503, { erro: "O envio está fora do ar agora. Escreva para contato@zentrabusiness.com.br." });
  }

  const envio = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMETENTE,
      to: [DESTINO],
      reply_to: campos.email,
      subject: `Contato pelo site: ${campos.perfil}`,
      html: corpoDoEmail(campos),
    }),
  });

  if (!envio.ok) {
    return resposta(502, { erro: "Não conseguimos enviar agora. Escreva para contato@zentrabusiness.com.br." });
  }

  return resposta(200, { ok: true });
}
