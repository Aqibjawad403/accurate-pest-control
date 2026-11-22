const stats = [
  {
    end: 1000,
    suffix: "+",
    title: "Residential Clients",
    description:
      "Providing reliable pest control to keep homes safe, clean, and healthy.",
  },
  {
    end: 500,
    suffix: "+",
    title: "Commercial Sites",
    description:
      "Helping businesses maintain clean and pest-free environments.",
  },
  {
    end: 800,
    suffix: "+",
    title: "Sanitization Jobs",
    description:
      "Creating cleaner and healthier spaces through professional sanitization.",
  },
  {
    end: 99,
    suffix: "%",
    title: "Customer Satisfaction",
    description:
      "Earning customer trust through quality service and effective solutions.",
  },
];

const fullDescription = [
  "Accurate Pest Control Services LLC is a UAE pest management company delivering safe, municipality-approved solutions across all seven Emirates. We are Dubai Municipality Category A approved and ranked No. 1 on the official approved pest control companies list.",
  "Backed by trained teams, modern equipment, and Integrated Pest Management (IPM), we focus on long-term prevention using approved methods that meet local and international safety standards.",
  "We manage 600+ annual-contract clients across hotels, restaurants, malls, food processing, hospitals, schools, offices, warehouses, residential and staff accommodation, and construction firms—including pre- and post-construction termite control.",
  "Our services cover general pest control, termites, fumigation, rodents, cockroaches and insects, mosquitoes, bed bugs, bird control, netting, and disinfection—delivered by trained professionals with approved materials and strict quality control.",
  "We build lasting client relationships through professionalism, transparency, timely service, and consistent results as a trusted pest control partner across the UAE.",
];

export default function AboutUs({
  showFullDescription = false,
}: {
  showFullDescription?: boolean;
}) {
  return (
    <section className="w-full px-16 py-16 max-lg:px-10 max-sm:px-5 max-sm:py-12">
      {showFullDescription && (
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
          </div>
        </div>
      )}

      <div
        className={`${showFullDescription ? "mt-10" : ""} grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4`}
      >
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="group flex w-full flex-col rounded-[15px] border border-[#D8D8D8] bg-[#F2F2F2] p-6 opacity-100 transition-colors hover:border-[#32A849] hover:bg-[#32A849]"
            data-gsap-card
          >
            <p
              className="text-[44px] leading-none font-semibold text-[#222222] transition-colors group-hover:text-white"
              data-gsap-count={stat.end}
              data-gsap-suffix={stat.suffix}
            >
              {stat.end}
              {stat.suffix}
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
