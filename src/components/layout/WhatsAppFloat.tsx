import { whatsappLink } from "@/content/site";
import { voices, type VoiceKey } from "@/content/voices";
import { WhatsAppIcon } from "@/components/ui/Icons";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat({ voice = "inicial" }: { voice?: VoiceKey }) {
  return (
    <a
      href={whatsappLink(voices[voice].whatsapp.padrao)}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      data-whatsapp-float
      data-voice={voice}
      aria-label="Chamar no WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
}
