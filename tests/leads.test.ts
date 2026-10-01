import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as contato } from "../src/app/api/contato/route.ts";
import { POST as demonstracao } from "../src/app/api/demonstracao/route.ts";
import { POST as newsletter } from "../src/app/api/newsletter/route.ts";
import { clearRateLimits } from "../src/lib/requestGuard.ts";

const LEADS_URL = "https://leads.example.test/api/leads";
const originalFetch = globalThis.fetch;
const names = ["RESEND_API_KEY", "RESEND_AUDIENCE_ID", "ZENTRA_SITE_LEAD_TOKEN", "LEADS_URL"] as const;
const originalEnv = Object.fromEntries(names.map((name) => [name, process.env[name]]));

type Call = { url: string; headers: Record<string, string>; body: Record<string, string> };
type Route = (request: Request) => Promise<Response>;

const routes: { name: string; post: Route; path: string; payload: object; lead: object }[] = [
  {
    name: "contato",
    post: contato,
    path: "contato",
    payload: { nome: "Ana", email: "ana@promotora.com.br", whatsapp: "(11) 9 8888-7777", area: "Advocacia previdenciária", mensagem: "Oi" },
    lead: { form: "contact", name: "Ana", email: "ana@promotora.com.br", whatsapp: "11988887777", area: "Advocacia previdenciária", message: "Oi" },
  },
  {
    name: "demonstracao",
    post: demonstracao,
    path: "demonstracao",
    payload: { nome: "Ana", whatsapp: "(11) 9 8888-7777", origem: "cartao", pagina: "/" },
    lead: { form: "demo", name: "Ana", whatsapp: "11988887777", origin: "cartao", page: "/" },
  },
  {
    name: "newsletter",
    post: newsletter,
    path: "newsletter",
    payload: { nome: "Ana", email: "ana@exemplo.com.br", consentimento: true },
    lead: { form: "newsletter", name: "Ana", email: "ana@exemplo.com.br" },
  },
];

beforeEach(() => {
  clearRateLimits();
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  process.env.ZENTRA_SITE_LEAD_TOKEN = "token-de-teste";
  process.env.LEADS_URL = `${LEADS_URL}/`;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const name of names) {
    const value = originalEnv[name];
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function stubFetch(resend: number, leads: "ok" | "500" | "throw"): Call[] {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    if (String(url) === LEADS_URL) {
      calls.push({ url: String(url), headers: init?.headers as Record<string, string>, body: JSON.parse(String(init?.body)) });
      if (leads === "throw") throw new Error("rede");
      return new Response("{}", { status: leads === "500" ? 500 : 201 });
    }
    return new Response("{}", { status: resend });
  }) as typeof fetch;
  return calls;
}

function buildRequest(path: string, payload: object): Request {
  return new Request(`http://localhost/api/${path}`, { method: "POST", body: JSON.stringify(payload) });
}

for (const route of routes) {
  test(`${route.name}: com o e-mail ok grava o contato com o token e o corpo certo`, async () => {
    const calls = stubFetch(200, "ok");
    const res = await route.post(buildRequest(route.path, route.payload));
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].headers["X-Zentra-Site-Token"], "token-de-teste");
    assert.equal(calls[0].headers["Content-Type"], "application/json");
    assert.deepEqual(calls[0].body, route.lead);
  });

  test(`${route.name}: Resend falhando responde 502 sem gravar contato`, async () => {
    const calls = stubFetch(500, "ok");
    assert.equal((await route.post(buildRequest(route.path, route.payload))).status, 502);
    assert.equal(calls.length, 0);
  });

  test(`${route.name}: sem chave responde 503 sem gravar contato`, async () => {
    const calls = stubFetch(200, "ok");
    delete process.env.RESEND_API_KEY;
    assert.equal((await route.post(buildRequest(route.path, route.payload))).status, 503);
    assert.equal(calls.length, 0);
  });

  test(`${route.name}: o sistema respondendo 500 ou lançando não muda a resposta`, async () => {
    for (const leads of ["500", "throw"] as const) {
      clearRateLimits();
      stubFetch(200, leads);
      const res = await route.post(buildRequest(route.path, route.payload));
      assert.equal(res.status, 200);
      assert.deepEqual(await res.json(), { ok: true });
    }
  });

  test(`${route.name}: sem ZENTRA_SITE_LEAD_TOKEN nada é chamado no sistema`, async () => {
    const calls = stubFetch(200, "ok");
    delete process.env.ZENTRA_SITE_LEAD_TOKEN;
    assert.equal((await route.post(buildRequest(route.path, route.payload))).status, 200);
    assert.equal(calls.length, 0);
  });
}
