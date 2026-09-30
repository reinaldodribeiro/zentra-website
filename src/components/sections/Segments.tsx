import { segments } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import styles from "./Segments.module.css";

export function Segments() {
  return (
    <section id={segments.id} className="section" aria-labelledby="para-quem-titulo" data-observe>
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {segments.kicker}
        </p>
        <h2 id="para-quem-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {segments.title}
        </h2>
      </div>
      <div className={styles.band} data-reveal style={{ ["--i" as string]: 2 }}>
        <Marquee items={segments.items} />
      </div>
      <div className="container">
        <p className={styles.footnote} data-reveal style={{ ["--i" as string]: 3 }}>
          {segments.footnote}
        </p>
      </div>
    </section>
  );
}
