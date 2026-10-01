import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/demonstracao/route.ts";
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
  return new Request("http://localhost/api/demonstracao", { method: "POST", body: body, headers: headers });
}

const validPayload = { nome: "Ana", whatsapp: "(11) 9 8888-7777", origem: "cartao", pagina: "/" };

function captureRequest(): { body: () => { subject: string; html: string; to: string[] } } {
  let sent = "";
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = String(init?.body);
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return { body: () => JSON.parse(sent) };
}

test("corpo ilegível responde 400", async () => {
  assert.equal((await POST(buildRequest("não é json"))).status, 400);
});

test("campos vazios respondem 422 com a mensagem", async () => {
  const res = await POST(buildRequest(JSON.stringify({ nome: "", whatsapp: "" })));
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { erro: "Preencha o nome e o WhatsApp com DDD." });
});

test("nome curto, whatsapp curto e origem fora da lista respondem 422", async () => {
  for (const invalid of [{ nome: "A" }, { whatsapp: "(11) 8888" }, { origem: "balao" }, { origem: undefined }]) {
    const res = await POST(buildRequest(JSON.stringify({ ...validPayload, ...invalid })));
    assert.equal(res.status, 422);
  }
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

test("o e-mail leva a origem no assunto e nome, whatsapp, origem e página no corpo", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const capture = captureRequest();
  const res = await POST(buildRequest(JSON.stringify({ ...validPayload, origem: "modal", pagina: "/advocacia" })));
  assert.equal(res.status, 200);
  const { subject, html, to } = capture.body();
  assert.equal(subject, "Pedido de demonstração: modal");
  assert.deepEqual(to, ["contato@zentrabusiness.com.br"]);
  for (const snippet of ["Ana", "(11) 9 8888-7777", "modal", "/advocacia"]) assert.ok(html.includes(snippet), snippet);
});

test("o nome entra escapado e a página é cortada em 200 caracteres", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  const capture = captureRequest();
  await POST(buildRequest(JSON.stringify({ ...validPayload, nome: "<b>Ana</b>", pagina: "x".repeat(300) })));
  const { html } = capture.body();
  assert.ok(html.includes("&lt;b&gt;Ana"));
  assert.ok(!html.includes("x".repeat(201)));
});

test("falha da Resend responde 502", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  globalThis.fetch = (async () => new Response("{}", { status: 500 })) as typeof fetch;
  assert.equal((await POST(buildRequest(JSON.stringify(validPayload)))).status, 502);
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
  const headers = { "x-forwarded-for": "203.0.113.9" };
  for (let i = 0; i < 5; i += 1) {
    assert.equal((await POST(buildRequest(JSON.stringify(validPayload), headers))).status, 503);
  }
  assert.equal((await POST(buildRequest(JSON.stringify(validPayload), headers))).status, 429);
});
