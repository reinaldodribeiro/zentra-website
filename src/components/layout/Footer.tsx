import Image from "next/image";
import { firm, footer } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`theme-dark ${styles.footer}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Image
            src="/brand/zentra-logo-on-dark.svg"
            alt={firm.name}
            width={120}
            height={84}
            className={styles.logo}
            unoptimized
          />
          <p className={styles.name}>{firm.name}</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className={styles.list}>
            {footer.links.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-line">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <p className="mono">{footer.legal}</p>
      </div>
    </footer>
  );
}
