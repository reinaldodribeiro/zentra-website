"use client";

import { useState, type FormEvent } from "react";
import { contact, contactSteps } from "@/content/site";
import { fieldsOfStep, orderedFields, stepLabel, stepOfField, validateStepOne, type ContactStep, type StepOneErrors } from "@/lib/contactSteps";
import { markStamp } from "@/lib/conversionState";
import { maskPhone } from "@/lib/phone";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent";

const genericError = "Não conseguimos enviar agora. Tente de novo.";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<ContactStep>(1);
  const [fieldErrors, setFieldErrors] = useState<StepOneErrors>({});

  function goToStep(form: HTMLFormElement, target: ContactStep) {
    setStep(target);
    setError("");
    const first = fieldsOfStep(target)[0];
    window.requestAnimationFrame(() => form.querySelector<HTMLElement>(`#contato-${first.name}`)?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (step === 1) {
      const errors = validateStepOne(payload);
      setFieldErrors(errors);
      if (Object.keys(errors).length === 0) goToStep(form, 2);
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        markStamp("contato_enviado_em");
        setStatus("sent");
        return;
      }
      const body = await response.json().catch(() => null);
      setError(typeof body?.erro === "string" ? body.erro : genericError);
    } catch {
      setError(genericError);
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className={styles.success} role="status">
        <h3 className="display h-sm">{contact.successTitle}</h3>
        <p>{contact.successBody}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} onChange={() => setFieldErrors({})} noValidate>
      <p className={`mono ${styles.step} ${styles.full}`} aria-live="polite">
        {stepLabel(step)}
      </p>
      {orderedFields().map((field) => (
        <div
          key={field.name}
          hidden={stepOfField(field.name) !== step}
          className={`${styles.field} ${field.type === "textarea" ? styles.full : ""}`}
        >
          <label htmlFor={`contato-${field.name}`} className={styles.label}>
            {field.label}
            {field.required ? <span aria-hidden="true"> *</span> : null}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={`contato-${field.name}`}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className={styles.input}
            />
          ) : "options" in field ? (
            <select
              id={`contato-${field.name}`}
              name={field.name}
              required={field.required}
              defaultValue=""
              className={styles.input}
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.name === "whatsapp" ? (
            <input
              id={`contato-${field.name}`}
              name={field.name}
              type="tel"
              inputMode="numeric"
              placeholder={field.placeholder}
              required={field.required}
              autoComplete="tel"
              maxLength={16}
              value={phone}
              onChange={(event) => setPhone(maskPhone(event.target.value))}
              aria-invalid={fieldErrors.whatsapp ? true : undefined}
              aria-describedby={fieldErrors.whatsapp ? "contato-whatsapp-erro" : undefined}
              className={styles.input}
            />
          ) : (
            <input
              id={`contato-${field.name}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              autoComplete={field.name === "email" ? "email" : field.name === "nome" ? "name" : "off"}
              aria-invalid={field.name === "nome" && fieldErrors.nome ? true : undefined}
              aria-describedby={field.name === "nome" && fieldErrors.nome ? "contato-nome-erro" : undefined}
              className={styles.input}
            />
          )}
          {field.name === "nome" || field.name === "whatsapp" ? (
            fieldErrors[field.name] ? (
              <p id={`contato-${field.name}-erro`} className={styles.fieldError} role="alert">
                {fieldErrors[field.name]}
              </p>
            ) : null
          ) : null}
        </div>
      ))}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
      <div className={`${styles.actions} ${styles.full}`}>
        <div className={styles.buttons}>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {step === 1 ? contactSteps.next : status === "sending" ? contact.sending : contact.submit}
          </button>
          {step === 2 ? (
            <button
              type="button"
              className={styles.back}
              onClick={(event) => goToStep(event.currentTarget.form as HTMLFormElement, 1)}
            >
              {contactSteps.back}
            </button>
          ) : null}
        </div>
        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
