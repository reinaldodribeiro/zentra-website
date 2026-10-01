import Image from "next/image";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferences";
import { firm, footer } from "@/content/site";
import { InstagramIcon, SpeechIcon } from "@/components/ui/Icons";
import { linkProps } from "@/lib/externalLink";
import styles from "./Footer.module.css";

const linkIcons = { speech: SpeechIcon, instagram: InstagramIcon };

function LinkIcon({ name }: { name: keyof typeof linkIcons }) {
  const Icon = linkIcons[name];
  return <Icon className={styles.icon} strokeWidth={3} />;
}

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
        <nav aria-label="Rodapé" className={styles.columns}>
          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className={`mono ${styles.columnTitle}`}>{column.title}</p>
              <ul className={styles.list}>
                {column.links.map((item) => (
                  <li key={item.label}>
                    {"action" in item ? (
                      <CookiePreferencesButton label={item.label} className="link-line" />
                    ) : (
                      <a
                        {...linkProps(item.href)}
                        className={"icon" in item ? `link-line ${styles.withIcon}` : "link-line"}
                      >
                        {"icon" in item ? <LinkIcon name={item.icon} /> : null}
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <p className="mono">{footer.legal}</p>
      </div>
    </footer>
  );
}
