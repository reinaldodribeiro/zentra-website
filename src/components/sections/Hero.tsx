import { cta, hero, links } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={`section ${styles.hero}`} data-observe>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {hero.kicker}
          </p>
          <h1 className={`display h-xl ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {hero.title}
          </h1>
          <p className="lede" data-reveal style={{ ["--i" as string]: 2 }}>
            {hero.subtitle}
          </p>
          <div className={styles.actions} data-reveal style={{ ["--i" as string]: 3 }}>
            <a href={cta.href} className="btn btn-primary">
              {cta.primary}
            </a>
            <a href={links.system} className={`link-line ${styles.client}`}>
              {hero.clientLink}
            </a>
          </div>
        </div>
        <div className={styles.shot} data-reveal style={{ ["--i" as string]: 2 }}>
          <BrowserFrame
            src="/images/tela-visao-geral.jpg"
            alt={hero.screenAlt}
            width={1054}
            height={420}
            sizes="(min-width: 1024px) 620px, 92vw"
            priority
          />
        </div>
      </div>
      <ul className={`container mono ${styles.proofs}`} data-reveal style={{ ["--i" as string]: 4 }}>
        {hero.proofs.map((proof) => (
          <li key={proof}>{proof}</li>
        ))}
      </ul>
    </section>
  );
}
