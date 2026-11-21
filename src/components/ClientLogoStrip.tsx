import Image from "next/image";
import styles from "./ClientLogoStrip.module.css";

const clientLogos = [
  {
    src: "/client%20logos/Adventureland%20Logo.svg",
    alt: "Adventureland",
  },
  {
    src: "/client%20logos/Nissan-Brand-Logo-RGB-B-w%20R.svg",
    alt: "Nissan",
  },
  {
    src: "/client%20logos/Aster%20DM.svg",
    alt: "Aster DM",
  },
  {
    src: "/client%20logos/Al%20Naboodah.svg",
    alt: "Al Naboodah",
  },
];

export default function ClientLogoStrip() {
  return (
    <section className={styles.section} aria-label="Our clients">
      <hr className={styles.divider} />
      <div className={styles.cards}>
        {clientLogos.map((logo) => (
          <div className={styles.card} key={logo.alt} data-gsap-card>
            <div className={styles.logoWrap}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={197}
                height={50}
                className={styles.logo}
              />
            </div>
          </div>
        ))}
      </div>
      <hr className={styles.divider} />
    </section>
  );
}
