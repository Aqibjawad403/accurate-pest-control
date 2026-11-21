import { ArrowDot } from "@/components/ArrowButton";

const licenses = [
  "Official license image placeholder 1",
  "Official license image placeholder 2",
  "Official license image placeholder 3",
];

export default function OfficialLicenses() {
  return (
    <section
      className="w-full bg-[#F2F2F2] px-16 py-20 max-lg:px-10 max-sm:px-6 max-sm:py-12"
      data-gsap-section="official-licenses"
    >
      <div className="mx-auto min-h-[435px] w-full max-w-[1312px]">
        <div className="flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start">
          <h2
            className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[45px] leading-none font-bold text-black max-sm:text-[32px]"
            data-gsap-split
          >
            Our Official Licenses &amp; Certifications
          </h2>
          <span
            className="btn-green group inline-flex h-[54px] w-[163px] shrink-0 items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-none font-normal"
            data-gsap-action
          >
            <span>View More</span>
            <ArrowDot variant="white" size="sm" />
          </span>
        </div>

        <div className="mt-[104px] flex flex-wrap items-center justify-between gap-6 xl:gap-0 max-sm:mt-12 max-sm:flex-col max-sm:items-stretch">
          {licenses.map((label) => (
            <div
              key={label}
              className="h-[257px] w-full max-w-[417px] shrink-0 bg-[#D9D9D9] max-sm:h-[200px] max-sm:max-w-none"
              role="img"
              aria-label={label}
              data-gsap-card
            />
          ))}
        </div>
      </div>
    </section>
  );
}
