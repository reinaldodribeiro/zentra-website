"use client";

import { useEffect, useState } from "react";
import { engagementCard } from "@/content/site";
import {
  abrirGatilho,
  fecharGatilho,
  lerCarimbos,
  marcar,
  podeAbrirCartao,
} from "@/lib/conversionState";
import { DemoForm } from "./DemoForm";
import styles from "./EngagementCard.module.css";

const DESKTOP = "(min-width: 1024px)";
const SCROLL_TRIGGER = 0.6;
const TIME_TRIGGER_MS = 45_000;

function scrolledEnough(): boolean {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER;
}

function firstScreenGone(): boolean {
  const hero = document.getElementById("inicio");
  return !hero || hero.getBoundingClientRect().bottom <= 0;
}

export function EngagementCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP).matches) return;
    let timeElapsed = false;

    function tryOpen() {
      if (!firstScreenGone() || !(timeElapsed || scrolledEnough())) return;
      if (!podeAbrirCartao(Date.now(), lerCarimbos()) || !abrirGatilho("cartao")) return;
      stop();
      setOpen(true);
    }

    const timer = window.setTimeout(() => {
      timeElapsed = true;
      tryOpen();
    }, TIME_TRIGGER_MS);

    function stop() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", tryOpen);
    }

    window.addEventListener("scroll", tryOpen, { passive: true });
    return stop;
  }, []);

  function close() {
    fecharGatilho("cartao");
    marcar("cartao_fechado_em");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside className={styles.card} aria-labelledby="cartao-titulo">
      <button type="button" className={styles.close} onClick={close} aria-label={engagementCard.close}>
        <span aria-hidden="true">×</span>
      </button>
      <h2 id="cartao-titulo" className={`display h-sm ${styles.title}`}>
        {engagementCard.title}
      </h2>
      <p className={styles.body}>{engagementCard.body}</p>
      <DemoForm origem="cartao" onSuccess={() => marcar("cartao_enviado_em")} />
    </aside>
  );
}
