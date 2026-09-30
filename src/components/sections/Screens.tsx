import { screens } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import styles from "./Screens.module.css";

export function Screens() {
  return (
    <section
      id={screens.id}
      className="section section-alt"
      aria-labelledby="sistema-titulo"
      data-observe
    >
      <div className="container">
        <p className="kicker" data-reveal style={{ ["--i" as string]: 0 }}>
          {screens.kicker}
        </p>
        <h2 id="sistema-titulo" className={`display h-lg ${styles.title}`} data-reveal style={{ ["--i" as string]: 1 }}>
          {screens.title}
        </h2>
        <ul className={styles.list}>
          {screens.items.map((item, i) => (
            <li key={item.src} className={`${styles.item} ${i === 0 ? styles.wide : ""}`} data-reveal style={{ ["--i" as string]: 2 }}>
              <figure className={styles.figure}>
                <BrowserFrame
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={i === 0 ? "(min-width: 1024px) 760px, 92vw" : "(min-width: 1024px) 600px, 92vw"}
                />
                <figcaption className={styles.caption}>{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
