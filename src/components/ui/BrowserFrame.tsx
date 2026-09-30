import Image from "next/image";
import styles from "./BrowserFrame.module.css";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
};

export function BrowserFrame({ src, alt, width, height, sizes, priority = false }: BrowserFrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={82}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={styles.image}
      />
    </div>
  );
}
