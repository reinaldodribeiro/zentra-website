import { cta, hero } from "@/content/site";
import { CheckIcon } from "@/components/ui/Icons";
import { LookupDemo } from "@/components/ui/LookupDemo";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import styles from "./Hero.module.css";

const [titleLead, titleTail = ""] = hero.title.split(hero.highlight);

export function Hero() {
  return (
    <section id="inicio" className={`section theme-dark ${styles.hero}`} aria-labelledby="inicio-titulo" data-observe>
      <div className={styles.backdrop} aria-hidden="true">
        <NetworkCanvas className={styles.network} />
        <span className={`glow-blue ${styles.glowBlue}`} />
        <span className={`glow-gold ${styles.glowGold}`} />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="inicio-titulo" className={`display h-xl ${styles.title}`}>
            <span className={`kicker ${styles.kicker}`}>{hero.kicker}</span>
            {titleLead}
            <span className="gradient-text">{hero.highlight}</span>
            {titleTail}
          </h1>
          <p className="lede">
            {hero.subtitle}
          </p>
          <div className={styles.actions}>
            <a href={cta.href} className="btn btn-primary">
              {cta.primary}
            </a>
            <a href={cta.secondaryHref} className="btn btn-ghost">
              {cta.secondary}
            </a>
          </div>
          <ul className={`mono ${styles.badges}`}>
            {hero.badges.map((badge) => (
              <li key={badge}>
                <CheckIcon className={styles.check} />
                {badge}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.demo}>
          <LookupDemo />
        </div>
      </div>
    </section>
  );
}
