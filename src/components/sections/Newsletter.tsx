import { newsletter } from "@/content/site";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import styles from "./Newsletter.module.css";

export function Newsletter() {
  return (
    <section id={newsletter.id} className={`section section-alt ${styles.news}`} aria-labelledby="newsletter-titulo" data-observe>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="newsletter-titulo" className="display h-lg" data-reveal style={{ ["--i" as string]: 0 }}>
            {newsletter.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--i" as string]: 1 }}>
            {newsletter.body}
          </p>
        </div>
        <div className={styles.form} data-reveal style={{ ["--i" as string]: 2 }}>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
