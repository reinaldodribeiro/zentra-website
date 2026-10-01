import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  buildConsent,
  CONSENT_COOKIE_NAME,
  consentCookie,
  consentCookieDomain,
  expiredHostConsentCookie,
  needsDecision,
  parseConsent,
  rawConsent,
  saveConsent,
} from "../src/lib/cookieConsent.ts";

const agora = new Date("2026-10-01T12:00:00.000Z");

function ler(caminho: string): string {
  return readFileSync(new URL(caminho, import.meta.url), "utf8");
}

function gravarEm(hostname: string): string[] {
  const gravados: string[] = [];
  const globais = globalThis as unknown as Record<string, unknown>;
  globais.window = { location: { hostname, protocol: "https:" } };
  globais.document = {
    set cookie(valor: string) {
      gravados.push(valor);
    },
  };
  try {
    saveConsent("1.0.1", { analytics: true });
  } finally {
    delete globais.window;
    delete globais.document;
  }
  return gravados;
}

function valor(cookie: string): string {
  return cookie.split(";")[0].slice(`${CONSENT_COOKIE_NAME}=`.length);
}

test("o cookie é o mesmo do sistema: nome, JSON com versão, categorias e data, 365 dias e SameSite=Lax", () => {
  const consentimento = buildConsent("1.0.1", { analytics: false }, agora);
  const cookie = consentCookie(consentimento, "localhost", false);

  assert.equal(CONSENT_COOKIE_NAME, "zentra_cookie_consent");
  assert.deepEqual(JSON.parse(decodeURIComponent(valor(cookie))), {
    version: "1.0.1",
    categories: { analytics: false },
    decidedAt: "2026-10-01T12:00:00.000Z",
  });
  assert.ok(cookie.includes("path=/"));
  assert.ok(cookie.includes(`max-age=${60 * 60 * 24 * 365}`));
  assert.ok(cookie.includes("SameSite=Lax"));
  assert.ok(!cookie.includes("domain="));
  assert.ok(!cookie.includes("Secure"));
});

test("em produção o cookie vai para o domínio compartilhado com o sistema", () => {
  assert.equal(consentCookieDomain("data.zentrabusiness.com.br"), ".zentrabusiness.com.br");
  assert.equal(consentCookieDomain("app-data.zentrabusiness.com.br"), ".zentrabusiness.com.br");
  assert.equal(consentCookieDomain("zentrabusiness.com.br"), ".zentrabusiness.com.br");
  assert.equal(consentCookieDomain("localhost"), null);
  assert.equal(consentCookieDomain("zentra-website.vercel.app"), null);
  assert.equal(consentCookieDomain("naozentrabusiness.com.br"), null);

  const cookie = consentCookie(buildConsent("1.0.1", { analytics: true }, agora), "data.zentrabusiness.com.br", true);
  assert.ok(cookie.includes("domain=.zentrabusiness.com.br"));
  assert.ok(cookie.includes("Secure"));
});

test("o cookie gravado é lido de volta entre outros cookies", () => {
  const consentimento = buildConsent("1.0.1", { analytics: true }, agora);
  const cabecalho = `outro=1; ${CONSENT_COOKIE_NAME}=${valor(consentCookie(consentimento, "localhost", false))}; zentra_session=abc`;

  assert.deepEqual(parseConsent(rawConsent(cabecalho)), consentimento);
  assert.equal(rawConsent("outro=1"), null);
});

test("com a cópia antiga do host e a nova do domínio, vale a decisão mais recente", () => {
  const antiga = consentCookie(buildConsent("1.0.0", { analytics: true }, new Date("2026-09-01T12:00:00.000Z")), "localhost", false);
  const nova = consentCookie(buildConsent("1.0.1", { analytics: false }, agora), "data.zentrabusiness.com.br", true);
  const cabecalho = `${CONSENT_COOKIE_NAME}=${valor(antiga)}; outro=1; ${CONSENT_COOKIE_NAME}=${valor(nova)}`;

  const consentimento = parseConsent(rawConsent(cabecalho));
  assert.equal(consentimento?.version, "1.0.1");
  assert.equal(needsDecision("1.0.1", consentimento), false);
  assert.equal(parseConsent(rawConsent(`${CONSENT_COOKIE_NAME}=${valor(nova)}; ${CONSENT_COOKIE_NAME}=%7Bquebrado`))?.version, "1.0.1");
  assert.equal(rawConsent(`${CONSENT_COOKIE_NAME}=%7Bquebrado`), null);
});

test("gravar no domínio compartilhado expira a cópia que ficou só no host", () => {
  const expirado = expiredHostConsentCookie();
  assert.equal(expirado, `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`);
  assert.ok(!expirado.includes("domain="));

  const gravados = gravarEm("data.zentrabusiness.com.br");
  assert.equal(gravados.length, 2);
  assert.equal(gravados[0], expirado);
  assert.ok(gravados[1].includes("domain=.zentrabusiness.com.br"));

  const locais = gravarEm("localhost");
  assert.equal(locais.length, 1);
  assert.ok(!locais[0].includes("domain="));
});

test("cookie ausente, ilegível ou fora do formato pede decisão", () => {
  assert.equal(parseConsent(null), null);
  assert.equal(parseConsent("%7Bquebrado"), null);
  assert.equal(parseConsent(encodeURIComponent(JSON.stringify({ version: "1.0.1", categories: {}, decidedAt: "x" }))), null);
  assert.equal(parseConsent(encodeURIComponent(JSON.stringify({ version: "", categories: { analytics: true }, decidedAt: "x" }))), null);
  assert.equal(needsDecision("1.0.1", null), true);
});

test("versão diferente da política pede nova decisão; a mesma versão não", () => {
  const antiga = buildConsent("1.0.0", { analytics: true }, agora);
  assert.equal(needsDecision("1.0.1", antiga), true);
  assert.equal(needsDecision("1.0.1", buildConsent("1.0.1", { analytics: false }, agora)), false);
});

test("só o sim explícito libera o opcional", () => {
  assert.deepEqual(buildConsent("1.0.1", { analytics: "sim" as unknown as boolean }, agora).categories, { analytics: false });
});

test("o banner oferece aceitar e recusar com o mesmo peso, nada vem marcado e ele entra só depois da hidratação", () => {
  const banner = ler("../src/components/consent/CookieBanner.tsx");
  const recusar = banner.match(/className=\{`([^`]+)`\}\s+onClick=\{\(\) => decide\(NO_OPTIONAL_CATEGORIES\)\}/);
  const aceitar = banner.match(/className=\{`([^`]+)`\}\s+onClick=\{\(\) => decide\(ALL_OPTIONAL_CATEGORIES\)\}/);
  assert.ok(recusar && aceitar);
  assert.equal(recusar[1], aceitar[1]);
  assert.ok(banner.includes("openPreferences"));

  const preferencias = ler("../src/components/consent/CookiePreferences.tsx");
  assert.ok(preferencias.includes("current ? consent.categories.analytics : false"));
  assert.ok(!preferencias.includes("defaultChecked"));

  const provedor = ler("../src/components/consent/CookieConsentProvider.tsx");
  assert.ok(provedor.includes("serverSnapshot"));
  assert.ok(provedor.includes("hydrated &&"));
});

test("o layout monta o consentimento com a versão da política de cookies", () => {
  const layout = ler("../src/app/layout.tsx");
  assert.ok(layout.includes('fetchLegalDocument("cookie-policy")'));
  assert.ok(layout.includes("<CookieConsentProvider policyVersion="));
  assert.ok(layout.includes("<CookieBanner />") && layout.includes("<CookiePreferences />"));
  const gate = ler("../src/components/consent/ConsentGate.tsx");
  assert.ok(gate.includes("isAllowed(category)"));
});
