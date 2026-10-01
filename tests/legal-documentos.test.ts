import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, test } from "node:test";
import { cookies } from "../src/content/cookies.ts";
import { privacy } from "../src/content/privacy.ts";
import * as site from "../src/content/site.ts";
import { terms } from "../src/content/terms.ts";
import { fetchLegalDocument, legalDocumentsUrl, withExternalLinksInNewTab, withoutSystemLinks } from "../src/lib/legalDocuments.ts";

const originalUrl = process.env.LEGAL_DOCUMENTS_URL;

afterEach(() => {
  if (originalUrl === undefined) delete process.env.LEGAL_DOCUMENTS_URL;
  else process.env.LEGAL_DOCUMENTS_URL = originalUrl;
});

function ler(caminho: string): string {
  return readFileSync(new URL(caminho, import.meta.url), "utf8");
}

const documento = {
  data: {
    kind: "cookie-policy",
    version: "1.0.1",
    effective_at: "2026-10-01",
    title: "Política de Cookies",
    html: '<h2>1. O que são</h2><p>Texto em <a href="mailto:contato@zentrabusiness.com.br">contato@zentrabusiness.com.br</a>.</p>',
  },
};

test("a busca pede o tipo à ponte do sistema, revalida de hora em hora e devolve o documento", async () => {
  delete process.env.LEGAL_DOCUMENTS_URL;
  const chamadas: { url: string; init?: RequestInit & { next?: { revalidate: number } } }[] = [];
  const resultado = await fetchLegalDocument("cookie-policy", async (url, init) => {
    chamadas.push({ url, init });
    return Response.json(documento);
  });

  assert.equal(chamadas[0].url, `${site.legalSource}/cookie-policy`);
  assert.equal(chamadas[0].init?.next?.revalidate, 3600);
  assert.deepEqual(resultado, {
    title: "Política de Cookies",
    version: "1.0.1",
    effectiveAt: "2026-10-01",
    html: documento.data.html,
  });
});

test("LEGAL_DOCUMENTS_URL troca a origem da busca", async () => {
  process.env.LEGAL_DOCUMENTS_URL = "http://localhost:3100/api/legal/documents/";
  assert.equal(legalDocumentsUrl(), "http://localhost:3100/api/legal/documents");
  let pedido = "";
  await fetchLegalDocument("terms-of-use", async (url) => {
    pedido = url;
    return Response.json(documento);
  });
  assert.equal(pedido, "http://localhost:3100/api/legal/documents/terms-of-use");
});

test("falha da ponte, resposta sem documento ou rede fora devolvem nulo", async () => {
  assert.equal(await fetchLegalDocument("privacy-policy", async () => new Response("", { status: 502 })), null);
  assert.equal(await fetchLegalDocument("privacy-policy", async () => new Response("", { status: 404 })), null);
  assert.equal(await fetchLegalDocument("privacy-policy", async () => Response.json({ data: { title: "x" } })), null);
  assert.equal(await fetchLegalDocument("privacy-policy", async () => new Response("não é json")), null);
  assert.equal(
    await fetchLegalDocument("privacy-policy", async () => {
      throw new Error("offline");
    }),
    null,
  );
});

test("o HTML do documento não sai com link para o sistema", async () => {
  const sistema = new URL(site.legalSource).host;
  const html = `<p>Acesse <a href="https://${sistema}/login">${sistema}</a> ou <a href="https://wa.me/1">o WhatsApp</a>.</p>`;
  const limpo = withoutSystemLinks(html);
  assert.ok(!limpo.includes(`href="https://${sistema}`));
  assert.ok(limpo.includes(sistema));
  assert.ok(limpo.includes('href="https://wa.me/1"'));

  const resultado = await fetchLegalDocument("terms-of-use", async () =>
    Response.json({ data: { ...documento.data, html } }),
  );
  assert.ok(resultado && !resultado.html.includes(`href="https://${sistema}`));
});

test("o endereço da ponte só é usado pela busca no servidor, nunca por componente", () => {
  for (const arquivo of [
    "../src/components/pages/LegalDocumentPage.tsx",
    "../src/components/layout/Footer.tsx",
    "../src/components/consent/CookieBanner.tsx",
    "../src/components/consent/CookiePreferences.tsx",
  ]) {
    const fonte = ler(arquivo);
    assert.ok(!fonte.includes("legalSource") && !fonte.includes("app-data"), arquivo);
  }
  assert.ok(ler("../src/lib/legalDocuments.ts").includes("legalSource"));
});

test("as três páginas buscam o documento do seu tipo e revalidam de hora em hora", () => {
  const paginas = [
    { arquivo: "../src/app/termos/page.tsx", conteudo: terms, tipo: "terms-of-use" },
    { arquivo: "../src/app/privacidade/page.tsx", conteudo: privacy, tipo: "privacy-policy" },
    { arquivo: "../src/app/cookies/page.tsx", conteudo: cookies, tipo: "cookie-policy" },
  ];
  for (const { arquivo, conteudo, tipo } of paginas) {
    const fonte = ler(arquivo);
    assert.equal(conteudo.kind, tipo);
    assert.ok(fonte.includes("export const revalidate = 3600"), arquivo);
    assert.ok(fonte.includes("fetchLegalDocument(") && fonte.includes("pageMetadata("), arquivo);
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(conteudo.updatedAt));
    assert.ok(conteudo.metaTitle.length <= 60);
    assert.ok(conteudo.metaDescription.length >= 120 && conteudo.metaDescription.length <= 155, conteudo.metaDescription);
  }
});

test("os rascunhos próprios e a faixa de revisão saíram", () => {
  for (const conteudo of [terms, privacy, cookies]) {
    assert.ok(!("sections" in conteudo));
    assert.ok(!("banner" in conteudo));
  }
  assert.ok(!ler("../src/components/pages/LegalDocumentPage.tsx").includes("banner"));
});

test("o sitemap lista a política de cookies", () => {
  assert.ok(ler("../src/app/sitemap.ts").includes("cookies.updatedAt"));
});

test("link externo do documento abre em nova aba; interno, âncora, mailto e tel ficam como estão", async () => {
  const html =
    '<p><a href="https://wa.me/1">a</a> <a href="https://www.instagram.com/x" target="_self" rel="nofollow">b</a> ' +
    '<a href="https://data.zentrabusiness.com.br/privacidade">c</a> <a href="/termos">d</a> <a href="#x">e</a> ' +
    '<a href="mailto:a@b.com">f</a> <a href="tel:+5562">g</a></p>';
  const saida = withExternalLinksInNewTab(html);
  assert.ok(saida.includes('<a href="https://wa.me/1" target="_blank" rel="noopener noreferrer">'));
  assert.ok(saida.includes('<a href="https://www.instagram.com/x" target="_blank" rel="noopener noreferrer">'));
  assert.equal((saida.match(/target="_blank"/g) ?? []).length, 2);
  for (const intacto of ['<a href="https://data.zentrabusiness.com.br/privacidade">', '<a href="/termos">', '<a href="#x">', '<a href="mailto:a@b.com">', '<a href="tel:+5562">']) {
    assert.ok(saida.includes(intacto), intacto);
  }

  const resultado = await fetchLegalDocument("terms-of-use", async () =>
    Response.json({ data: { ...documento.data, html } }),
  );
  assert.ok(resultado?.html.includes('href="https://wa.me/1" target="_blank" rel="noopener noreferrer"'));
});
