import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { articles } from "../src/content/articles/index.ts";
import { advocacia } from "../src/content/pages/advocacia.ts";
import { creditoConsignado } from "../src/content/pages/creditoConsignado.ts";
import * as site from "../src/content/site.ts";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const conteudo = strings(Object.fromEntries(Object.entries(site).filter(([nome]) => nome !== "legalSource")));

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
  assert.deepEqual(
    site.nav.map((item) => item.href),
    [
      `#${site.solutions.id}`,
      `#${site.howItWorks.id}`,
      "/credito-consignado",
      "/advocacia",
      `#${site.compliance.id}`,
      `#${site.faq.id}`,
    ],
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
  assert.equal(site.advocacy.title, "Soluções para escritórios de advocacia, por especialidade.");
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

function ler(caminho: string): string {
  return readFileSync(new URL(caminho, import.meta.url), "utf8");
}

test("o h1 da primeira tela carrega o termo principal e nada da primeira tela espera o script", () => {
  assert.ok(site.hero.kicker.toLowerCase().includes("crédito consignado"));
  const hero = ler("../src/components/sections/Hero.tsx");
  assert.ok(!hero.includes("<h1") || hero.slice(hero.indexOf("<h1"), hero.indexOf("</h1>")).includes("hero.kicker"));
  const copia = hero.slice(hero.indexOf("styles.copy"), hero.indexOf("styles.demo"));
  assert.ok(!copia.includes("data-reveal"));
  assert.ok(hero.includes('aria-labelledby="inicio-titulo"'));
});

test("o CSS só esconde o que entra com animação depois que o script marca html[data-motion]", () => {
  const css = ler("../src/app/globals.css");
  assert.ok(css.includes("html[data-motion] [data-reveal]:not(.in)"));
  const regras = css.split("}").filter((regra) => /opacity:\s*0;/.test(regra) && regra.includes("[data-reveal]"));
  assert.ok(regras.length > 0);
  for (const regra of regras) assert.ok(regra.includes("html[data-motion]"), regra);
  assert.ok(ler("../src/components/ui/MotionRuntime.tsx").includes("dataset.motion"));
});

function meta(arquivo: string, campo: string): string {
  const achado = ler(`../src/content/${arquivo}`).match(new RegExp(`${campo}:\\s*"([^"]+)"`));
  assert.ok(achado, `${campo} em ${arquivo}`);
  return achado[1];
}

const privacy = { metaTitle: meta("privacy.ts", "metaTitle"), metaDescription: meta("privacy.ts", "metaDescription") };
const terms = { metaTitle: meta("terms.ts", "metaTitle"), metaDescription: meta("terms.ts", "metaDescription") };
const cookies = { metaTitle: meta("cookies.ts", "metaTitle"), metaDescription: meta("cookies.ts", "metaDescription") };

test("os títulos de página cabem em 60 caracteres e as descrições têm de 120 a 155", () => {
  for (const titulo of [privacy.metaTitle, terms.metaTitle, cookies.metaTitle]) assert.ok(titulo.length <= 60, titulo);
  assert.ok(site.seo.defaultTitle.length <= 60);
  for (const descricao of [site.seo.description, privacy.metaDescription, terms.metaDescription, cookies.metaDescription]) {
    assert.ok(descricao.length >= 120 && descricao.length <= 155, `${descricao.length}: ${descricao}`);
  }
  assert.ok(!privacy.metaTitle.includes("|") && !terms.metaTitle.includes("|") && !cookies.metaTitle.includes("|"));
});

test("o robots bloqueia /api e o sitemap não usa a data do build", () => {
  assert.ok(ler("../src/app/robots.ts").includes('disallow: "/api/"'));
  const sitemap = ler("../src/app/sitemap.ts");
  assert.ok(!sitemap.includes("new Date"));
  assert.ok(sitemap.includes("updatedAt") || sitemap.includes("siteUpdatedAt"));
});

test("o rodapé tem as colunas Soluções, Empresa e Legal, e rede social vazia não entra", () => {
  assert.deepEqual(
    site.footer.columns.map((coluna) => coluna.title),
    ["Soluções", "Empresa", "Legal"],
  );
  const solucoes = site.footer.columns[0].links.map((link) => link.href);
  assert.deepEqual(solucoes, ["/credito-consignado", "/advocacia", "/artigos"]);
  const empresa = site.footer.columns[1].links.map((link) => link.label);
  assert.ok(site.firm.linkedin !== "" || !empresa.includes("LinkedIn"));
  assert.ok(site.firm.instagram !== "" || !empresa.includes("Instagram"));
  const legal = site.footer.columns[2].links;
  assert.deepEqual(
    legal.map((link) => link.label),
    ["Política de privacidade", "Termos de uso", "Política de cookies", "Preferências de cookies", "Encarregado de dados"],
  );
  assert.deepEqual(
    legal.map((link) => ("href" in link ? link.href : link.action)),
    ["/privacidade", "/termos", "/cookies", "cookie-preferences", site.links.dpo],
  );
});

test("o endereço da ponte legal é a única menção ao sistema no conteúdo e não é link", () => {
  assert.ok(site.legalSource.startsWith("https://app-data.zentrabusiness.com.br/api/legal/documents"));
  assert.ok(!strings(site.footer).some((texto) => texto.includes("app-data")));
});

const paginas = [
  { conteudo: creditoConsignado, termo: "higienização e enriquecimento de base para crédito consignado" },
  { conteudo: advocacia, termo: "consulta de processos judiciais e localização de partes para advogados" },
];

function palavras(pagina: typeof creditoConsignado): number {
  const { h1, intro, sections, faq } = pagina;
  return strings({ h1, intro, sections, faq }).join(" ").split(/\s+/).filter(Boolean).length;
}

test("cada página de assunto tem o termo principal no h1 e na descrição ou no texto", () => {
  for (const { conteudo: pagina, termo } of paginas) {
    assert.equal(pagina.h1.toLowerCase(), termo);
    assert.ok(pagina.metaTitle.length <= 60);
    assert.ok(pagina.metaDescription.length >= 120 && pagina.metaDescription.length <= 155, pagina.metaDescription);
    assert.ok(pagina.metaDescription.toLowerCase().includes(termo.split(" ").slice(0, 3).join(" ")));
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(pagina.updatedAt));
  }
});

test("cada página de assunto tem de 900 a 1.300 palavras e de quatro a seis perguntas", () => {
  for (const { conteudo: pagina } of paginas) {
    const total = palavras(pagina);
    assert.ok(total >= 900 && total <= 1300, `${pagina.path}: ${total} palavras`);
    assert.ok(pagina.faq.items.length >= 4 && pagina.faq.items.length <= 6, pagina.path);
    assert.ok(pagina.sections.some((section) => section.items && section.items.length > 0), pagina.path);
  }
});

test("as páginas de assunto não têm travessão, preço nem termo proibido", () => {
  const proibidos = ["—", "R$", "pessoa física", "por cpf", "dados de pessoas", "ficha da pessoa", "excelência", "robusto"];
  for (const { conteudo: pagina } of paginas) {
    for (const texto of strings(pagina)) {
      for (const termo of proibidos) {
        assert.ok(!texto.toLowerCase().includes(termo.toLowerCase()), `"${termo}" em "${texto}"`);
      }
    }
  }
});

test("as páginas de assunto apontam uma para a outra e para os artigos", () => {
  assert.ok(creditoConsignado.related.links.some((link) => link.href === "/advocacia"));
  assert.ok(advocacia.related.links.some((link) => link.href === "/credito-consignado"));
  for (const { conteudo: pagina } of paginas) {
    assert.ok(pagina.related.links.some((link) => link.href === "/artigos"));
  }
});

test("a home liga as duas páginas pelos cartões, pela seção de advocacia e pelo menu", () => {
  const hrefs = site.solutions.items.map((item) => item.href);
  assert.ok(hrefs.includes("/credito-consignado") && hrefs.includes("/advocacia"));
  assert.equal(site.solutions.items.find((item) => item.title === "Empresas e processos")?.href, "/advocacia");
  assert.equal(site.advocacy.pageLink.href, "/advocacia");
  const menu = site.nav.map((item) => item.href);
  assert.ok(menu.includes("/credito-consignado") && menu.includes("/advocacia"));
});

test("o sitemap lista as duas páginas de assunto com a data do conteúdo", () => {
  const sitemap = ler("../src/app/sitemap.ts");
  assert.ok(sitemap.includes("creditoConsignado.updatedAt") && sitemap.includes("advocacia.updatedAt"));
});

function palavrasDoArtigo(artigo: (typeof articles)[number]): number {
  const { h1, summary, sections } = artigo;
  return strings({ h1, summary, sections }).join(" ").split(/\s+/).filter(Boolean).length;
}

test("são três artigos, com slug único, data válida e de 700 a 1.000 palavras", () => {
  assert.equal(articles.length, 3);
  assert.equal(new Set(articles.map((artigo) => artigo.slug)).size, 3);
  for (const artigo of articles) {
    assert.equal(artigo.path, `/artigos/${artigo.slug}`);
    for (const data of [artigo.publishedAt, artigo.updatedAt]) {
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(data) && !Number.isNaN(Date.parse(data)), artigo.slug);
    }
    const total = palavrasDoArtigo(artigo);
    assert.ok(total >= 700 && total <= 1000, `${artigo.slug}: ${total} palavras`);
    assert.ok(artigo.metaTitle.length <= 60, artigo.metaTitle);
    assert.ok(artigo.metaDescription.length >= 120 && artigo.metaDescription.length <= 155, artigo.metaDescription);
    assert.ok(artigo.sections.some((section) => section.items && section.items.length > 0), artigo.slug);
  }
});

test("os artigos não têm travessão, preço nem termo proibido", () => {
  const proibidos = ["—", "R$", "pessoa física", "por cpf", "dados de pessoas", "ficha da pessoa", "excelência", "robusto", "datesolutions", "date solutions", "bigdatacorp"];
  for (const artigo of articles) {
    for (const texto of strings(artigo)) {
      for (const termo of proibidos) {
        assert.ok(!texto.toLowerCase().includes(termo.toLowerCase()), `"${termo}" em "${texto}"`);
      }
    }
  }
});

test("cada artigo aponta para a página do seu tema, e as páginas de assunto apontam de volta", () => {
  const destinos = [creditoConsignado.path, advocacia.path];
  for (const artigo of articles) {
    assert.ok(destinos.includes(artigo.topic.href), artigo.slug);
  }
  for (const destino of destinos) {
    assert.ok(articles.some((artigo) => artigo.topic.href === destino), destino);
  }
});

test("o sitemap lista o índice e cada artigo", () => {
  const sitemap = ler("../src/app/sitemap.ts");
  assert.ok(sitemap.includes("articlesIndex.path") && sitemap.includes("article.path"));
});
