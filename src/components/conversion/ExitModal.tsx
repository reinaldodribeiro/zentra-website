"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { exitModal } from "@/content/site";
import { abrirGatilho, fecharGatilho, lerCarimbos, marcar, podeAbrirModal } from "@/lib/conversionState";
import { DemoForm } from "./DemoForm";
import styles from "./ExitModal.module.css";

const DESKTOP = "(min-width: 1024px)";
const EXIT_EDGE_PX = 20;
const MIN_TIME_MS = 10_000;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';

function firstScreenGone(): boolean {
  const hero = document.getElementById("inicio");
  return !hero || hero.getBoundingClientRect().bottom <= 0;
}

export function ExitModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP).matches) return;
    let timeElapsed = false;
    const timer = window.setTimeout(() => {
      timeElapsed = true;
    }, MIN_TIME_MS);

    function onLeave(event: MouseEvent) {
      if (event.clientY > EXIT_EDGE_PX || !timeElapsed || !firstScreenGone()) return;
      if (!podeAbrirModal(Date.now(), lerCarimbos()) || !abrirGatilho("modal")) return;
      stop();
      returnFocusTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      marcar("modal_visto_em");
      setOpen(true);
    }

    function stop() {
      window.clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    }

    document.documentElement.addEventListener("mouseleave", onLeave);
    return stop;
  }, []);

  useEffect(() => {
    if (open) dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
  }, [open]);

  function close() {
    fecharGatilho("modal");
    setOpen(false);
    returnFocusTo.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div
        ref={dialogRef}
        className={styles.box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-saida-titulo"
        onKeyDown={onKeyDown}
      >
        <button type="button" className={styles.close} onClick={close} aria-label={exitModal.close}>
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="modal-saida-titulo" className={`display h-sm ${styles.title}`}>
          {exitModal.title}
        </h2>
        <DemoForm origem="modal" />
      </div>
    </div>
  );
}
