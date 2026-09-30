import { diagnosis } from "@/content/site";
import styles from "./Diagnosis.module.css";

export function Diagnosis() {
  return (
    <section id={diagnosis.id} className="section" aria-labelledby="diagnostico-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {diagnosis.kicker}
        </p>
        <h2 id="diagnostico-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {diagnosis.title}
        </h2>
        <ol className={styles.grid}>
          {diagnosis.items.map((item, i) => (
            <li key={item.title} className={`card ${styles.card}`} data-reveal style={{ ["--i" as string]: i + 2 }}>
              <span className={`mono ${styles.number}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-sm display">{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>
        <p className={styles.closing} data-reveal style={{ ["--i" as string]: 5 }}>
          {diagnosis.closing}
        </p>
      </div>
    </section>
  );
}
