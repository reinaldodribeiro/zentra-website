import assert from "node:assert/strict";
import { test } from "node:test";
import * as site from "../src/content/site.ts";
import { voiceForPath, voices } from "../src/content/voices.ts";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

test("home: Soluções tem seis frentes na ordem e a terceira aponta para a análise de crédito", () => {
  assert.deepEqual(
    site.solutions.items.map((item) => item.title),
    ["Consulta de contatos", "Consulta em lote", "Análise de crédito", "Empresas e processos", "Histórico e controle", "WhatsApp oficial"],
  );
  assert.equal(site.solutions.items[2].href, "/analise-de-credito");
  assert.equal(site.solutions.items[2].color, "coral");
});

test("home: a seção da análise de crédito existe e o exemplo não tem dígito de documento", () => {
  assert.equal(site.creditAnalysis.id, "analise-de-credito");
  assert.equal(site.creditAnalysis.pageLink.href, "/analise-de-credito");
  assert.equal(site.creditAnalysis.points.length, 4);
  assert.equal(site.creditAnalysis.demo.score, 712);
  assert.equal(site.creditAnalysis.demo.tiles.length, 4);
  for (const texto of strings({ ...site.creditAnalysis.demo, score: undefined, scoreMax: undefined })) {
    assert.ok(!/\d{3,}/.test(texto), `sequência de dígitos em "${texto}"`);
  }
});

test("home: a finalidade tem quatro opções e o Por que a Zentra tem os dois motivos novos", () => {
  assert.equal(site.purposes.options.length, 4);
  assert.equal(site.purposes.options[3].label, "Analisar o crédito antes da proposta");
  const titles = site.whyZentra.items.map((item) => item.title);
  assert.equal(titles.length, 8);
  assert.ok(titles.includes("Crédito antes da proposta."));
  assert.ok(titles.includes("WhatsApp do começo ao fim."));
});

test("home: o menu tem sete itens com Análise de crédito e WhatsApp e sem Como funciona", () => {
  const labels = site.nav.map((item) => item.label);
  assert.equal(labels.length, 7);
  assert.ok(labels.includes("Análise de crédito"));
  assert.ok(labels.includes("WhatsApp"));
  assert.ok(!labels.includes("Como funciona"));
});

test("home: rodapé e contato citam a análise de crédito e há quatro serviços", () => {
  assert.ok(site.footer.columns[0].links.some((link) => "href" in link && link.href === "/analise-de-credito"));
  assert.equal(site.footer.columns[0].links.length, 5);
  const area = site.contact.fields.find((field) => field.name === "area");
  assert.ok(area && "options" in area && area.options.includes("Análise de crédito"));
  assert.equal(site.services.length, 4);
  assert.equal(site.services[3].serviceType, "Análise de crédito");
});

test("voz: credito tem todos os campos e responde a /analise-de-credito", () => {
  const voz = voices.credito;
  for (const campo of ["demoTitle", "demoBody", "exitTitle", "bubbleText", "finalTitle", "finalBody"] as const) {
    assert.ok(voz[campo].length > 0, campo);
  }
  assert.ok(voz.whatsapp.demo.includes("{nome}"));
  assert.ok(voz.whatsapp.padrao.startsWith("Olá"));
  assert.ok(voz.whatsapp.balao.startsWith("Olá"));
  assert.equal(voiceForPath("/analise-de-credito"), "credito");
});
