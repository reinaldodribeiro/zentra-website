import assert from "node:assert/strict";
import { test } from "node:test";
import * as site from "../src/content/site.ts";

test("os motivos são oito, com celular e suporte nas posições novas", () => {
  const titles = site.whyZentra.items.map((item) => item.title);
  assert.equal(titles.length, 8);
  assert.equal(titles[3], "No celular e no computador.");
  assert.equal(titles[6], "Suporte dentro do sistema.");
  assert.ok(!titles.includes("Foco em consignado."));
  assert.ok(!titles.includes("Acesso por contrato."));
});

test("a comparação tem sete linhas e termina no suporte", () => {
  const rows = site.comparison.rows;
  assert.equal(rows.length, 7);
  assert.deepEqual(rows[6], {
    without: "Fornecedor que some depois da venda",
    with: "Chamado dentro do sistema, com resposta da equipe",
  });
});
