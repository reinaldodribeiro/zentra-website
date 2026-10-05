import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as contato } from "../src/app/api/contato/route.ts";
import { POST as demonstracao } from "../src/app/api/demonstracao/route.ts";
import { POST as newsletter } from "../src/app/api/newsletter/route.ts";
import { captureReferralFromUrl, readReferral, referralField } from "../src/lib/referral.ts";
import { clearRateLimits } from "../src/lib/requestGuard.ts";

const LEADS_URL = "https://leads.example.test/api/leads";
const originalFetch = globalThis.fetch;
const globals = globalThis as Record<string, unknown>;
const names = ["RESEND_API_KEY", "RESEND_AUDIENCE_ID", "ZENTRA_SITE_LEAD_TOKEN", "LEADS_URL"] as const;
const originalEnv = Object.fromEntries(names.map((name) => [name, process.env[name]]));

const routes = [
  {
    name: "contato",
    post: contato,
    payload: { nome: "Ana", email: "ana@promotora.com.br", whatsapp: "(11) 9 8888-7777", area: "Advocacia previdenciária", mensagem: "Oi" },
  },
  { name: "demonstracao", post: demonstracao, payload: { nome: "Ana", whatsapp: "(11) 9 8888-7777", origem: "cartao", pagina: "/" } },
  { name: "newsletter", post: newsletter, payload: { nome: "Ana", email: "ana@exemplo.com.br", consentimento: true } },
];

function installBrowser(search: string): Map<string, string> {
  const store = new Map<string, string>();
  globals.window = {
    location: { search },
    sessionStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    },
  };
  return store;
}

beforeEach(() => {
  clearRateLimits();
  process.env.RESEND_API_KEY = "chave-de-teste";
  process.env.RESEND_AUDIENCE_ID = "lista-123";
  process.env.ZENTRA_SITE_LEAD_TOKEN = "token-de-teste";
  process.env.LEADS_URL = LEADS_URL;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete globals.window;
  for (const name of names) {
    const value = originalEnv[name];
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function captureLeadBodies(): Record<string, string>[] {
  const bodies: Record<string, string>[] = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    if (String(url) === LEADS_URL) bodies.push(JSON.parse(String(init?.body)));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return bodies;
}

function buildRequest(name: string, payload: object): Request {
  return new Request(`http://localhost/api/${name}`, { method: "POST", body: JSON.stringify(payload) });
}

test("captura o ref válido da URL no sessionStorage", () => {
  const store = installBrowser("?ref=ABC123");
  captureReferralFromUrl();
  assert.equal(store.get("zentra_ref"), "ABC123");
  assert.equal(readReferral(), "ABC123");
  assert.deepEqual(referralField(), { referral_code: "ABC123" });
});

for (const search of ["?ref=abc123", "?ref=AB", "?ref=ABCDEFGHIJK", "?ref=AB-123", "?outro=ABC123", ""]) {
  test(`ignora o ref fora do formato (${search || "sem parâmetro"})`, () => {
    const store = installBrowser(search);
    captureReferralFromUrl();
    assert.equal(store.size, 0);
    assert.equal(readReferral(), null);
    assert.deepEqual(referralField(), {});
  });
}

test("sem sessionStorage a captura não quebra", () => {
  assert.doesNotThrow(() => captureReferralFromUrl());
  assert.equal(readReferral(), null);
});

for (const route of routes) {
  test(`${route.name}: repassa referral_code válido ao relé`, async () => {
    const bodies = captureLeadBodies();
    const res = await route.post(buildRequest(route.name, { ...route.payload, referral_code: "ABC123" }));
    assert.equal(res.status, 200);
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].referral_code, "ABC123");
  });

  test(`${route.name}: código fora do formato é descartado e o payload fica como hoje`, async () => {
    const without = captureLeadBodies();
    await route.post(buildRequest(route.name, route.payload));
    clearRateLimits();
    const invalid = captureLeadBodies();
    const res = await route.post(buildRequest(route.name, { ...route.payload, referral_code: "abc<script>" }));
    assert.equal(res.status, 200);
    assert.equal("referral_code" in invalid[0], false);
    assert.equal("referral_code" in without[0], false);
  });
}
