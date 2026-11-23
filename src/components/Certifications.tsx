import Image from "next/image";
import styles from "./Certifications.module.css";

const certificates = [
  {
    src: "/home/client%201.png",
    alt: "NPMA — National Pest Management Association",
  },
  {
    src: "/home/client%202.png",
    alt: "DineSecure",
  },
  {
    src: "/home/client%203.png",
    alt: "BPCA — British Pest Control Association Observer",
  },
  {
    src: "/home/client%204.png",
    alt: "ISO 9001:2015 Certified Company",
  },
  {
    src: "/home/client%205.png",
    alt: "HACCP Certified",
  },
];

function CertCard({
  src,
  alt,
  gsap = false,
}: {
  src: string;
  alt: string;
  gsap?: boolean;
}) {
  return (
    <div
      className={
        gsap
          ? "flex h-[110px] w-full max-w-[260px] items-center justify-center rounded-[15px] border border-[#E7E7E7] bg-[#F2F2F2] px-5 py-4"
          : styles.card
      }
      data-gsap-card={gsap ? true : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={182}
        height={70}
        unoptimized
        className="h-[70px] w-[182px] object-contain opacity-100"
      />
    </div>
  );
}

function CertTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.track} aria-hidden={ariaHidden || undefined}>
      {certificates.map((cert) => (
        <CertCard key={`${ariaHidden ? "dup" : "main"}-${cert.src}`} {...cert} />
      ))}
    </div>
  );
}

export default function Certifications() {
  return (
    <section className="w-full px-5 py-12 sm:px-16 sm:py-16">
      <h2
        className="text-center text-[32px] leading-none font-semibold text-[#222222]"
        data-gsap-split
      >
        Recognized, Certified & Approved by UAE Authorities
      </h2>

      {/* Desktop / tablet grid */}
      <div className={styles.desktopGrid}>
        {certificates.map((cert) => (
          <CertCard key={cert.src} {...cert} gsap />
        ))}
      </div>

      {/* Mobile auto-scroll carousel */}
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          <CertTrack />
          <CertTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
