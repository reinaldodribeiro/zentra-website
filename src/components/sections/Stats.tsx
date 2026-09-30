import { stats } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import styles from "./Stats.module.css";

export function Stats() {
  return (
    <section id={stats.id} className={`section ${styles.stats}`} aria-label="Números da Zentra">
      <ul className={`container ${styles.grid}`}>
        {stats.items.map((item) => (
          <li key={item.label} className={styles.item}>
            <Counter
              value={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
              className={styles.value}
            />
            <span className={`mono ${styles.label}`}>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
