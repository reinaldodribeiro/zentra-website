import { comparison } from "@/content/site";
import styles from "./Comparison.module.css";

export function Comparison() {
  return (
    <section id={comparison.id} className="section" aria-labelledby="comparacao-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {comparison.kicker}
        </p>
        <h2 id="comparacao-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {comparison.title}
        </h2>
        <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
          {comparison.body}
        </p>

        <div className={`card ${styles.tableWrap}`} data-reveal style={{ ["--i" as string]: 3 }}>
          <table className={styles.table}>
            <caption className="sr-only">
              Comparação: {comparison.withoutLabel} e {comparison.withLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">{comparison.withoutLabel}</th>
                <th scope="col">{comparison.withLabel}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.without}>
                  <td className={styles.without}>
                    <span className={styles.no} aria-hidden="true">
                      ✗
                    </span>
                    {row.without}
                  </td>
                  <td className={styles.with}>
                    <span className={styles.yes} aria-hidden="true">
                      ✓
                    </span>
                    {row.with}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.lists}>
          <section className={`card ${styles.list}`} aria-labelledby="comparacao-sem" data-reveal style={{ ["--i" as string]: 3 }}>
            <h3 id="comparacao-sem" className={`h-sm display ${styles.listTitle}`}>
              {comparison.withoutLabel}
            </h3>
            <ul>
              {comparison.rows.map((row) => (
                <li key={row.without} className={styles.without}>
                  <span className={styles.no} aria-hidden="true">
                    ✗
                  </span>
                  {row.without}
                </li>
              ))}
            </ul>
          </section>
          <section className={`card ${styles.list} ${styles.listWith}`} aria-labelledby="comparacao-com" data-reveal style={{ ["--i" as string]: 4 }}>
            <h3 id="comparacao-com" className={`h-sm display ${styles.listTitle}`}>
              {comparison.withLabel}
            </h3>
            <ul>
              {comparison.rows.map((row) => (
                <li key={row.with} className={styles.with}>
                  <span className={styles.yes} aria-hidden="true">
                    ✓
                  </span>
                  {row.with}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
