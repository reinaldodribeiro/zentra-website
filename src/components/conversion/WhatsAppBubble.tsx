"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappBubble } from "@/content/site";
import { openTrigger, onTriggerChange, closeTrigger, getOpenTrigger, readStamps, markStamp } from "@/lib/conversionState";
import { buildWhatsappLink } from "@/lib/demoWhatsapp";
import { isBubbleVisible, remainingMs } from "@/lib/whatsappBubble";
import styles from "./WhatsAppBubble.module.css";

const SHOW_AFTER_MS = 12_500;
const HIDE_AFTER_MS = 12_000;
const TYPING_MS = 1_200;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function exclusiveTriggerOpen(): boolean {
  const open = getOpenTrigger();
  return open === "cartao" || open === "modal";
}

export function WhatsAppBubble() {
  const [due, setDue] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [contactOnScreen, setContactOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const remaining = useRef(HIDE_AFTER_MS);

  useEffect(() => {
    if (readStamps().balao_fechado !== undefined) return;
    const timer = window.setTimeout(() => {
      if (!document.querySelector("[data-whatsapp-float]")) return;
      setBlocked(exclusiveTriggerOpen());
      setDue(true);
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => onTriggerChange(() => setBlocked(exclusiveTriggerOpen())), []);

  useEffect(() => {
    const contact = document.getElementById("contato");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactOnScreen(entry.isIntersecting));
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const visible = isBubbleVisible({ due, dismissed, blocked, contactOnScreen });

  useEffect(() => {
    if (!visible) return;
    openTrigger("balao");
    return () => {
      closeTrigger("balao");
      setPaused(false);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || paused) return;
    const startedAt = Date.now();
    const timer = window.setTimeout(() => dismiss(false), remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = remainingMs(remaining.current, Date.now() - startedAt);
    };
  }, [visible, paused]);

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
    if (remember) markStamp("balao_fechado");
    setDismissed(true);
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
        href={buildWhatsappLink("balao")}
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
