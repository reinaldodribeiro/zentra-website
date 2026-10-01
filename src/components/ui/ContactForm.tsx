"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";
import { marcar } from "@/lib/conversionState";
import { maskPhone } from "@/lib/phone";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent";

const genericError = "Não conseguimos enviar agora. Tente de novo.";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        marcar("contato_enviado_em");
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
    <form className={styles.form} onSubmit={submit} noValidate>
      {contact.fields.map((field) => (
        <div key={field.name} className={`${styles.field} ${field.type === "textarea" ? styles.full : ""}`}>
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
              className={styles.input}
            />
          ) : (
            <input
              id={`contato-${field.name}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              autoComplete={field.name === "email" ? "email" : "off"}
              className={styles.input}
            />
          )}
        </div>
      ))}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
      <div className={`${styles.actions} ${styles.full}`}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? contact.sending : contact.submit}
        </button>
        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
