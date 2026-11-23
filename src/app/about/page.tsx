import Link from "next/link";
import AboutUs from "@/components/AboutUs";
import AboutOverview from "@/components/AboutOverview";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import CEOMessage from "@/components/CEOMessage";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import OfficialLicenses from "@/components/OfficialLicenses";
import OurTeam from "@/components/OurTeam";

export default function AboutPage() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div className="relative h-[420px] w-full overflow-visible rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]">
          <BannerMedia
            src={bannerImages.about}
            alt="Professional team collaborating in the office"
            priority
          />
          <div className="relative z-30">
            <Navbar activeHref="/about" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div className="absolute top-[270px] right-16 left-16 z-10 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6">
            <h1
              className="text-[55px] leading-none font-bold max-sm:text-[36px]"
              data-gsap-split
            >
              About Us
            </h1>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">About Us</span>
            </p>
          </div>
        </div>
      </section>

      <div data-gsap-section="about">
        <AboutUs showFullDescription />
      </div>
      <AboutOverview />
      <CEOMessage />
      <div data-gsap-section="team">
        <OurTeam background="white" />
      </div>
      <OfficialLicenses />
    </HomeAnimations>
  );
}
