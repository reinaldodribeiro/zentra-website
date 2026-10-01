"use client";

import { useEffect, useState } from "react";
import { mobileBar } from "@/content/site";
import styles from "./MobileBar.module.css";

const MOBILE = "(max-width: 1023px)";
const BAR_HEIGHT = "56px";

export function MobileBar() {
  const [mobile, setMobile] = useState(false);
  const [heroGone, setHeroGone] = useState(false);
  const [blockers, setBlockers] = useState(0);

  useEffect(() => {
    const query = window.matchMedia(MOBILE);
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!mobile || !hero || !contact) return;
    const candidates: Array<Element | null> = [
      contact,
      document.getElementById("newsletter"),
      document.querySelector("footer"),
    ];
    const watched = candidates.filter((element) => element !== null);
    const onScreen = new Set<Element>();
    const heroObserver = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting));
    const blockerObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setBlockers(onScreen.size);
    });
    heroObserver.observe(hero);
    for (const element of watched) blockerObserver.observe(element);
    return () => {
      heroObserver.disconnect();
      blockerObserver.disconnect();
    };
  }, [mobile]);

  const visible = mobile && heroGone && blockers === 0;

  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    root.style.setProperty("--mobile-bar-h", BAR_HEIGHT);
    return () => {
      root.style.removeProperty("--mobile-bar-h");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <a href="#contato" className={styles.button}>
        {mobileBar.label}
      </a>
    </div>
  );
}
