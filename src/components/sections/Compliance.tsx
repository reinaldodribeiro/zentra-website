import { compliance } from "@/content/site";
import { CheckIcon } from "@/components/ui/Icons";
import styles from "./Compliance.module.css";

export function Compliance() {
  return (
    <section
      id={compliance.id}
      className="section"
      aria-labelledby="conformidade-titulo"
      data-observe
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {compliance.kicker}
          </p>
          <h2 id="conformidade-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {compliance.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--i" as string]: 2 }}>
            {compliance.body}
          </p>
        </div>
        <div className={`card ${styles.list}`} data-reveal style={{ ["--i" as string]: 2 }}>
          <ul className={styles.points}>
            {compliance.points.map((point) => (
              <li key={point} className={styles.point}>
                <span className={styles.mark}>
                  <CheckIcon />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className={styles.closing}>
            {compliance.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
