import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { footer } from "../src/content/site.ts";
import { isExternalHref, linkProps } from "../src/lib/externalLink.ts";

function arquivos(pasta: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    return statSync(caminho).isDirectory() ? arquivos(caminho) : [caminho];
  });
}

test("endereço de outro domínio é externo; o do site, relativo, âncora, mailto e tel não", () => {
  assert.equal(isExternalHref("https://www.instagram.com/zentrabusinesshub"), true);
  assert.equal(isExternalHref("https://wa.me/5562994773610"), true);
  assert.equal(isExternalHref("https://data.zentrabusiness.com.br/advocacia"), false);
  for (const href of ["/privacidade", "#contato", "mailto:a@b.com", "tel:+5562", "app.html"]) {
    assert.equal(isExternalHref(href), false);
  }
});

test("link externo abre em outra aba com noopener noreferrer, e o interno fica como está", () => {
  assert.deepEqual(linkProps("https://www.instagram.com/x"), {
    href: "https://www.instagram.com/x",
    target: "_blank",
    rel: "noopener noreferrer",
  });
  assert.deepEqual(linkProps("/privacidade"), { href: "/privacidade" });
});

test("todo link externo do rodapé passa pelo auxiliar", () => {
  const externos = footer.columns.flatMap((coluna) => coluna.links).filter((item) => isExternalHref(item.href));
  assert.ok(externos.length > 0);
  const fonte = readFileSync("src/components/layout/Footer.tsx", "utf8");
  assert.match(fonte, /\{\.\.\.linkProps\(item\.href\)\}/);
});

test("nenhuma âncora com endereço http no código deixa de abrir em outra aba", () => {
  const sem: string[] = [];
  for (const arquivo of arquivos("src").filter((nome) => nome.endsWith(".tsx"))) {
    const fonte = readFileSync(arquivo, "utf8");
    for (const [tag] of fonte.matchAll(/<a\b[^>]*>/gs)) {
      const ehLiteralExterno = /href=["'`]https?:\/\//.test(tag);
      const ehWhatsapp = /href=\{(links\.whatsapp|linkWhatsapp\(|advocacyLink\()/.test(tag);
      if ((ehLiteralExterno || ehWhatsapp) && !(tag.includes('target="_blank"') && tag.includes('rel="noopener noreferrer"'))) {
        sem.push(`${arquivo}: ${tag.slice(0, 80)}`);
      }
    }
  }
  assert.deepEqual(sem, []);
});
