import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import styles from "./CareersPage.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Careers | Accurate Pest Control Services LLC",
  description:
    "Explore career opportunities and submit your application to Accurate Pest Control Services LLC.",
};

export default function CareersPage() {
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
            <Navbar activeHref="/careers" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[235px] right-16 left-16 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
            data-gsap-hero="copy"
          >
            <h1
              className="text-[clamp(32px,4.5vw,55px)] leading-[1.05] font-bold"
              data-gsap-split
            >
              Your Career Starts Here
            </h1>
            <p className="mt-4 max-w-[760px] text-[18px] leading-[1.6] font-normal max-sm:mt-3 max-sm:text-[15px] max-sm:leading-[1.5]">
              We&apos;re always looking for motivated and talented individuals to
              join our growing team. Submit your application and take the first
              step toward building a rewarding career with us.
            </p>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">Careers</span>
            </p>
          </div>
        </div>
      </section>

      <main className={`${styles.main} ${inter.className}`}>
        <section className={styles.formCard} aria-labelledby="career-form-title">
          <h2 id="career-form-title" className={styles.formTitle}>
            Let&apos;s Grow Together
          </h2>

          <form className={styles.form}>
            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span className={styles.label}>First Name *</span>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Last Name *</span>
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Phone Number *</span>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  placeholder="Phone No"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email Address *</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Position of Interest *</span>
                <select
                  className={`${styles.input} ${styles.select}`}
                  name="position"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Pest Control Technician">Pest Control Technician</option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Years of Experience *</span>
                <select
                  className={`${styles.input} ${styles.select}`}
                  name="experience"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="No experience">No experience</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </label>
            </div>

            <label className={styles.resumeField}>
              <span className={styles.label}>Upload Your Resume / CV *</span>
              <span className={styles.uploadArea}>
                <Image
                  src="/upload.svg"
                  alt=""
                  width={32}
                  height={40}
                  className={styles.uploadIcon}
                />
                <strong className={styles.uploadTitle}>
                  Upload Your Resume / CV
                </strong>
                <span className={styles.uploadHint}>
                  PDF or DOCX, Maximum 10 MB
                </span>
                <input
                  className={styles.fileInput}
                  type="file"
                  name="resume"
                  accept=".pdf,.docx"
                  required
                />
              </span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Short Introduction (Optional)</span>
              <textarea
                className={styles.textarea}
                name="introduction"
                placeholder="Tell us a little about yourself..."
                rows={5}
              />
            </label>

            <button className={styles.submitButton} type="submit">
              <span>Submit Application</span>
              <span className={styles.submitArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </button>
          </form>
        </section>
      </main>
    </HomeAnimations>
  );
}
