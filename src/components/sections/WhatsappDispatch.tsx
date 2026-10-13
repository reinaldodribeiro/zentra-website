import Link from "next/link";
import { whatsappDispatch } from "@/content/site";
import { ArrowRightIcon } from "@/components/ui/Icons";
import styles from "./WhatsappDispatch.module.css";

export function WhatsappDispatch() {
  return (
    <section id={whatsappDispatch.id} className="section" aria-labelledby="disparo-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {whatsappDispatch.kicker}
        </p>
        <h2 id="disparo-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {whatsappDispatch.title}
        </h2>
        <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
          {whatsappDispatch.lead}
        </p>
        <ol className={styles.grid}>
          {whatsappDispatch.steps.map((step, i) => (
            <li key={step.title} className={`card ${styles.card}`} data-reveal style={{ ["--i" as string]: i + 3 }}>
              <span className={`mono ${styles.number}`}>{i + 1}</span>
              <h3 className="h-sm display">{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className={styles.note} data-reveal style={{ ["--i" as string]: 6 }}>
          {whatsappDispatch.note}
        </p>
        <p className={styles.pageLink} data-reveal style={{ ["--i" as string]: 7 }}>
          <Link href={whatsappDispatch.pageLink.href} className={styles.link}>
            {whatsappDispatch.pageLink.label}
            <ArrowRightIcon className={styles.arrow} />
          </Link>
        </p>
      </div>
    </section>
  );
}
