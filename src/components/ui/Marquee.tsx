import styles from "./Marquee.module.css";

type MarqueeProps = {
  items: readonly string[];
};

export function Marquee({ items }: MarqueeProps) {
  return (
    <div className={styles.marquee}>
      <ul className={`marquee-track ${styles.track}`}>
        {items.map((item) => (
          <li key={item} className={styles.pill}>
            {item}
          </li>
        ))}
        {items.map((item) => (
          <li key={`${item}-copy`} className={`${styles.pill} ${styles.copy}`} aria-hidden="true">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
