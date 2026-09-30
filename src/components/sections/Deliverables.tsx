import { deliverables } from "@/content/site";
import { SheetIcon, StampIcon, TargetIcon } from "@/components/ui/Icons";
import styles from "./Deliverables.module.css";

const icons = { target: TargetIcon, sheet: SheetIcon, stamp: StampIcon } as const;

export function Deliverables() {
  return (
    <section
      id={deliverables.id}
      className="section section-alt"
      aria-labelledby="entregas-titulo"
      data-observe
    >
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {deliverables.kicker}
        </p>
        <h2 id="entregas-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {deliverables.title}
        </h2>
        <ul className={styles.grid}>
          {deliverables.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className={styles.card} data-reveal style={{ ["--i" as string]: i + 2 }}>
                <Icon className={styles.icon} />
                <h3 className="h-sm display">{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
