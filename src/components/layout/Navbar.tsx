"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cta, firm, nav } from "@/content/site";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const onHome = usePathname() === "/";
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty("overflow");
      return;
    }
    document.documentElement.style.setProperty("overflow", "hidden");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === toggleRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onResize);

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.documentElement.style.removeProperty("overflow");
    };
  }, [open, close]);

  return (
    <header className={styles.header} data-scrolled={scrolled} data-open={open} data-over-dark={!scrolled && !open}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <a href={resolve("#inicio")} className={styles.brand} aria-label={`${firm.name}, voltar ao início`} onClick={() => setOpen(false)}>
          <Image
            src={!scrolled && !open ? "/brand/zentra-logo-on-dark.svg" : "/brand/zentra-logo.svg"}
            alt=""
            width={80}
            height={56}
            className={styles.brandMark}
            loading="eager"
            unoptimized
          />
        </a>

        <ul className={styles.links}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={resolve(item.href)} className={`link-line ${styles.link}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href={resolve(cta.href)} className={`btn btn-primary ${styles.cta}`}>
            {cta.primary}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.bar} aria-hidden="true" />
            <span className={styles.bar} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div id={menuId} ref={panelRef} className={styles.panel} aria-hidden={!open}>
        <ul className={styles.panelLinks}>
          {nav.map((item, i) => (
            <li key={item.href} style={{ ["--i" as string]: i }}>
              <Link href={resolve(item.href)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span className={`mono ${styles.panelIndex}`}>{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.panelFooter} style={{ ["--i" as string]: nav.length }}>
          <Link
            href={resolve(cta.href)}
            className="btn btn-primary"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {cta.primary}
          </Link>
        </div>
      </div>
    </header>
  );
}
