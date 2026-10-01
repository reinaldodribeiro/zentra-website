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
      data-whatsapp-float
      aria-label="Chamar no WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
}
