import Link from "next/link";
import { solutions } from "@/content/site";
import { ArrowRightIcon, BuildingIcon, CheckIcon, PhoneIcon, SheetIcon, StampIcon } from "@/components/ui/Icons";
import styles from "./Solutions.module.css";

const icons = { gold: PhoneIcon, blue: SheetIcon, green: BuildingIcon, purple: StampIcon } as const;

export function Solutions() {
  return (
    <section id={solutions.id} className="section section-alt" aria-labelledby="solucoes-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {solutions.kicker}
        </p>
        <h2 id="solucoes-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {solutions.title}
        </h2>
        <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
          {solutions.lead}
        </p>
        <ul className={styles.grid}>
          {solutions.items.map((item, i) => {
            const Icon = icons[item.color];
            return (
              <li
                key={item.title}
                className={`card card-accent ${styles.card}`}
                data-accent={item.color}
                data-reveal
                style={{ ["--i" as string]: i + 3 }}
              >
                <Icon className={styles.icon} />
                <h3 className="h-sm display">{item.title}</h3>
                <ul className={styles.points}>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckIcon className={styles.check} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href={item.href} className={styles.link}>
                  {solutions.linkLabel}
                  <ArrowRightIcon className={styles.arrow} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
