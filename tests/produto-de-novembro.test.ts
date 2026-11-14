import assert from "node:assert/strict";
import { test } from "node:test";
import { advocacia } from "../src/content/pages/advocacia.ts";
import { analiseDeCredito } from "../src/content/pages/analiseDeCredito.ts";
import { creditoConsignado } from "../src/content/pages/creditoConsignado.ts";
import { disparoWhatsapp } from "../src/content/pages/disparoWhatsapp.ts";
import { sobre } from "../src/content/pages/sobre.ts";
import { readFileSync } from "node:fs";
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

const termoPrincipal = "análise de crédito de clientes e empresas";

test("paginas: /analise-de-credito mira o termo principal, tem seis perguntas e o serviço 3", () => {
  assert.ok(analiseDeCredito.h1.toLowerCase().includes(termoPrincipal));
  assert.ok(analiseDeCredito.metaTitle.toLowerCase().includes(termoPrincipal));
  assert.ok(analiseDeCredito.metaDescription.toLowerCase().includes(termoPrincipal));
  assert.ok(analiseDeCredito.metaDescription.length >= 120 && analiseDeCredito.metaDescription.length <= 155);
  assert.equal(analiseDeCredito.faq.items.length, 6);
  assert.equal(analiseDeCredito.serviceIndex, 3);
  assert.equal(analiseDeCredito.sections.filter((section) => section.highlight).length, 1);
});

test("paginas: /credito-consignado tem a seção servidores e a margem nunca é a oficial", () => {
  const servidores = creditoConsignado.sections.find((section) => section.id === "servidores");
  assert.ok(servidores);
  const ocorrencias = strings(creditoConsignado).join(" ").split("nunca a margem oficial").length - 1;
  assert.equal(ocorrencias, 2);
  assert.equal(creditoConsignado.related.links[0].href, "/analise-de-credito");
});

test("paginas: /disparo-whatsapp tem o heading exato e as seções de atendimento e fluxos", () => {
  const headings = disparoWhatsapp.sections.map((section) => section.heading);
  assert.ok(headings.includes("Disparo em massa pelo WhatsApp oficial"));
  assert.ok(headings.some((heading) => heading.startsWith("Atendimento")));
  assert.ok(headings.some((heading) => heading.startsWith("Fluxos automáticos")));
});

test("paginas: advocacia e sobre citam a análise de crédito", () => {
  assert.ok(strings(advocacia).join(" ").toLowerCase().includes("análise de crédito"));
  assert.ok(strings(sobre).join(" ").toLowerCase().includes("análise de crédito"));
});

test("paginas: nenhuma página tem updatedAt anterior a 2026-11-13 e o sitemap lista a rota nova", () => {
  for (const pagina of [analiseDeCredito, creditoConsignado, advocacia, disparoWhatsapp, sobre]) {
    assert.ok(pagina.updatedAt >= "2026-11-13", pagina.path);
  }
  assert.ok(site.siteUpdatedAt >= "2026-11-13");
  const sitemap = readFileSync(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
  assert.ok(sitemap.includes("analiseDeCredito.path") && sitemap.includes("analiseDeCredito.updatedAt"));
});
