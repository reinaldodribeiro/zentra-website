"use client";

import { useState, type FormEvent } from "react";
import { demo } from "@/content/site";
import { marcar } from "@/lib/conversionState";
import { linkWhatsapp } from "@/lib/demoWhatsapp";
import { maskPhone } from "@/lib/phone";
import styles from "./DemoForm.module.css";

type Status = "idle" | "sending" | "sent";

type DemoFormProps = {
  origem: "cartao" | "modal";
  onSuccess?: () => void;
};

const genericError = "Não conseguimos enviar agora. Tente de novo.";

export function DemoForm({ origem, onSuccess }: DemoFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sentName, setSentName] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demonstracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, origem, pagina: window.location.pathname }),
      });
      if (response.ok) {
        setSentName(name);
        setStatus("sent");
        marcar("demo_pedida_em");
        onSuccess?.();
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
        <h3 className="display h-sm">{demo.successTitle}</h3>
        <p>{demo.successBody}</p>
        <a
          href={linkWhatsapp(origem, sentName)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {demo.openWhatsApp}
        </a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.field}>
        <label htmlFor={`demo-${origem}-nome`} className={styles.label}>
          {demo.nameLabel}
          <span aria-hidden="true"> *</span>
        </label>
        <input
          id={`demo-${origem}-nome`}
          name="nome"
          type="text"
          placeholder={demo.namePlaceholder}
          autoComplete="name"
          maxLength={120}
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={`demo-${origem}-whatsapp`} className={styles.label}>
          {demo.phoneLabel}
          <span aria-hidden="true"> *</span>
        </label>
        <input
          id={`demo-${origem}-whatsapp`}
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          placeholder={demo.phonePlaceholder}
          autoComplete="tel"
          maxLength={16}
          required
          value={phone}
          onChange={(event) => setPhone(maskPhone(event.target.value))}
          className={styles.input}
        />
      </div>
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? demo.sending : demo.submit}
      </button>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <p className={`mono ${styles.privacy}`}>{demo.privacy}</p>
    </form>
  );
}
