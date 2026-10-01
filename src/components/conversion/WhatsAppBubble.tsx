"use client";

import { useEffect, useState } from "react";
import { whatsappBubble } from "@/content/site";
import { abrirGatilho, aoMudarGatilho, fecharGatilho, gatilhoAberto, lerCarimbos, marcar } from "@/lib/conversionState";
import { linkWhatsapp } from "@/lib/demoWhatsapp";
import styles from "./WhatsAppBubble.module.css";

const SHOW_AFTER_MS = 20_000;
const HIDE_AFTER_MS = 12_000;

function exclusiveTriggerOpen(): boolean {
  const open = gatilhoAberto();
  return open === "cartao" || open === "modal";
}

export function WhatsAppBubble() {
  const [shown, setShown] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [contactOnScreen, setContactOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (lerCarimbos().balao_fechado !== undefined) return;
    const timer = window.setTimeout(() => {
      if (!document.querySelector("[data-whatsapp-float]")) return;
      if (abrirGatilho("balao")) setShown(true);
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => aoMudarGatilho(() => setBlocked(exclusiveTriggerOpen())), []);

  useEffect(() => {
    const contact = document.getElementById("contato");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactOnScreen(entry.isIntersecting));
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shown || paused) return;
    const timer = window.setTimeout(() => dismiss(false), HIDE_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [shown, paused]);

  function dismiss(remember: boolean) {
    if (remember) marcar("balao_fechado");
    fecharGatilho("balao");
    setShown(false);
  }

  if (!shown || blocked || contactOnScreen) return null;

  return (
    <div
      className={styles.bubble}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <a
        href={linkWhatsapp("balao")}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.text}
        aria-live="polite"
        onClick={() => dismiss(true)}
      >
        {whatsappBubble.text}
      </a>
      <button type="button" className={styles.close} onClick={() => dismiss(true)} aria-label={whatsappBubble.close}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
