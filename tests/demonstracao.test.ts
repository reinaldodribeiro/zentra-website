import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/demonstracao/route.ts";
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
  return new Request("http://localhost/api/demonstracao", { method: "POST", body: corpo, headers: cabecalhos });
}

const valido = { nome: "Ana", whatsapp: "(11) 9 8888-7777", origem: "cartao", pagina: "/" };

function capturar(): { corpo: () => { subject: string; html: string; to: string[] } } {
  let enviado = "";
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    enviado = String(init?.body);
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return { corpo: () => JSON.parse(enviado) };
}

test("corpo ilegível responde 400", async () => {
  assert.equal((await POST(pedido("não é json"))).status, 400);
});

test("campos vazios respondem 422 com a mensagem", async () => {
  const res = await POST(pedido(JSON.stringify({ nome: "", whatsapp: "" })));
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { erro: "Preencha o nome e o WhatsApp com DDD." });
});

test("nome curto, whatsapp curto e origem fora da lista respondem 422", async () => {
  for (const ruim of [{ nome: "A" }, { whatsapp: "(11) 8888" }, { origem: "balao" }, { origem: undefined }]) {
    const res = await POST(pedido(JSON.stringify({ ...valido, ...ruim })));
    assert.equal(res.status, 422);
  }
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

test("o e-mail leva a origem no assunto e nome, whatsapp, origem e página no corpo", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const envio = capturar();
  const res = await POST(pedido(JSON.stringify({ ...valido, origem: "modal", pagina: "/advocacia" })));
  assert.equal(res.status, 200);
  const { subject, html, to } = envio.corpo();
  assert.equal(subject, "Pedido de demonstração: modal");
  assert.deepEqual(to, ["contato@zentrabusiness.com.br"]);
  for (const trecho of ["Ana", "(11) 9 8888-7777", "modal", "/advocacia"]) assert.ok(html.includes(trecho), trecho);
});

test("o nome entra escapado e a página é cortada em 200 caracteres", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const envio = capturar();
  await POST(pedido(JSON.stringify({ ...valido, nome: "<b>Ana</b>", pagina: "x".repeat(300) })));
  const { html } = envio.corpo();
  assert.ok(html.includes("&lt;b&gt;Ana"));
  assert.ok(!html.includes("x".repeat(201)));
});

test("falha da Resend responde 502", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  globalThis.fetch = (async () => new Response("{}", { status: 500 })) as typeof fetch;
  assert.equal((await POST(pedido(JSON.stringify(valido)))).status, 502);
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
  const cabecalhos = { "x-forwarded-for": "203.0.113.9" };
  for (let i = 0; i < 5; i += 1) {
    assert.equal((await POST(pedido(JSON.stringify(valido), cabecalhos))).status, 503);
  }
  assert.equal((await POST(pedido(JSON.stringify(valido), cabecalhos))).status, 429);
});
