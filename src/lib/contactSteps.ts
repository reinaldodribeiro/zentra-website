import { contact, contactSteps } from "../content/site.ts";
import { validPhone } from "./phone.ts";

export type ContactStep = 1 | 2;

export type StepOneValues = { nome?: unknown; whatsapp?: unknown };

export type StepOneErrors = { nome?: string; whatsapp?: string };

export const STEP_FIELDS: Record<ContactStep, readonly string[]> = {
  1: ["nome", "whatsapp"],
  2: ["email", "area", "mensagem"],
};

const MIN_NAME_LENGTH = 2;

export function stepOfField(name: string): ContactStep {
  return STEP_FIELDS[1].includes(name) ? 1 : 2;
}

export function orderedFields() {
  const position = (name: string) => [...STEP_FIELDS[1], ...STEP_FIELDS[2]].indexOf(name);
  return [...contact.fields].sort((a, b) => position(a.name) - position(b.name));
}

export function fieldsOfStep(step: ContactStep) {
  return orderedFields().filter((field) => stepOfField(field.name) === step);
}

export function validateStepOne(values: StepOneValues): StepOneErrors {
  const errors: StepOneErrors = {};
  const name = typeof values.nome === "string" ? values.nome.trim() : "";
  const phone = typeof values.whatsapp === "string" ? values.whatsapp : "";
  if (name.length < MIN_NAME_LENGTH) errors.nome = contactSteps.nameError;
  if (!validPhone(phone)) errors.whatsapp = contactSteps.phoneError;
  return errors;
}

export function stepOneIsValid(values: StepOneValues): boolean {
  return Object.keys(validateStepOne(values)).length === 0;
}

export function stepLabel(step: ContactStep): string {
  return contactSteps.stepLabel.replace("{n}", String(step));
}
