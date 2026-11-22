import { readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import { getOfficialDocuments } from "@/data/official-documents";
import styles from "./DocumentsPage.module.css";

export const metadata: Metadata = {
  title: "Official Licenses & Documents | Accurate Pest Control Services LLC",
  description:
    "View the official licenses, certifications, and documents of Accurate Pest Control Services LLC.",
};

const chemicalDocuments = [
  { name: "DIPTRON COCKROACH GEL", validity: "29-10-2025 to 28-10-2030" },
  { name: "DK 10.2", validity: "19-05-2026 to 18-05-2031" },
  { name: "ROEDOFIN BLOCK", validity: "28-10-2025 to 31-12-2026" },
  { name: "ROEDOFIN FRESH BAIT", validity: "01-11-2025 to 31-12-2026" },
  { name: "Solfac EC 050", validity: "18-03-2022 to 17-03-2027" },
  { name: "Balanstick", validity: "21-02-2022" },
  { name: "Ecogel Cucarachas", validity: "06-05-2026 to 27-03-2027" },
  { name: "Advion Insect Granular Bait", validity: "28-01-2022 to 27-01-2027" },
  { name: "MAGNUM GEL CAFARDS", validity: "15-02-2026 to 31-12-2027" },
  { name: "Snake Out", validity: "07-10-2020" },
  { name: "PRO-SURFACTANT", validity: "26-08-2021" },
  { name: "Protect Pro Rodenticide Pulp", validity: "09-04-2025 to 31-12-2026" },
  { name: "SINDOXA ANT GEL", validity: "26-04-2026 to 12-03-2029" },
  { name: "CYPERBASE", validity: "18-01-2022 to 15-12-2026" },
  { name: "ANTCOMPTROL PRO", validity: "23-06-2023" },
  { name: "BLUCYP DP PLUS", validity: "25-06-2024 to 24-06-2029" },
  { name: "Cyperguard 25 EC", validity: "08-05-2024 to 07-05-2029" },
  { name: "ECO SNAKE BLOCKER", validity: "08-12-2023" },
  { name: "KULCYPERIN 100/3 EC", validity: "01-03-2022 to 28-02-2027" },
  { name: "BuyBlocker Snake Deter", validity: "29-07-2029" },
  { name: "Ecotrol IC3", validity: "06-03-2026 to 01-03-2027" },
  { name: "Tandem", validity: "01-08-2022 to 31-07-2027" },
  { name: "Rat Kill Blox", validity: "12-04-2024 to 30-06-2028" },
  { name: "Ratimor Wax Blocks", validity: "16-08-2024 to 31-12-2026" },
  { name: "Deltacid Speedy SC", validity: "15-09-2025 to 26-09-2030" },
  { name: "Ratimor Soft Bait", validity: "04-03-2026 to 31-12-2026" },
  { name: "Cymina 10 EC", validity: "07-04-2026 to 11-04-2031" },
  { name: "Provecta", validity: "14-07-2022" },
  { name: "Delta Park", validity: "24-09-2024 to 30-12-2029" },
  { name: "Sindoxa", validity: "09-06-2026 to 16-03-2029" },
  { name: "Surefire Spectrum", validity: "15-08-2023 to 30-06-2028" },
  { name: "Advion", validity: "11-10-2021 to 16-10-2026" },
  { name: "Pestphos", validity: "08-09-2025 to 08-09-2030" },
  { name: "Temprid", validity: "13-07-2023 to 01-04-2028" },
  { name: "Intice 10 Premium Bait", validity: "28-09-2023 to 21-09-2028" },
  { name: "Penta", validity: "23-01-2025 to 30-12-2029" },
  { name: "Thifast Granules Fly Bait", validity: "04-03-2026 to 13-02-2029" },
  { name: "Thifast 10 WG Fly Bait", validity: "02-03-2026 to 13-02-2029" },
  { name: "Agita WG", validity: "27-10-2023 to 11-06-2028" },
  { name: "Acetellic Ec 50", validity: "30-05-2023 to 21-05-2028" },
  { name: "Cymina Plus EC", validity: "10-03-2022 to 21-02-2027" },
  { name: "Quick Bayt Granules", validity: "03-04-2025 to 05-09-2027" },
  { name: "Intice Liquid Bait", validity: "17-01-2024 to 30-12-2028" },
  { name: "ROACHBAIT", validity: "06-03-2024 to 30-12-2028" },
  { name: "Sniper 10% SC", validity: "23-02-2024 to 22-02-2029" },
  { name: "Bromadiolone 0.005% RB", validity: "24-05-2024 to 03-08-2029" },
  { name: "Sharda Lambda-Cyhalothrin 10% CS", validity: "16-06-2023 to 15-06-2028" },
  { name: "Hawker Plus Polvo Mojable 10%", validity: "26-06-2025 to 23-12-2029" },
  { name: "Bithor Dual Action Insecticide", validity: "13-11-2023 to 03-06-2028" },
];

type ChemicalDownloadType = "MSDS" | "COR";

function normalizeChemicalKey(value: string) {
  return value.toLowerCase().replaceAll("/", "-");
}

function toPdfMap(files: string[]) {
  return new Map(
    files
      .filter((file) => /\.pdf$/i.test(file))
      .map((file) => [normalizeChemicalKey(path.parse(file).name), file]),
  );
}

const chemicalPdfs = {
  MSDS: toPdfMap(
    readdirSync(path.join(process.cwd(), "public", "documents", "msds")),
  ),
  COR: toPdfMap(
    readdirSync(path.join(process.cwd(), "public", "documents", "cor")),
  ),
};

export default function DocumentsPage() {
  const documents = getOfficialDocuments();

  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[420px] w-full overflow-hidden rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <BannerMedia
            src={bannerImages.documents}
            alt="Official documents and paperwork on a desk"
            priority
          />
          <div className="relative z-10" data-gsap-hero="nav">
            <Navbar activeHref="/documents" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[235px] right-16 left-16 z-10 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
            data-gsap-hero="copy"
          >
            <h1
              className="text-[clamp(32px,4.5vw,55px)] leading-[1.05] font-bold"
            >
              Our Documents
            </h1>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">Documents</span>
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="official-documents-heading"
      >
        <div className={styles.intro}>
          <h2 className={styles.heading} id="official-documents-heading">
            <span>Our Official Licenses,</span>
            <span>Certifications &amp; Documents</span>
          </h2>
          <p className={styles.description}>
            Recognized as one of UAE&apos;s top pest control companies, we offer
            professional pest management services to customers in Dubai,
            Sharjah, Ajman, Abu Dhabi, Ras Al Khaimah, Fujairah, and Umm Al
            Quwain guaranteeing trustworthy treatments, quick responses, and
            total satisfaction for residences, businesses and warehouses.
          </p>
        </div>

        {documents.length > 0 ? (
          <>
            <div className={styles.documentGrid}>
              {documents.map((document) => (
                <article className={styles.documentCard} key={document.image}>
                  {document.pdfUrl ? (
                    <a
                      className={styles.documentLink}
                      href={document.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${document.title} PDF`}
                    >
                      <span className={`${styles.preview} image-zoom`}>
                        <Image
                          src={document.imageUrl}
                          alt={`${document.title} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 417px"
                          className={styles.image}
                        />
                      </span>
                    </a>
                  ) : (
                    <>
                      <span className={`${styles.preview} image-zoom`}>
                        <Image
                          src={document.imageUrl}
                          alt={`${document.title} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 417px"
                          className={styles.image}
                        />
                      </span>
                      <span className={styles.missingPdf}>
                        Matching PDF not found
                      </span>
                    </>
                  )}
                </article>
              ))}
            </div>
            <div className={styles.divider} aria-hidden="true" />
            <div className={styles.chemicalGrid}>
              {chemicalDocuments.map((document) => (
                <article
                  className={styles.chemicalCard}
                  key={`${document.name}-${document.validity}`}
                >
                  <div className={styles.chemicalInfo}>
                    <h3 className={styles.chemicalName}>{document.name}</h3>
                    <p className={styles.validityLabel}>Valid Till</p>
                    <p className={styles.validityDate}>{document.validity}</p>
                  </div>
                  <div className={styles.downloadActions}>
                    {(["MSDS", "COR"] as const).map((type, index) => {
                      const pdf = chemicalPdfs[type].get(
                        normalizeChemicalKey(document.name),
                      );
                      const content = (
                        <>
                          <span>{type}</span>
                          <Image
                            src="/download.svg"
                            alt=""
                            width={15}
                            height={15}
                            className={styles.downloadIcon}
                          />
                          {index === 0 && (
                            <span
                              className={styles.actionDivider}
                              aria-hidden="true"
                            />
                          )}
                        </>
                      );

                      return pdf ? (
                        <a
                          className={styles.downloadButton}
                          href={`/documents/${type.toLowerCase()}/${encodeURIComponent(pdf)}`}
                          key={type}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${type} PDF for ${document.name}`}
                        >
                          {content}
                        </a>
                      ) : (
                        <span
                          className={`${styles.downloadButton} ${styles.downloadButtonDisabled}`}
                          key={type}
                          aria-disabled="true"
                          title={`${type} PDF not available yet`}
                        >
                          {content}
                        </span>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.emptyState}>No documents are available yet.</p>
        )}
      </section>
    </HomeAnimations>
  );
}
