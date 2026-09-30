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

test("as entregas são três, cada uma com ícone conhecido", () => {
  assert.equal(site.deliverables.items.length, 3);
  for (const item of site.deliverables.items) assert.ok(["target", "sheet", "stamp"].includes(item.icon));
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

test("as três telas têm legenda e descrição", () => {
  assert.equal(site.screens.items.length, 3);
  for (const item of site.screens.items) {
    assert.ok(item.caption.length > 0);
    assert.ok(item.alt.length > 0);
  }
});

test("a conformidade tem quatro itens", () => {
  assert.equal(site.compliance.points.length, 4);
});

test("o formulário tem os seis campos, três obrigatórios", () => {
  assert.deepEqual(
    site.contact.fields.map((field) => field.name),
    ["nome", "empresa", "cargo", "email", "telefone", "mensagem"],
  );
  assert.deepEqual(
    site.contact.fields.filter((field) => field.required).map((field) => field.name),
    ["nome", "empresa", "email"],
  );
});
