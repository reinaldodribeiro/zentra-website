import Link from "next/link";
import { creditAnalysis } from "@/content/site";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { ScoreDemo } from "@/components/ui/ScoreDemo";
import styles from "./CreditAnalysis.module.css";

export function CreditAnalysis() {
  return (
    <section id={creditAnalysis.id} className="section" aria-labelledby="analise-de-credito-titulo" data-observe>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {creditAnalysis.kicker}
          </p>
          <h2 id="analise-de-credito-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {creditAnalysis.title}
          </h2>
          <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
            {creditAnalysis.lead}
          </p>
          <ul className={styles.points} data-reveal style={{ ["--i" as string]: 3 }}>
            {creditAnalysis.points.map((point) => (
              <li key={point}>
                <CheckIcon className={styles.check} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className={styles.pageLink} data-reveal style={{ ["--i" as string]: 4 }}>
            <Link href={creditAnalysis.pageLink.href} className={styles.link}>
              {creditAnalysis.pageLink.label}
              <ArrowRightIcon className={styles.arrow} />
            </Link>
          </p>
        </div>
        <div className={styles.demo} data-reveal style={{ ["--i" as string]: 3 }}>
          <ScoreDemo />
        </div>
      </div>
    </section>
  );
}
