import Link from "next/link";
import type { Metadata } from "next";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import HomeAnimations from "@/components/HomeAnimations";

export const metadata: Metadata = {
  title: "Blogs | Accurate Pest Control Services LLC",
  description:
    "Practical pest control tips and insights for a pest-free home and business.",
};

export default function BlogPage() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[420px] w-full overflow-visible rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <BannerMedia
            src={bannerImages.blog}
            alt="Writing and research for pest control insights"
            priority
          />
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[270px] right-16 left-16 z-10 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
            data-gsap-hero="copy"
          >
            <h1
              className="text-[55px] leading-none font-bold max-sm:text-[36px]"
              data-gsap-split
            >
              Blogs
            </h1>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">Blogs</span>
            </p>
          </div>
        </div>
      </section>
    </HomeAnimations>
  );
}
