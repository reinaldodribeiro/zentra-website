"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappBubble } from "@/content/site";
import { abrirGatilho, aoMudarGatilho, fecharGatilho, gatilhoAberto, lerCarimbos, marcar } from "@/lib/conversionState";
import { linkWhatsapp } from "@/lib/demoWhatsapp";
import styles from "./WhatsAppBubble.module.css";

const SHOW_AFTER_MS = 12_500;
const HIDE_AFTER_MS = 12_000;
const TYPING_MS = 1_200;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function exclusiveTriggerOpen(): boolean {
  const open = gatilhoAberto();
  return open === "cartao" || open === "modal";
}

export function WhatsAppBubble() {
  const [shown, setShown] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [contactOnScreen, setContactOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);

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

  const visible = shown && !blocked && !contactOnScreen;

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setRevealed(true), TYPING_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    document.documentElement.setAttribute("data-bubble-open", "");
    return () => document.documentElement.removeAttribute("data-bubble-open");
  }, [visible]);

  function dismiss(remember: boolean) {
    if (remember) marcar("balao_fechado");
    fecharGatilho("balao");
    setShown(false);
  }

  if (!visible) return null;

  const typing = !revealed && !prefersReducedMotion();

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
        className={styles.body}
        onClick={() => dismiss(true)}
      >
        <span className={styles.header}>
          <span className={styles.avatar}>
            <Image src="/brand/zentra-mark-on-dark.svg" alt="" width={20} height={18} className={styles.mark} />
          </span>
          <span className={styles.name}>{whatsappBubble.name}</span>
        </span>
        <span className={styles.message} aria-live="polite">
          {typing ? null : whatsappBubble.text}
        </span>
        {typing ? (
          <span className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : null}
        <span className={styles.action}>
          <WhatsAppIcon className={styles.actionIcon} />
          {whatsappBubble.action}
        </span>
      </a>
      <button type="button" className={styles.close} onClick={() => dismiss(true)} aria-label={whatsappBubble.close}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
