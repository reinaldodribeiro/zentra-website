import assert from "node:assert/strict";
import { test } from "node:test";
import * as site from "../src/content/site.ts";
import {
  STEP_FIELDS,
  fieldsOfStep,
  orderedFields,
  stepLabel,
  stepOfField,
  stepOneIsValid,
  validateStepOne,
} from "../src/lib/contactSteps.ts";

test("o passo 1 tem nome e WhatsApp e o passo 2 o resto, na ordem", () => {
  assert.deepEqual(
    fieldsOfStep(1).map((field) => field.name),
    ["nome", "whatsapp"],
  );
  assert.deepEqual(
    fieldsOfStep(2).map((field) => field.name),
    ["email", "area", "mensagem"],
  );
});

test("todo campo do contato pertence a um passo e nenhum se repete", () => {
  const names = orderedFields().map((field) => field.name);
  assert.deepEqual(names, [...STEP_FIELDS[1], ...STEP_FIELDS[2]]);
  assert.equal(new Set(names).size, site.contact.fields.length);
  for (const name of names) assert.ok(stepOfField(name) === 1 || stepOfField(name) === 2);
});

test("o passo 1 recusa tudo vazio com os dois erros", () => {
  assert.deepEqual(validateStepOne({}), {
    nome: site.contactSteps.nameError,
    whatsapp: site.contactSteps.phoneError,
  });
  assert.equal(stepOneIsValid({ nome: "", whatsapp: "" }), false);
});

test("o passo 1 recusa nome curto e telefone incompleto", () => {
  assert.deepEqual(validateStepOne({ nome: "A", whatsapp: "(62) 9 9477-3610" }), {
    nome: site.contactSteps.nameError,
  });
  assert.deepEqual(validateStepOne({ nome: "Ana", whatsapp: "(62) 9477" }), {
    whatsapp: site.contactSteps.phoneError,
  });
  assert.equal(validateStepOne({ nome: "   ", whatsapp: "(62) 9477-3610" }).nome, site.contactSteps.nameError);
});

test("o passo 1 passa com nome de duas letras e telefone de 10 ou 11 dígitos", () => {
  assert.equal(stepOneIsValid({ nome: "Ana", whatsapp: "(62) 9477-3610" }), true);
  assert.equal(stepOneIsValid({ nome: "Jo", whatsapp: "(62) 9 9477-3610" }), true);
  assert.equal(stepOneIsValid({ nome: "Jo", whatsapp: "62994773610" }), true);
});

test("o indicador troca o número do passo", () => {
  assert.equal(stepLabel(1), "Passo 1 de 2");
  assert.equal(stepLabel(2), "Passo 2 de 2");
});
