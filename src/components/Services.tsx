import Image from "next/image";
import Link from "next/link";
import { ArrowDot } from "@/components/ArrowButton";
import { pestTreatments } from "@/data/pest-services";

export default function Services({
  showViewAll = true,
  background = "gray",
  overlapCards = false,
  limit,
}: {
  showViewAll?: boolean;
  background?: "gray" | "white";
  overlapCards?: boolean;
  limit?: number;
}) {
  const services = (limit ? pestTreatments.slice(0, limit) : pestTreatments).map(
    (service, index) => ({
      ...service,
      number: `${String(index + 1).padStart(2, "0")}.`,
      href: `/services?pest=${index}`,
    }),
  );

  return (
    <section
      className={`w-full px-16 py-16 max-lg:px-10 max-sm:px-5 max-sm:py-12 ${
        background === "white" ? "bg-white" : "bg-[#F2F2F2]"
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex h-[41px] w-[123px] items-center justify-center gap-2.5 rounded-[30px] border-[0.5px] border-[#B6B6B6] bg-[#EDEDED] px-[18px] py-[9px] opacity-100"
          data-gsap-badge
        >
          <span className="text-[18px] leading-none font-normal text-[#444444]">
            SERVICES
          </span>
        </div>

        <h2
          className="mt-6 max-w-[900px] text-center text-[45px] leading-none font-bold text-[#222222] max-sm:text-[28px]"
          data-gsap-split
        >
          Complete Pest Control Solutions for Every Environment
        </h2>
      </div>

      <div
        className={`mt-14 flex flex-col ${overlapCards ? "gap-4" : ""}`}
        data-gsap-overlap-cards={overlapCards ? "" : undefined}
      >
        {services.map((service, index) => (
          <div
            key={service.number}
            className={`grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[1fr_minmax(280px,640px)_1fr] lg:gap-10 ${
              overlapCards
                ? "sticky rounded-[20px] border border-[#D8D8D8] bg-white px-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] max-sm:!top-3 max-sm:gap-5 max-sm:py-6 motion-reduce:!static motion-reduce:!transform-none"
                : "border-b border-[#D8D8D8] last:border-b-0"
            }`}
            style={
              overlapCards
                ? {
                    top: `calc(96px + ${index * 12}px)`,
                    zIndex: index + 1,
                  }
                : undefined
            }
            data-gsap-row
          >
            <div className="flex flex-col gap-4">
              <span className="text-[28px] leading-none font-bold text-[#111111]">
                {service.number}
              </span>
              <h3 className="max-w-[280px] text-[32px] leading-none font-semibold text-[#111111] max-sm:text-[24px]">
                {service.title}
              </h3>
            </div>

            <div
              className={`image-zoom relative h-[250px] w-full max-w-[640px] justify-self-center rounded-[20px] bg-[#E0E0E0] opacity-100 lg:justify-self-stretch ${
                overlapCards ? "max-sm:h-[160px]" : ""
              }`}
              data-gsap-reveal
            >
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div
              className={`flex flex-col gap-6 ${overlapCards ? "max-sm:gap-4" : ""}`}
            >
              <p className="text-[16px] leading-[var(--line-height-normal)] font-normal text-[#666666]">
                {service.paragraphs[0]}
              </p>
              <Link
                href={service.href}
                className="text-[16px] leading-none font-normal text-[#666666] underline decoration-solid"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/pests"
            className="btn-green group inline-flex h-[54px] w-[218px] shrink-0 items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 text-[18px] leading-none font-normal"
          >
            <span>View All Services</span>
            <ArrowDot variant="white" />
          </Link>
        </div>
      )}
    </section>
  );
}
