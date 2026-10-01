import assert from "node:assert/strict";
import { test } from "node:test";
import { gaConsent, gaCookieExpirations, gaMeasurementId, posthogConfig } from "../src/lib/measurement.ts";
import { EVENT_NAMES, registerSink, track, trackPageview, unregisterSink, type Sink } from "../src/lib/track.ts";

function gravador() {
  const eventos: Array<[string, Record<string, unknown>]> = [];
  const paginas: string[] = [];
  const sink: Sink = {
    event: (nome, props) => eventos.push([nome, props]),
    pageview: (caminho) => paginas.push(caminho),
  };
  return { eventos, paginas, sink };
}

test("a lista tem os quinze eventos do briefing", () => {
  assert.equal(EVENT_NAMES.length, 15);
});

test("track sem sink não lança", () => {
  assert.doesNotThrow(() => track("cartao_visto", { origem: "cartao" }));
});

test("track repassa só origem e pagina e descarta o resto", () => {
  const { eventos, sink } = gravador();
  registerSink(sink);
  track("contato_enviado", { origem: "formulario", pagina: "/", nome: "Ana", email: "a@b.c" } as never);
  unregisterSink(sink);
  assert.deepEqual(eventos, [["contato_enviado", { origem: "formulario", pagina: "/" }]]);
});

test("nome fora da lista é recusado", () => {
  const { eventos, sink } = gravador();
  registerSink(sink);
  track("outro_evento" as never, { origem: "cartao" });
  unregisterSink(sink);
  assert.equal(eventos.length, 0);
});

test("trackPageview chega aos sinks e para depois de removidos", () => {
  const { paginas, sink } = gravador();
  registerSink(sink);
  trackPageview("/advocacia");
  unregisterSink(sink);
  trackPageview("/outra");
  assert.deepEqual(paginas, ["/advocacia"]);
});

test("o GA4 liga só com o próprio ID, sem depender do PostHog", () => {
  assert.equal(gaMeasurementId({}), null);
  assert.equal(gaMeasurementId({ gaId: " " }), null);
  assert.equal(gaMeasurementId({ posthogKey: "phc_x" }), null);
  assert.equal(gaMeasurementId({ gaId: " G-ABC " }), "G-ABC");
});

test("o PostHog liga só com a própria chave, sem depender do GA4", () => {
  assert.equal(posthogConfig({}), null);
  assert.equal(posthogConfig({ gaId: "G-ABC" }), null);
  assert.equal(posthogConfig({ posthogKey: " " }), null);
  assert.deepEqual(posthogConfig({ posthogKey: "phc_x" }), {
    posthogKey: "phc_x",
    posthogHost: "https://us.i.posthog.com",
  });
});

test("sem o sim da análise o GA4 nasce sem cookie e sem publicidade", () => {
  assert.deepEqual(gaConsent(false), {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
});

test("o sim da análise libera só o cookie de análise, nunca o de publicidade", () => {
  assert.deepEqual(gaConsent(true), {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
});

test("apagar os cookies do GA4 expira _ga e _ga_<id> nos dois domínios", () => {
  const linhas = gaCookieExpirations("_ga=GA1.1.1; _ga_ABC123=GS2; zentra_cookie_consent=x", "data.zentrabusiness.com.br");
  assert.ok(linhas.includes("_ga=; path=/; max-age=0; domain=.zentrabusiness.com.br"));
  assert.ok(linhas.includes("_ga=; path=/; max-age=0; domain=data.zentrabusiness.com.br"));
  assert.ok(linhas.includes("_ga_ABC123=; path=/; max-age=0; domain=.zentrabusiness.com.br"));
  assert.ok(linhas.includes("_ga_ABC123=; path=/; max-age=0"));
  assert.ok(linhas.every((linha) => !linha.startsWith("zentra_cookie_consent")));
});
