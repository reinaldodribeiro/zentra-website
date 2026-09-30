import { advocacy, advocacyLink } from "@/content/site";
import {
  ArrowRightIcon,
  BankIcon,
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  CoinsIcon,
  ScaleIcon,
  SpeechIcon,
} from "@/components/ui/Icons";
import styles from "./Advocacy.module.css";

const icons = {
  Previdenciário: ClockIcon,
  Trabalhista: BriefcaseIcon,
  "Bancário e revisional": BankIcon,
  Cível: ScaleIcon,
  "Recuperação de crédito": CoinsIcon,
} as const;

export function Advocacy() {
  return (
    <section id={advocacy.id} className="section section-alt" aria-labelledby="advocacia-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {advocacy.kicker}
        </p>
        <h2 id="advocacia-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {advocacy.title}
        </h2>
        <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
          {advocacy.lead}
        </p>
        <ul className={styles.grid}>
          {advocacy.items.map((item, i) => {
            const Icon = icons[item.specialty];
            return (
              <li
                key={item.specialty}
                className={`card ${styles.card}`}
                data-reveal
                style={{ ["--i" as string]: i + 3 }}
              >
                <Icon className={styles.icon} />
                <h3 className="h-sm display">{item.specialty}</h3>
                <p className={styles.body}>{item.body}</p>
                <ul className={styles.points}>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckIcon className={styles.check} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a className={styles.link} href={advocacyLink(item.specialty)} target="_blank" rel="noopener noreferrer">
                  {advocacy.linkPrefix} {item.specialty.toLowerCase()}
                  <ArrowRightIcon className={styles.arrow} />
                </a>
              </li>
            );
          })}
          <li
            className={`card ${styles.card}`}
            data-reveal
            style={{ ["--i" as string]: advocacy.items.length + 3 }}
          >
            <SpeechIcon className={styles.icon} />
            <h3 className="h-sm display">{advocacy.other.specialty}</h3>
            <p className={styles.body}>{advocacy.other.body}</p>
            <a
              className={`${styles.link} ${styles.linkEnd}`}
              href={advocacyLink(advocacy.other.specialty)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {advocacy.linkPrefix} {advocacy.other.specialty.toLowerCase()}
              <ArrowRightIcon className={styles.arrow} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
