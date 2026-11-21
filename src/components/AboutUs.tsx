import Link from "next/link";
import { ArrowDot } from "@/components/ArrowButton";

const stats = [
  {
    value: "1000+",
    title: "Residential Clients",
    description:
      "Providing reliable pest control to keep homes safe, clean, and healthy.",
  },
  {
    value: "500+",
    title: "Commercial Sites",
    description:
      "Helping businesses maintain clean and pest-free environments.",
  },
  {
    value: "800+",
    title: "Sanitization Jobs",
    description:
      "Creating cleaner and healthier spaces through professional sanitization.",
  },
  {
    value: "99%",
    title: "Customer Satisfaction",
    description:
      "Earning customer trust through quality service and effective solutions.",
  },
];

const fullDescription = [
  "Accurate Pest Control Services LLC is a professionally established pest management company in the United Arab Emirates, delivering reliable, safe, and municipality approved pest control solutions across all seven Emirates. The company is Dubai Municipality approved under Category A and is proudly positioned No. 1 on the official Dubai Municipality list of approved pest control companies, demonstrating the highest level of regulatory compliance and operational excellence.",
  "With a strong foundation built on technical expertise, trained manpower, and modern equipment, Accurate Pest Control Services LLC provides comprehensive pest control solutions in line with Integrated Pest Management (IPM) principles. Our approach focuses on long-term prevention, environmental responsibility, and the use of approved chemicals and methods that meet both local regulations and international safety standards.",
  "We currently manage 600+ clients on annual contract basis, serving a diverse range of sectors including hotels and hospitality establishments, restaurants and catering facilities, shopping malls and retail outlets, food processing and manufacturing units, hospitals and healthcare facilities, schools and educational institutions, commercial offices, warehouses and storage facilities, residential and staff accommodations, as well as construction, engineering and consulting companies, particularly for pre- and post-construction termite control applications.",
  "Our scope of services includes general pest control, termite control, fumigation services, rodent control, cockroach and insect management, mosquito control, bed bug treatment, bird control, netting and disinfection services. All services are executed by trained professionals using approved materials, documented procedures and strict quality control measures.",
  "Accurate Pest Control Services LLC is committed to building long-term client relationships through professionalism, transparency, timely service delivery and consistent results. Our continued growth, strong client retention and regulatory recognition reflect our dedication to excellence, in addition to our position as a trusted pest control partner across the UAE.",
];

export default function AboutUs({
  showFullDescription = false,
}: {
  showFullDescription?: boolean;
}) {
  return (
    <section className="w-full px-16 py-16 max-lg:px-10 max-sm:px-5 max-sm:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[206px]">
        <div
          className="flex h-[41px] w-[130px] shrink-0 items-center justify-center gap-2.5 rounded-[30px] border-[0.5px] border-[#B6B6B6] bg-[#EDEDED] px-[18px] py-[9px] opacity-100"
          data-gsap-badge
        >
          <span className="text-[18px] leading-none font-normal text-[#444444]">
            ABOUT US
          </span>
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col items-start gap-8"
          data-gsap-copy
        >
          {showFullDescription ? (
            <div className="flex w-full flex-col gap-5">
              {fullDescription.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[18px] leading-[1.7] font-normal text-[#444444] max-sm:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="w-full text-[28px] leading-[36px] font-bold text-[#111111] max-sm:text-[22px] max-sm:leading-[30px]">
              Accurate Pest Control Services LLC provides reliable pest
              management solutions across all seven Emirates of the UAE. Our
              trained team uses modern equipment and Integrated Pest
              Management (IPM) to protect residential, commercial, and
              industrial spaces, prevent infestations, and create healthier
              environments.
            </p>
          )}

          {!showFullDescription && (
            <Link
              href="/about"
              className="group inline-flex h-[54px] w-[200px] shrink-0 items-center justify-between gap-2.5 rounded-[27px] bg-[#32A849] py-3 pr-3 pl-5 text-[18px] leading-none font-normal text-white transition-opacity hover:opacity-95"
            >
              <span>More About Us</span>
              <ArrowDot variant="white" />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="group flex w-full flex-col rounded-[15px] border border-[#D8D8D8] bg-[#F2F2F2] p-6 opacity-100 transition-colors hover:border-[#32A849] hover:bg-[#32A849]"
            data-gsap-card
          >
            <p className="text-[44px] leading-none font-semibold text-[#222222] transition-colors group-hover:text-white">
              {stat.value}
            </p>
            <div className="mt-4 mb-4 border-t border-[#D8D8D8] transition-colors group-hover:border-white/40" />
            <h3 className="text-[20px] leading-none font-medium text-[#222222] transition-colors group-hover:text-white">
              {stat.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[var(--line-height-normal)] font-normal text-[#666666] transition-colors group-hover:text-white">
              {stat.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
