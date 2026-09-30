import assert from "node:assert/strict";
import { test } from "node:test";
import * as site from "../src/content/site.ts";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const conteudo = strings({ ...site });

test("o título da primeira tela é o da especificação", () => {
  assert.equal(site.hero.title, "Inteligência de dados para a sua carteira.");
});

test("a navegação aponta para as seções da página", () => {
  const ids = [site.deliverables.id, site.howItWorks.id, site.screens.id, site.compliance.id, site.faq.id];
  assert.deepEqual(
    site.nav.map((item) => item.href),
    ids.map((id) => `#${id}`),
  );
  assert.equal(site.contact.id, "contato");
  assert.equal(site.purposes.id, "finalidade");
});

test("as perguntas são seis", () => {
  assert.equal(site.faq.items.length, 6);
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
