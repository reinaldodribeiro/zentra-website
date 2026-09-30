import { contact, finalCta, firm, links } from "@/content/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { WhatsAppIcon } from "@/components/ui/Icons";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section id={contact.id} className={`section theme-dark ${styles.final}`} aria-labelledby="contato-titulo" data-observe>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={`glow-blue ${styles.glowBlue}`} />
        <span className={`glow-gold ${styles.glowGold}`} />
      </div>
      <div className="container">
        <div className={styles.head}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {finalCta.kicker}
          </p>
          <h2 id="contato-titulo" className={`display h-xl ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {finalCta.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--i" as string]: 2 }}>
            {finalCta.body}
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.formSide} data-reveal style={{ ["--i" as string]: 3 }}>
            <ContactForm />
            <p className={`mono ${styles.privacy}`}>{contact.privacy}</p>
          </div>
          <aside className={`card ${styles.channels}`} aria-label={contact.channelsTitle} data-reveal style={{ ["--i" as string]: 4 }}>
            <h3 className="h-sm display">{contact.channelsTitle}</h3>
            <a href={links.whatsapp} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="btn-icon" />
              {contact.whatsappButton}
            </a>
            <ul className={styles.list}>
              <li>
                <a href={links.phone} className="mono link-line">
                  {firm.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={links.email} className="mono link-line">
                  {firm.email}
                </a>
              </li>
            </ul>
            <p className={styles.hours}>{contact.hours}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
