import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import * as site from "../src/content/site.ts";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const conteudo = strings({ ...site });

test("o título da primeira tela é o da especificação e o destaque está nele", () => {
  assert.equal(site.hero.title, "Contato certo, base limpa, operação com prova.");
  assert.ok(site.hero.title.includes(site.hero.highlight));
});

test("a primeira tela tem quatro selos", () => {
  assert.deepEqual(site.hero.badges, [
    "Acesso por contrato",
    "Finalidade em toda consulta",
    "Segundo fator por usuário",
    "Conformidade LGPD",
  ]);
});

test("a consulta animada tem seis blocos e nenhum dígito de documento", () => {
  assert.deepEqual(
    site.lookupDemo.blocks.map((block) => block.title),
    ["Telefones", "E-mails", "Endereço", "Vínculos", "Renda e ocupação", "Score"],
  );
  for (const texto of strings(site.lookupDemo)) {
    assert.ok(!/\d{5,}/.test(texto), `dígitos demais em "${texto}"`);
    assert.ok(!/\d{3}\.\d{3}\.\d{3}/.test(texto), `CPF em "${texto}"`);
    assert.ok(!/\d{4,5}-\d{4}/.test(texto), `telefone completo em "${texto}"`);
    assert.ok(!/[\w.]+@[\w.]+\.\w+/.test(texto), `e-mail completo em "${texto}"`);
  }
});

test("os quatro contadores trazem os valores da especificação", () => {
  assert.deepEqual(
    site.stats.items.map((item) => [item.prefix, item.value, item.suffix]),
    [
      ["+", 260, " mi"],
      ["+", 60, " mi"],
      ["", 10, ""],
      ["", 100, "%"],
    ],
  );
});

test("todo rótulo de seção começa com //", () => {
  const kickers = [
    site.hero.kicker,
    site.diagnosis.kicker,
    site.solutions.kicker,
    site.comparison.kicker,
    site.howItWorks.kicker,
    site.purposes.kicker,
    site.whyZentra.kicker,
    site.advocacy.kicker,
    site.segments.kicker,
    site.compliance.kicker,
    site.faq.kicker,
    site.finalCta.kicker,
  ];
  for (const kicker of kickers) assert.ok(kicker.startsWith("//"), kicker);
});

test("as capturas do sistema saíram", () => {
  assert.ok(!("screens" in site));
});

test("a navegação aponta para as seções da página", () => {
  const ids = [site.solutions.id, site.howItWorks.id, site.whyZentra.id, site.advocacy.id, site.compliance.id, site.faq.id];
  assert.deepEqual(
    site.nav.map((item) => item.href),
    ids.map((id) => `#${id}`),
  );
  assert.equal(site.contact.id, "contato");
  assert.equal(site.purposes.id, "finalidade");
});

test("a página renderiza as seções na ordem, com os ids da navegação", () => {
  const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  const order = [
    "Hero",
    "Stats",
    "Diagnosis",
    "Solutions",
    "Comparison",
    "HowItWorks",
    "Purpose",
    "WhyZentra",
    "Advocacy",
    "Segments",
    "Compliance",
    "Faq",
    "FinalCta",
    "Newsletter",
  ];
  const positions = order.map((name) => page.indexOf(`<${name} />`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));

  const sections = readdirSync(new URL("../src/components/sections/", import.meta.url))
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => readFileSync(new URL(`../src/components/sections/${name}`, import.meta.url), "utf8"))
    .join("\n");
  const rendered = [
    "stats.id",
    "diagnosis.id",
    "solutions.id",
    "comparison.id",
    "howItWorks.id",
    "purposes.id",
    "whyZentra.id",
    "advocacy.id",
    "segments.id",
    "compliance.id",
    "faq.id",
    "contact.id",
    "newsletter.id",
  ];
  for (const reference of rendered) assert.ok(sections.includes(`{${reference}}`), reference);
  assert.ok(sections.includes('id="inicio"'));
  for (const item of site.nav) assert.ok(item.href.startsWith("#"));
});

test("as perguntas são sete e a de advocacia vem antes do preço", () => {
  assert.equal(site.faq.items.length, 7);
  const perguntas = site.faq.items.map((item) => item.question);
  assert.equal(perguntas.indexOf("Serve para escritório de advocacia?") + 1, perguntas.indexOf("Quanto custa?"));
});

test("nenhum texto tem travessão, preço ou palavra de fornecedor", () => {
  const proibidos = ["—", "R$", "solução completa", "potencialize", "excelência", "inovador", "robusto"];
  for (const texto of conteudo) {
    for (const termo of proibidos) {
      assert.ok(!texto.toLowerCase().includes(termo.toLowerCase()), `"${termo}" em "${texto}"`);
    }
  }
});

test("a única chamada para ação é o contato", () => {
  assert.equal(site.cta.href, "#contato");
  assert.equal(site.links.contact, "#contato");
});

test("o link do WhatsApp leva o número do contato", () => {
  assert.ok(site.links.whatsapp.includes(site.firm.whatsappNumber));
});

test("o diagnóstico tem três situações e um fecho", () => {
  assert.equal(site.diagnosis.items.length, 3);
  assert.ok(site.diagnosis.closing.length > 0);
});

test("as quatro frentes têm quatro itens e uma cor cada", () => {
  assert.equal(site.solutions.items.length, 4);
  assert.deepEqual(
    site.solutions.items.map((item) => item.color),
    ["gold", "blue", "green", "purple"],
  );
  for (const item of site.solutions.items) assert.equal(item.points.length, 4);
});

test("a comparação tem seis linhas e os dois rótulos de coluna", () => {
  assert.equal(site.comparison.rows.length, 6);
  assert.ok(site.comparison.withoutLabel.length > 0);
  assert.ok(site.comparison.withLabel.length > 0);
});

test("são oito motivos e nove segmentos", () => {
  assert.equal(site.whyZentra.items.length, 8);
  assert.equal(site.segments.items.length, 9);
  assert.ok(site.segments.items.includes("Escritórios de advocacia"));
});

test("o pedido final tem título, texto e linha de sigilo", () => {
  assert.equal(site.finalCta.title, "Pare de ligar no escuro.");
  assert.ok(site.finalCta.body.length > 0);
  assert.ok(site.contact.privacy.startsWith("//"));
});

test("o funcionamento tem quatro passos", () => {
  assert.equal(site.howItWorks.steps.length, 4);
});

test("cada finalidade traz registro e retorno", () => {
  assert.equal(site.purposes.options.length, 3);
  for (const option of site.purposes.options) {
    assert.ok(option.record.length > 0);
    assert.ok(option.returned.length > 0);
  }
});

test("a conformidade tem quatro itens", () => {
  assert.equal(site.compliance.points.length, 4);
});

test("o formulário tem só nome, e-mail, WhatsApp, área e mensagem opcional", () => {
  assert.deepEqual(
    site.contact.fields.map((field) => field.name),
    ["nome", "email", "whatsapp", "area", "mensagem"],
  );
  assert.deepEqual(
    site.contact.fields.filter((field) => field.required).map((field) => field.name),
    ["nome", "email", "whatsapp", "area"],
  );
  const area = site.contact.fields.find((field) => field.name === "area");
  assert.ok(area && "options" in area && area.options.length === 7);
  assert.equal(site.contact.submit, "Quero falar com a Zentra");
});

test("a advocacia tem cinco especialidades de três itens, um cartão aberto e links do WhatsApp", () => {
  assert.equal(site.advocacy.title, "Para cada especialidade, uma solução.");
  assert.deepEqual(
    site.advocacy.items.map((item) => item.specialty),
    ["Previdenciário", "Trabalhista", "Bancário e revisional", "Cível", "Recuperação de crédito"],
  );
  for (const item of site.advocacy.items) assert.equal(item.points.length, 3);
  const link = site.advocacyLink("Bancário e revisional");
  assert.ok(link.startsWith(`https://wa.me/${site.firm.whatsappNumber}?text=`));
  assert.ok(decodeURIComponent(link).includes("Olá, atuo com bancário e revisional e quero conhecer a Zentra."));
  assert.ok(!conteudo.some((texto) => /pessoa física/i.test(texto)));
});

test("nenhum link leva ao sistema", () => {
  assert.ok(!("SYSTEM_URL" in site));
  assert.ok(!("system" in site.links));
  assert.ok(!conteudo.some((texto) => texto.includes("app-data.zentrabusiness.com.br")));
});

test("o conteúdo fala em empresas e profissionais, sem acesso só por empresa", () => {
  assert.ok(!conteudo.some((texto) => /por empresa/i.test(texto)));
  assert.ok(conteudo.some((texto) => texto.includes("profissionais")));
});

test("a newsletter tem título, texto e consentimento", () => {
  assert.equal(site.newsletter.title, "Assine nossa newsletter.");
  assert.equal(site.newsletter.submit, "Assinar");
  assert.equal(site.newsletter.success, "Pronto. Você vai receber a próxima edição.");
});
