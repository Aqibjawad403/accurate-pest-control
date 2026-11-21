import Image from "next/image";
import { ArrowDot } from "@/components/ArrowButton";

const principles = [
  {
    title: "Our Mission",
    icon: "/about/mission.svg",
    iconWidth: 41,
    description:
      "By providing secure and reliable pest control practices, we aim to safeguard communities, business establishments, and households in the entire UAE. We will strive to provide high-quality customer service in that area using our advanced technology, licensed experts and our bespoke plan. Our business includes making a change to human health through the creation of healthier, pest-free environments through support of recognition in both prevention and sustainability.",
  },
  {
    title: "Our Vision",
    icon: "/about/vision.svg",
    iconWidth: 47,
    description:
      "Our vision is to produce an excellent quality facility for the most popular family experience brands in the UAE. We exist not just to push against frontiers but also to have core values of progress and trust, and community well-being. Our company is committed to both the enhancement of social health and the preservation of the corporate culture and our environment. All our actions shall be driven by our commitment to serve our customers by offering the best customer service to create compelling relationships and ensure sustained loyalty.",
  },
];

export default function AboutOverview() {
  return (
    <>
      <section
        className="w-full bg-[#F2F2F2]"
        data-gsap-section="about-overview"
      >
        <div className="mx-auto grid min-h-[560px] w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-16 py-12 max-lg:px-10 lg:grid-cols-[minmax(0,1fr)_641px] lg:gap-[70px] lg:py-20 max-sm:min-h-0 max-sm:px-6">
          <div className="flex flex-col items-start">
            <h2
              className="max-w-[560px] font-['Inter',var(--font-plus-jakarta),sans-serif] text-[45px] leading-none font-bold text-black max-sm:text-[32px]"
              data-gsap-split
            >
              Get to Know Who We Are &amp; What We Do
            </h2>
            <p
              className="mt-6 max-w-[600px] font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.4] font-normal text-[#666666] max-sm:text-[16px]"
              data-gsap-copy
            >
              Accurate Pest Control Services LLC provides reliable pest control
              services across all seven Emirates of the UAE, protecting
              residential, commercial, and industrial properties from termites
              and other pest infestations with professional and effective
              solutions.
            </p>

            <div
              className="mt-8 flex w-full flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-stretch"
              data-gsap-action
            >
              <span className="inline-flex h-[54px] w-[212px] items-center justify-between gap-2.5 rounded-[27px] bg-[#32A849] py-3 pr-3 pl-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-none font-normal text-white max-sm:w-full">
                <span>Company Profile</span>
                <ArrowDot variant="white" size="sm" />
              </span>
              <span className="inline-flex h-[56px] w-[286px] items-center justify-between gap-2.5 rounded-[27px] border border-[#32A849] bg-white py-3 pr-3 pl-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-none font-normal text-[#32A849] max-sm:w-full">
                <span>Pre-Qualification Termite</span>
                <ArrowDot variant="green" size="sm" />
              </span>
            </div>
          </div>

          <div
            className="h-[400px] w-full rounded-[20px] bg-[#D9D9D9] max-sm:h-[240px]"
            role="img"
            aria-label="Company profile image placeholder"
            data-gsap-reveal
          />
        </div>
      </section>

      <section
        className="w-full bg-white px-16 py-[100px] max-sm:px-6 max-sm:py-12"
        data-gsap-section="principles"
      >
        <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 gap-8 lg:grid-cols-2">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="min-h-[442px] rounded-[20px] bg-[#005F13] px-[30px] pt-10 pb-10 text-white max-sm:px-5"
              data-gsap-card
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[15px] bg-white">
                <Image
                  src={principle.icon}
                  alt=""
                  width={principle.iconWidth}
                  height={40}
                  aria-hidden
                />
              </div>
              <h3 className="mt-6 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[32px] leading-none font-bold">
                {principle.title}
              </h3>
              <p className="mt-4 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.4] font-normal max-sm:text-[16px]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
