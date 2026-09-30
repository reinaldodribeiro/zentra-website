import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST } from "../src/app/api/contato/route.ts";

const fetchOriginal = globalThis.fetch;
const chaveOriginal = process.env.RESEND_API_KEY;

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  if (chaveOriginal === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = chaveOriginal;
});

function pedido(corpo: string): Request {
  return new Request("http://localhost/api/contato", { method: "POST", body: corpo });
}

const valido = { nome: "Ana", empresa: "Promotora Sul", email: "ana@promotora.com.br" };

test("corpo ilegível responde 400", async () => {
  const res = await POST(pedido("não é json"));
  assert.equal(res.status, 400);
});

test("campos vazios respondem 422 com a mensagem", async () => {
  const res = await POST(pedido(JSON.stringify({ nome: "", empresa: "", email: "" })));
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { erro: "Preencha nome, empresa e um e-mail válido." });
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
