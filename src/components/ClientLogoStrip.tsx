import Image from "next/image";
import styles from "./ClientLogoStrip.module.css";

const clientLogos = [
  { src: "/home/client%206.png", alt: "Emirates Driving Institute" },
  { src: "/home/client%207.png", alt: "JAMS" },
  { src: "/home/client%208.png", alt: "Al Naboodah" },
  { src: "/home/client%209.png", alt: "Adventureland" },
  { src: "/home/client%2010.png", alt: "Botim" },
];

export default function ClientLogoStrip() {
  return (
    <section className={styles.section} aria-label="Our clients">
      <hr className={styles.divider} />
      <div className={styles.cards}>
        {clientLogos.map((logo) => (
          <div className={styles.card} key={logo.src} data-gsap-card>
            <div className={styles.logoWrap}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={197}
                height={70}
                unoptimized
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
