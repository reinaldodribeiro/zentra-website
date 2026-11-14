import assert from "node:assert/strict";
import { test } from "node:test";
import * as site from "../src/content/site.ts";

test("os motivos são oito, com crédito e WhatsApp nas posições novas", () => {
  const titles = site.whyZentra.items.map((item) => item.title);
  assert.equal(titles.length, 8);
  assert.equal(titles[3], "Crédito antes da proposta.");
  assert.equal(titles[4], "WhatsApp do começo ao fim.");
  assert.ok(!titles.includes("No celular e no computador."));
  assert.ok(!titles.includes("Suporte dentro do sistema."));
  assert.ok(!titles.includes("Foco em consignado."));
  assert.ok(!titles.includes("Acesso por contrato."));
});

test("a comparação tem dez linhas e termina no suporte", () => {
  const rows = site.comparison.rows;
  assert.equal(rows.length, 10);
  assert.ok(rows.some((row) => row.with.includes("WhatsApp oficial")));
  assert.deepEqual(rows[9], {
    without: "Fornecedor que some depois da venda",
    with: "Chamado dentro do sistema, com resposta da equipe",
  });
});
