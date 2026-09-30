import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/contato/route.ts";
import { limparLimites } from "../src/lib/requestGuard.ts";

const fetchOriginal = globalThis.fetch;
const chaveOriginal = process.env.RESEND_API_KEY;

beforeEach(limparLimites);

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  if (chaveOriginal === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = chaveOriginal;
});

function pedido(corpo: string, cabecalhos: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/contato", { method: "POST", body: corpo, headers: cabecalhos });
}

const valido = {
  nome: "Ana",
  email: "ana@promotora.com.br",
  whatsapp: "(11) 9 8888-7777",
  perfil: "Promotora de crédito",
  convenio: "INSS",
  interesse: "Consulta em lote",
};

test("corpo ilegível responde 400", async () => {
  const res = await POST(pedido("não é json"));
  assert.equal(res.status, 400);
});

test("campos vazios respondem 422 com a mensagem", async () => {
  const res = await POST(pedido(JSON.stringify({ nome: "", email: "" })));
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { erro: "Preencha nome, e-mail, WhatsApp com DDD e escolha seu perfil, o convênio e a solução." });
});

test("site preenchido responde 200 sem chamar a rede", async () => {
  let chamadas = 0;
  globalThis.fetch = (async () => {
    chamadas += 1;
    return new Response("{}");
  }) as typeof fetch;
  const res = await POST(pedido(JSON.stringify({ ...valido, site: "https://spam.example" })));
  assert.equal(res.status, 200);
  assert.equal(chamadas, 0);
});

test("válido sem RESEND_API_KEY responde 503 citando o e-mail de contato", async () => {
  delete process.env.RESEND_API_KEY;
  const res = await POST(pedido(JSON.stringify(valido)));
  assert.equal(res.status, 503);
  const { erro } = (await res.json()) as { erro: string };
  assert.ok(erro.includes("contato@zentrabusiness.com.br"));
});

test("válido com a chave envia reply_to igual ao e-mail enviado", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let enviado: { reply_to: string } | null = null;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    enviado = JSON.parse(String(init?.body));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(pedido(JSON.stringify(valido)));
  assert.equal(res.status, 200);
  assert.equal(enviado!.reply_to, valido.email);
});

test("whatsapp com poucos dígitos, perfil, convênio ou interesse fora da lista respondem 422", async () => {
  for (const ruim of [{ whatsapp: "(11) 8888" }, { perfil: "Hacker" }, { convenio: "Qualquer" }, { convenio: "" }, { interesse: "Outra coisa" }]) {
    const res = await POST(pedido(JSON.stringify({ ...valido, ...ruim })));
    assert.equal(res.status, 422);
  }
});

test("o assunto do e-mail leva o perfil e o whatsapp aceita onze dígitos com máscara", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let enviado: { subject: string } | null = null;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    enviado = JSON.parse(String(init?.body));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(pedido(JSON.stringify(valido)));
  assert.equal(res.status, 200);
  assert.equal(enviado!.subject, "Contato pelo site: Promotora de crédito");
});

test("origem de outro site responde 403 e a do próprio site passa", async () => {
  delete process.env.RESEND_API_KEY;
  const fora = await POST(pedido(JSON.stringify(valido), { origin: "https://outro.example" }));
  assert.equal(fora.status, 403);
  const dentro = await POST(pedido(JSON.stringify(valido), { origin: "https://data.zentrabusiness.com.br" }));
  assert.equal(dentro.status, 503);
});

test("o sexto envio do mesmo endereço em dez minutos responde 429", async () => {
  delete process.env.RESEND_API_KEY;
  const cabecalhos = { "x-forwarded-for": "203.0.113.9, 10.0.0.1" };
  for (let i = 0; i < 5; i += 1) {
    const res = await POST(pedido(JSON.stringify(valido), cabecalhos));
    assert.equal(res.status, 503);
  }
  const res = await POST(pedido(JSON.stringify(valido), cabecalhos));
  assert.equal(res.status, 429);
  const { erro } = (await res.json()) as { erro: string };
  assert.ok(erro.includes("tentativas"));
  const outro = await POST(pedido(JSON.stringify(valido), { "x-forwarded-for": "203.0.113.10" }));
  assert.equal(outro.status, 503);
});

test("convênio da lista é aceito e entra no e-mail", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let html = "";
  globalThis.fetch = (async (_url: unknown, init: { body: string }) => {
    html = JSON.parse(init.body).html;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(pedido(JSON.stringify({ ...valido, convenio: "SIAPE (servidor federal)" })));
  assert.equal(res.status, 200);
  assert.match(html, /SIAPE \(servidor federal\)/);
});
