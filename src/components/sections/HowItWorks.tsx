import { howItWorks } from "@/content/site";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <section
      id={howItWorks.id}
      className="section section-alt"
      aria-labelledby="como-funciona-titulo"
      data-observe
    >
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {howItWorks.kicker}
        </p>
        <h2 id="como-funciona-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {howItWorks.title}
        </h2>
        <ol className={styles.steps}>
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal style={{ ["--i" as string]: i + 2 }}>
              <span className={`mono ${styles.number}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-sm display">{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
