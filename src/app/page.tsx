import Link from "next/link";
import { ArrowDot } from "@/components/ArrowButton";
import AboutUs from "@/components/AboutUs";
import Certifications from "@/components/Certifications";
import ClientLogoStrip from "@/components/ClientLogoStrip";
import ContactSection from "@/components/ContactSection";
import InsightsSection from "@/components/InsightsSection";
import Navbar from "@/components/Navbar";
import OurTeam from "@/components/OurTeam";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HomeAnimations from "@/components/HomeAnimations";

export default function Home() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[min(720px,78vh)] min-h-[620px] w-full overflow-visible rounded-[28px] bg-[#005F13] opacity-100 max-sm:h-auto max-sm:min-h-[560px] max-sm:pb-8 sm:h-[800px] sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <div data-gsap-hero="nav">
            <Navbar activeHref="/" />
          </div>

          <div className="absolute right-16 bottom-12 left-16 flex flex-col gap-4 max-sm:right-5 max-sm:bottom-6 max-sm:left-5">
            <div
              className="flex min-h-[38px] w-[370px] items-center justify-center gap-2.5 rounded-[30px] border-[0.5px] border-white bg-[#FFFFFF40] px-[18px] py-[9px] opacity-100 max-sm:w-fit max-sm:max-w-full"
              data-gsap-hero="badge"
            >
              <span className="text-center text-[14px] leading-[18px] font-normal text-white sm:text-[16px] sm:leading-none sm:whitespace-nowrap">
                TRUSTED PEST CONTROL EXPERTS IN UAE
              </span>
            </div>

            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <h1
                className="max-w-[620px] text-[55px] leading-none font-bold text-white max-sm:text-[32px]"
                data-gsap-split
              >
                Smarter Solutions for Complete Pest Protection.
              </h1>

              <div className="flex max-w-[520px] flex-col items-start gap-5">
                <p
                  className="text-[18px] leading-[var(--line-height-normal)] font-normal text-white"
                  data-gsap-hero="copy"
                >
                  Professional pest control solutions for residential,
                  commercial, and industrial properties across the UAE. We
                  combine experienced teams, effective treatments, and modern
                  technology to keep your environment safe, clean, and
                  protected.
                </p>

                <Link
                  href="/contact"
                  className="btn-white group relative z-10 inline-flex h-[54px] w-fit shrink-0 items-center justify-between gap-2.5 whitespace-nowrap rounded-[27px] py-3 pr-3 pl-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-center text-[18px] leading-none font-normal tracking-normal opacity-100"
                  data-gsap-hero="button"
                >
                  <span className="whitespace-nowrap">Get a Free Quote</span>
                  <ArrowDot variant="green" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div data-gsap-section="certifications"><Certifications /></div>
      <div data-gsap-section="about"><AboutUs /></div>
      <div data-gsap-section="services"><Services limit={4} overlapCards /></div>
      <div data-gsap-section="team"><OurTeam /></div>
      <div data-gsap-section="testimonials"><Testimonials /></div>
      <div data-gsap-section="logos"><ClientLogoStrip /></div>
      <div data-gsap-section="contact"><ContactSection /></div>
      <div data-gsap-section="insights"><InsightsSection /></div>
    </HomeAnimations>
  );
}
