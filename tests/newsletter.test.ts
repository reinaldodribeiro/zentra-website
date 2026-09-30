import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../src/app/api/newsletter/route.ts";
import { limparLimites } from "../src/lib/requestGuard.ts";

const fetchOriginal = globalThis.fetch;
const chaveOriginal = process.env.RESEND_API_KEY;
const listaOriginal = process.env.RESEND_AUDIENCE_ID;

function restaurar(nome: string, valor: string | undefined): void {
  if (valor === undefined) delete process.env[nome];
  else process.env[nome] = valor;
}

beforeEach(limparLimites);

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  restaurar("RESEND_API_KEY", chaveOriginal);
  restaurar("RESEND_AUDIENCE_ID", listaOriginal);
});

function pedido(corpo: unknown): Request {
  return new Request("http://localhost/api/newsletter", { method: "POST", body: JSON.stringify(corpo) });
}

const valido = { nome: "Ana", email: "ana@exemplo.com.br", consentimento: true };

test("e-mail inválido responde 422", async () => {
  const res = await POST(pedido({ ...valido, email: "sem-arroba" }));
  assert.equal(res.status, 422);
});

test("consentimento falso responde 422", async () => {
  const res = await POST(pedido({ ...valido, consentimento: false }));
  assert.equal(res.status, 422);
});

test("armadilha preenchida responde 200 sem chamar a rede", async () => {
  let chamadas = 0;
  globalThis.fetch = (async () => {
    chamadas += 1;
    return new Response("{}");
  }) as typeof fetch;
  const res = await POST(pedido({ ...valido, site: "https://spam.example" }));
  assert.equal(res.status, 200);
  assert.equal(chamadas, 0);
});

test("válido sem chave ou sem lista responde 503", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
  assert.equal((await POST(pedido(valido))).status, 503);
  process.env.RESEND_API_KEY = "chave-de-teste";
  assert.equal((await POST(pedido(valido))).status, 503);
});

test("válido com chave cria o contato na Resend e responde 200", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  let chamada: { url: string; corpo: { email: string; first_name: string; segments: { id: string }[] } } | null = null;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    chamada = { url: String(url), corpo: JSON.parse(String(init?.body)) };
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await POST(pedido(valido));
  assert.equal(res.status, 200);
  assert.equal(chamada!.url, "https://api.resend.com/contacts");
  assert.equal(chamada!.corpo.email, valido.email);
  assert.equal(chamada!.corpo.first_name, valido.nome);
  assert.deepEqual(chamada!.corpo.segments, [{ id: "lista-123" }]);
});

test("falha da Resend responde 502 e o sexto envio seguido responde 429", async () => {
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  globalThis.fetch = (async () => new Response("{}", { status: 500 })) as typeof fetch;
  assert.equal((await POST(pedido(valido))).status, 502);
  for (let i = 0; i < 4; i += 1) await POST(pedido(valido));
  assert.equal((await POST(pedido(valido))).status, 429);
});

test("origem de outro site responde 403", async () => {
  const res = await POST(
    new Request("http://localhost/api/newsletter", {
      method: "POST",
      body: JSON.stringify(valido),
      headers: { origin: "https://outro.example" },
    }),
  );
  assert.equal(res.status, 403);
});
