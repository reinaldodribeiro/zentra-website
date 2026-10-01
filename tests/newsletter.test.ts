import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/newsletter/route.ts";
import { clearRateLimits } from "../src/lib/requestGuard.ts";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.RESEND_API_KEY;
const originalAudienceId = process.env.RESEND_AUDIENCE_ID;

function restoreEnv(nome: string, value: string | undefined): void {
  if (value === undefined) delete process.env[nome];
  else process.env[nome] = value;
}

beforeEach(clearRateLimits);

afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreEnv("RESEND_API_KEY", originalApiKey);
  restoreEnv("RESEND_AUDIENCE_ID", originalAudienceId);
});

function buildRequest(body: unknown): Request {
  return new Request("http://localhost/api/newsletter", { method: "POST", body: JSON.stringify(body) });
}

const validPayload = { nome: "Ana", email: "ana@exemplo.com.br", consentimento: true };

test("e-mail inválido responde 422", async () => {
  const res = await POST(buildRequest({ ...validPayload, email: "sem-arroba" }));
  assert.equal(res.status, 422);
});

test("consentimento falso responde 422", async () => {
  const res = await POST(buildRequest({ ...validPayload, consentimento: false }));
  assert.equal(res.status, 422);
});

test("armadilha preenchida responde 200 sem chamar a rede", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response("{}");
  }) as typeof fetch;
  const res = await POST(buildRequest({ ...validPayload, site: "https://spam.example" }));
  assert.equal(res.status, 200);
  assert.equal(calls, 0);
});

test("válido sem chave ou sem lista responde 503", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
  assert.equal((await POST(buildRequest(validPayload))).status, 503);
  process.env.RESEND_API_KEY = "chave-de-teste";
  assert.equal((await POST(buildRequest(validPayload))).status, 503);
});

test("válido com chave cria o contato na Resend e responde 200", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  let call: { url: string; body: { email: string; first_name: string; segments: { id: string }[] } } | null = null;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    call = { url: String(url), body: JSON.parse(String(init?.body)) };
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(buildRequest(validPayload));
  assert.equal(res.status, 200);
  assert.equal(call!.url, "https://api.resend.com/contacts");
  assert.equal(call!.body.email, validPayload.email);
  assert.equal(call!.body.first_name, validPayload.nome);
  assert.deepEqual(call!.body.segments, [{ id: "lista-123" }]);
});

test("falha da Resend responde 502 e o sexto envio seguido responde 429", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  globalThis.fetch = (async () => new Response("{}", { status: 500 })) as typeof fetch;
  assert.equal((await POST(buildRequest(validPayload))).status, 502);
  for (let i = 0; i < 4; i += 1) await POST(buildRequest(validPayload));
  assert.equal((await POST(buildRequest(validPayload))).status, 429);
});

test("origem de outro site responde 403", async () => {
  const res = await POST(
    new Request("http://localhost/api/newsletter", {
      method: "POST",
      body: JSON.stringify(validPayload),
      headers: { origin: "https://outro.example" },
    }),
  );
  assert.equal(res.status, 403);
});
