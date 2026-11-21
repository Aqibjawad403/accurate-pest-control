import { readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import styles from "./DocumentsPage.module.css";

export const metadata: Metadata = {
  title: "Official Licenses & Documents | Accurate Pest Control Services LLC",
  description:
    "View the official licenses, certifications, and documents of Accurate Pest Control Services LLC.",
};

const imageDirectory = path.join(
  process.cwd(),
  "public",
  "documents",
  "images",
);
const pdfDirectory = path.join(
  process.cwd(),
  "public",
  "documents",
  "documents",
);
const chemicalDocuments = [
  { name: "Ajman Approved Chemical List", validity: "17-Jan-2025 to 16-Jan-2026" },
  { name: "Ecotrol IC3", validity: "01-Mar-2026" },
  { name: "Tandem", validity: "31-Jul-2029" },
  { name: "Penta 250 FP", validity: "30-Dec-2029" },
  { name: "Maxforce Prime Roach Gel", validity: "31-Dec-2025" },
  { name: "Delta Super SC", validity: "09-Feb-2028" },
  { name: "Deltacid Speedy SC", validity: "27-Sep-2025" },
  { name: "Cimexa Dust Powder", validity: "15-Sep-2028" },
  { name: "Ratimor Wax Blocks", validity: "31-Dec-2025" },
  { name: "Starbar Fly Trap Attractant", validity: "(---)" },
  { name: "Lambdastar Ultra Capsulate", validity: "31-May-2028" },
  { name: "Cymine 10 EC", validity: "12-Apr-2026" },
  { name: "Provecta", validity: "(---)" },
  { name: "Delta Park", validity: "31-Dec-2029" },
  { name: "Sindoxa", validity: "12-June-2026" },
  { name: "Surefire Spectrum", validity: "30-June-2028" },
  { name: "Magnum Cockroach Gel", validity: "31-Dec-2025" },
  { name: "Pestphos", validity: "09-Sep-2025" },
  { name: "Temprid", validity: "01-Apr-2028" },
  { name: "Intice Gel", validity: "30-Dec-2028" },
  { name: "Intice Granules", validity: "21-Sep-2028" },
  { name: "Thifast", validity: "17-Feb-2028" },
  { name: "Agita WG", validity: "11-June-2028" },
  { name: "Acetellic Ec 50", validity: "21-May-2028" },
  { name: "Cymine Plus EC", validity: "21-Feb-2027" },
  { name: "Quick Bayt Granules", validity: "01-Sep-2025" },
];

type ChemicalDownloadType = "MSDS" | "COR";

function toPdfMap(files: string[]) {
  return new Map(
    files
      .filter((file) => /\.pdf$/i.test(file))
      .map((file) => [path.parse(file).name.toLowerCase(), file]),
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

function getDocuments() {
  const imageFiles = readdirSync(imageDirectory).filter((file) =>
    /\.(?:svg|png|jpe?g|webp)$/i.test(file),
  );
  const pdfFiles = readdirSync(pdfDirectory).filter((file) =>
    /\.pdf$/i.test(file),
  );
  const pdfByName = new Map(
    pdfFiles.map((file) => [path.parse(file).name.toLowerCase(), file]),
  );

  return imageFiles
    .map((image) => {
      const name = path.parse(image).name;

      return {
        image,
        pdf: pdfByName.get(name.toLowerCase()),
        title: name.replace(/[_-]+/g, " "),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function documentUrl(file: string, type: "images" | "documents") {
  return `/documents/${type}/${encodeURIComponent(file)}`;
}

export default function DocumentsPage() {
  const documents = getDocuments();

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
            <Navbar activeHref="/documents" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[235px] right-16 left-16 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
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
                  {document.pdf ? (
                    <a
                      className={styles.documentLink}
                      href={documentUrl(document.pdf, "documents")}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${document.title} PDF`}
                    >
                      <span className={`${styles.preview} image-zoom`}>
                        <Image
                          src={documentUrl(document.image, "images")}
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
                          src={documentUrl(document.image, "images")}
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
                <article className={styles.chemicalCard} key={document.name}>
                  <div className={styles.chemicalInfo}>
                    <h3 className={styles.chemicalName}>{document.name}</h3>
                    <p className={styles.validityLabel}>Valid Till</p>
                    <p className={styles.validityDate}>{document.validity}</p>
                  </div>
                  <div className={styles.downloadActions}>
                    {(["MSDS", "COR"] as const).map((type, index) => {
                      const pdf = chemicalPdfs[type].get(
                        document.name.toLowerCase(),
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
