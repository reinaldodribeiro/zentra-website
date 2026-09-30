import { cta, hero } from "@/content/site";
import { CheckIcon } from "@/components/ui/Icons";
import { LookupDemo } from "@/components/ui/LookupDemo";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import styles from "./Hero.module.css";

const [titleLead, titleTail = ""] = hero.title.split(hero.highlight);

export function Hero() {
  return (
    <section id="inicio" className={`section theme-dark ${styles.hero}`} data-observe>
      <div className={styles.backdrop} aria-hidden="true">
        <NetworkCanvas className={styles.network} />
        <span className={`glow-blue ${styles.glowBlue}`} />
        <span className={`glow-gold ${styles.glowGold}`} />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {hero.kicker}
          </p>
          <h1 className={`display h-xl ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {titleLead}
            <span className="gradient-text">{hero.highlight}</span>
            {titleTail}
          </h1>
          <p className="lede" data-reveal style={{ ["--i" as string]: 2 }}>
            {hero.subtitle}
          </p>
          <div className={styles.actions} data-reveal style={{ ["--i" as string]: 3 }}>
            <a href={cta.href} className="btn btn-primary">
              {cta.primary}
            </a>
            <a href={cta.secondaryHref} className="btn btn-ghost">
              {cta.secondary}
            </a>
          </div>
          <ul className={`mono ${styles.badges}`} data-reveal style={{ ["--i" as string]: 4 }}>
            {hero.badges.map((badge) => (
              <li key={badge}>
                <CheckIcon className={styles.check} />
                {badge}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.demo} data-reveal style={{ ["--i" as string]: 3 }}>
          <LookupDemo />
        </div>
      </div>
    </section>
  );
}
