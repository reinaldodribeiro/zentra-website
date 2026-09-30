import { faq } from "@/content/site";
import { Accordion } from "@/components/ui/Accordion";
import styles from "./Faq.module.css";

const items = faq.items.map((item) => ({ title: item.question, body: item.answer }));

export function Faq() {
  return (
    <section
      id={faq.id}
      className="section section-alt"
      aria-labelledby="perguntas-titulo"
      data-observe
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
            {faq.kicker}
          </p>
          <h2 id="perguntas-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
            {faq.title}
          </h2>
        </div>
        <div data-reveal style={{ ["--i" as string]: 2 }}>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
