import { purposes } from "@/content/site";
import { PurposeSwitcher } from "@/components/ui/PurposeSwitcher";
import styles from "./Purpose.module.css";

export function Purpose() {
  return (
    <section
      id={purposes.id}
      className="section theme-dark"
      aria-labelledby="finalidade-titulo"
      data-observe
    >
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {purposes.kicker}
        </p>
        <h2 id="finalidade-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {purposes.title}
        </h2>
        <p className={`lede ${styles.lead}`} data-reveal style={{ ["--i" as string]: 2 }}>
          {purposes.lead}
        </p>
        <div data-reveal style={{ ["--i" as string]: 3 }}>
          <PurposeSwitcher />
        </div>
      </div>
    </section>
  );
}
