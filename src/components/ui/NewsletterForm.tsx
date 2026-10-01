"use client";

import { useState, type FormEvent } from "react";
import { links, newsletter } from "@/content/site";
import { track } from "@/lib/track";
import styles from "./NewsletterForm.module.css";

type Status = "idle" | "sending" | "sent";

const genericError = "Não conseguimos cadastrar agora. Tente de novo.";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          email: data.get("email"),
          site: data.get("site"),
          consentimento: data.get("consentimento") === "on",
        }),
      });
      if (response.ok) {
        track("newsletter_enviada", { origem: "newsletter" });
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
      <p className={styles.success} role="status">
        {newsletter.success}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.field}>
        <label htmlFor="newsletter-nome" className={styles.label}>
          {newsletter.nameLabel}
        </label>
        <input
          id="newsletter-nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder={newsletter.namePlaceholder}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="newsletter-email" className={styles.label}>
          {newsletter.emailLabel}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={newsletter.emailPlaceholder}
          className={styles.input}
        />
      </div>
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
      <label className={styles.consent}>
        <input type="checkbox" name="consentimento" required />
        <span>
          {newsletter.consentBefore}{" "}
          <a href={links.privacy}>
            {newsletter.consentLink}
          </a>
          .
        </span>
      </label>
      <div className={styles.submit}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? newsletter.sending : newsletter.submit}
        </button>
      </div>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
