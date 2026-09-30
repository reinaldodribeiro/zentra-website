"use client";

import { useEffect, useState } from "react";
import { links } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
  const [pastTop, setPastTop] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");

    const heroObserver = new IntersectionObserver(([entry]) => setPastTop(!entry.isIntersecting), {
      threshold: 0.2,
    });
    if (hero) heroObserver.observe(hero);

    const contactObserver = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      rootMargin: "-55% 0px 0px 0px",
      threshold: 0,
    });
    if (contact) contactObserver.observe(contact);

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const show = pastTop && !contactVisible;

  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      data-show={show}
      aria-label="Chamar no WhatsApp"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon className={styles.icon} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
