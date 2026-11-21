import { readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import styles from "./ClientsDirectory.module.css";

export const metadata = {
  title: "Our Clients | Accurate Pest Control Services LLC",
  description:
    "Explore the organizations that trust Accurate Pest Control Services across the UAE.",
};

const logoDirectory = path.join(process.cwd(), "public", "client logos");
const clientLogos = readdirSync(logoDirectory)
  .filter(
    (file) =>
      file.toLowerCase().endsWith(".svg") &&
      !/^line(?:[ -]\d+)?\.svg$/i.test(file),
  )
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

function getLogoAlt(file: string, index: number) {
  const name = path.parse(file).name;
  const hasBrandName =
    !/^(?:asset|group|rectangle|vector|image|layer)(?:\s|[-_]|$)/i.test(name);

  return hasBrandName ? name : `Client logo ${index + 1}`;
}

export default function ClientsPage() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[420px] w-full rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <div data-gsap-hero="nav">
            <Navbar activeHref="/clients" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[270px] right-16 left-16 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
            data-gsap-hero="copy"
          >
            <h1
              className="text-[55px] leading-none font-bold max-sm:text-[36px]"
              data-gsap-split
            >
              Our Clients
            </h1>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">Clients</span>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="clients-heading">
        <div className={styles.intro}>
          <span className={styles.badge}>Trusted Partnerships</span>
          <h2 className={styles.heading} id="clients-heading" data-gsap-split>
            Organizations That Trust Us
          </h2>
          <p className={styles.description}>
            We are proud to protect the people, places, and businesses of our
            clients across the UAE.
          </p>
        </div>

        <div className={styles.logoGrid} aria-label="Client logos">
          {clientLogos.map((file, index) => (
            <div className={`${styles.logoCell} image-zoom`} key={file}>
              <Image
                src={`/client%20logos/${encodeURIComponent(file)}`}
                alt={getLogoAlt(file, index)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </section>
    </HomeAnimations>
  );
}
