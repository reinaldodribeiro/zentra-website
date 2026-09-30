import { links } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Chamar no WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
