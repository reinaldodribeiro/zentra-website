import { contact, firm, links } from "@/content/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { WhatsAppIcon } from "@/components/ui/Icons";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section
      id={contact.id}
      className="section"
      aria-labelledby="contato-titulo"
      data-observe
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.formSide}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {contact.kicker}
          </p>
          <h2 id="contato-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {contact.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--i" as string]: 2 }}>
            {contact.body}
          </p>
          <div className={styles.form} data-reveal style={{ ["--i" as string]: 3 }}>
            <ContactForm />
          </div>
        </div>
        <aside className={styles.channels} aria-label={contact.channelsTitle} data-reveal style={{ ["--i" as string]: 3 }}>
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
    </section>
  );
}
