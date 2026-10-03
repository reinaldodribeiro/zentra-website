import { whyZentra } from "@/content/site";
import {
  DeviceIcon,
  KeyIcon,
  LayersIcon,
  PhoneIcon,
  SheetIcon,
  ShieldIcon,
  SpeechIcon,
  StampIcon,
} from "@/components/ui/Icons";
import styles from "./WhyZentra.module.css";

const icons = [
  LayersIcon,
  PhoneIcon,
  SheetIcon,
  DeviceIcon,
  StampIcon,
  KeyIcon,
  SpeechIcon,
  ShieldIcon,
] as const;

export function WhyZentra() {
  return (
    <section id={whyZentra.id} className="section" aria-labelledby="por-que-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {whyZentra.kicker}
        </p>
        <h2 id="por-que-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {whyZentra.title}
        </h2>
        <ul className={styles.grid}>
          {whyZentra.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} className={`card ${styles.card}`} data-reveal style={{ ["--i" as string]: (i % 4) + 2 }}>
                <Icon className={styles.icon} />
                <h3 className="display">{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
