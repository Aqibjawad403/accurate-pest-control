import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import CareersForm from "@/components/CareersForm";
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
          className="relative h-[420px] w-full overflow-hidden rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <BannerMedia
            src={bannerImages.careers}
            alt="Professionals collaborating on career opportunities"
            priority
          />
          <div className="relative z-10" data-gsap-hero="nav">
            <Navbar activeHref="/careers" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[235px] right-16 left-16 z-10 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
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

          <CareersForm />
        </section>
      </main>
    </HomeAnimations>
  );
}
