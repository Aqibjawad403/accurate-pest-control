"use client";

import Image from "next/image";
import styles from "./ClientLogoStrip.module.css";

const clientLogos = [
  { file: "Adventureland Logo.svg", alt: "Adventureland" },
  { file: "Al Naboodah.svg", alt: "Al Naboodah" },
  { file: "Alansari 1.svg", alt: "Al Ansari" },
  { file: "Alpha Nero.svg", alt: "Alpha Nero" },
  { file: "Arenco Real Estate.svg", alt: "Arenco Real Estate" },
  { file: "Aster DM.svg", alt: "Aster DM" },
  { file: "Bunnys.svg", alt: "Bunny's" },
  { file: "Cedar School.svg", alt: "Cedar School" },
  { file: "Classic Family Restaurant.svg", alt: "Classic Family Restaurant" },
  { file: "copper kettle 2.svg", alt: "Copper Kettle" },
  { file: "Daal Chawal.svg", alt: "Daal Chawal" },
  { file: "Darb Al Saada School 1.svg", alt: "Darb Al Saada School" },
  { file: "Derma Laser Clinic.svg", alt: "Derma Laser Clinic" },
  { file: "Emssa Contracting.svg", alt: "Emssa Contracting" },
  { file: "FAKHRUDDIN REAL ESTATE.svg", alt: "Fakhruddin Real Estate" },
  { file: "Gan Bei.svg", alt: "Gan Bei" },
  { file: "GGFT.svg", alt: "GGFT" },
  { file: "GRM.svg", alt: "GRM" },
  { file: "Headstart.svg", alt: "Headstart" },
  { file: "JAMS.svg", alt: "JAMS" },
  { file: "Jungle Veterinary.svg", alt: "Jungle Veterinary" },
  { file: "Kishmish.svg", alt: "Kishmish" },
  { file: "LUXE GRAND.svg", alt: "Luxe Grand" },
  { file: "Mahboubi Poly Dental Clinic.svg", alt: "Mahboubi Poly Dental Clinic" },
  { file: "Nissan-Brand-Logo-RGB-B-w R.svg", alt: "Nissan" },
  { file: "Samayahotel.svg", alt: "Samaya Hotel" },
  { file: "Sharjah Amercian School.svg", alt: "Sharjah American School" },
  { file: "The City School.svg", alt: "The City School" },
  { file: "Tiger Properties.svg", alt: "Tiger Properties" },
  { file: "Time Hotel.svg", alt: "Time Hotel" },
].map((logo) => ({
  ...logo,
  src: `/client%20logos/${encodeURIComponent(logo.file)}`,
}));

function LogoTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className={styles.track} aria-hidden={ariaHidden || undefined}>
      {clientLogos.map((logo) => (
        <li className={styles.card} key={`${ariaHidden ? "dup" : "main"}-${logo.file}`}>
          <div className={styles.logoWrap}>
            <Image
              src={logo.src}
              alt={ariaHidden ? "" : logo.alt}
              width={197}
              height={70}
              unoptimized
              loading="eager"
              className={styles.logo}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ClientLogoStrip() {
  return (
    <section className={styles.section} aria-label="Our clients" data-gsap-logos>
      <hr className={styles.divider} />
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          <LogoTrack />
          <LogoTrack ariaHidden />
        </div>
      </div>
      <hr className={styles.divider} />
    </section>
  );
}
