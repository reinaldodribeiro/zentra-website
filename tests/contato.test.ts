import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/contato/route.ts";
import { clearRateLimits } from "../src/lib/requestGuard.ts";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.RESEND_API_KEY;

beforeEach(clearRateLimits);

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalApiKey;
});

function buildRequest(body: string, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/contato", { method: "POST", body, headers });
}

const validPayload = {
  nome: "Ana",
  email: "ana@promotora.com.br",
  whatsapp: "(11) 9 8888-7777",
  area: "Advocacia previdenciária",
};

test("corpo ilegível responde 400", async () => {
  const res = await POST(buildRequest("não é json"));
  assert.equal(res.status, 400);
});

test("campos vazios respondem 422 com a mensagem", async () => {
  const res = await POST(buildRequest(JSON.stringify({ nome: "", email: "" })));
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { erro: "Preencha nome, e-mail, WhatsApp com DDD e escolha sua área de atuação." });
});

test("site preenchido responde 200 sem chamar a rede", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response("{}");
  }) as typeof fetch;
  const res = await POST(buildRequest(JSON.stringify({ ...validPayload, site: "https://spam.example" })));
  assert.equal(res.status, 200);
  assert.equal(calls, 0);
});

test("válido sem RESEND_API_KEY responde 503 citando o e-mail de contato", async () => {
  delete process.env.RESEND_API_KEY;
  const res = await POST(buildRequest(JSON.stringify(validPayload)));
  assert.equal(res.status, 503);
  const { erro } = (await res.json()) as { erro: string };
  assert.ok(erro.includes("contato@zentrabusiness.com.br"));
});

test("válido com a chave envia reply_to igual ao e-mail enviado", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let sent: { reply_to: string } | null = null;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(buildRequest(JSON.stringify(validPayload)));
  assert.equal(res.status, 200);
  assert.equal(sent!.reply_to, validPayload.email);
});

test("whatsapp com poucos dígitos, ou área fora da lista respondem 422", async () => {
  for (const invalid of [{ whatsapp: "(11) 8888" }, { area: "Hacker" }, { area: "" }, { area: undefined }]) {
    const res = await POST(buildRequest(JSON.stringify({ ...validPayload, ...invalid })));
    assert.equal(res.status, 422);
  }
});

test("o assunto do e-mail leva a área e o whatsapp aceita onze dígitos com máscara", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let sent: { subject: string } | null = null;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(buildRequest(JSON.stringify(validPayload)));
  assert.equal(res.status, 200);
  assert.equal(sent!.subject, "Contato pelo site: Advocacia previdenciária");
});

test("origem de outro site responde 403 e a do próprio site passa", async () => {
  delete process.env.RESEND_API_KEY;
  const outside = await POST(buildRequest(JSON.stringify(validPayload), { origin: "https://outro.example" }));
  assert.equal(outside.status, 403);
  const inside = await POST(buildRequest(JSON.stringify(validPayload), { origin: "https://data.zentrabusiness.com.br" }));
  assert.equal(inside.status, 503);
});

test("o sexto envio do mesmo endereço em dez minutos responde 429", async () => {
  delete process.env.RESEND_API_KEY;
  const headers = { "x-forwarded-for": "203.0.113.9, 10.0.0.1" };
  for (let i = 0; i < 5; i += 1) {
    const res = await POST(buildRequest(JSON.stringify(validPayload), headers));
    assert.equal(res.status, 503);
  }
  const res = await POST(buildRequest(JSON.stringify(validPayload), headers));
  assert.equal(res.status, 429);
  const { erro } = (await res.json()) as { erro: string };
  assert.ok(erro.includes("tentativas"));
  const other = await POST(buildRequest(JSON.stringify(validPayload), { "x-forwarded-for": "203.0.113.10" }));
  assert.equal(other.status, 503);
});

test("área da lista é aceita e entra no e-mail, e os campos antigos não existem mais", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  let html = "";
  globalThis.fetch = (async (_url: unknown, init: { body: string }) => {
    html = JSON.parse(init.body).html;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(buildRequest(JSON.stringify({ ...validPayload, area: "Recuperação de crédito e cobrança", perfil: "x", convenio: "y", interesse: "z" })));
  assert.equal(res.status, 200);
  assert.match(html, /Recuperação de crédito e cobrança/);
  assert.doesNotMatch(html, /Perfil|Convênio|Interesse/);
});
