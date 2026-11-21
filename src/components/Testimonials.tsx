import Image from "next/image";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 fill-[#F5C518]"
    >
      <path d="M10 1.5l2.35 5.72 6.15.54-4.68 4.12 1.4 5.97L10 14.9l-5.22 3.05 1.4-5.97L1.5 7.76l6.15-.54L10 1.5z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-white px-16 py-16 max-lg:px-10 max-sm:px-5 max-sm:py-12">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[640px_1fr] lg:gap-16">
        <div
          className="h-[498px] w-full max-w-[640px] rounded-[20px] bg-[#E0E0E0] opacity-100 max-sm:h-[300px]"
          data-gsap-reveal
        />

        <div className="flex min-w-0 flex-col">
          <div
            className="inline-flex h-[41px] w-fit items-center justify-center gap-2.5 rounded-[30px] border-[0.5px] border-[#B6B6B6] bg-[#EDEDED] px-[18px] py-[9px] opacity-100"
            data-gsap-copy
          >
            <span className="text-[18px] leading-none font-normal text-[#444444]">
              WHAT OUR CLIENTS SAY
            </span>
          </div>

          <h2
            className="mt-6 max-w-[520px] text-[45px] leading-none font-bold text-[#111111] max-sm:text-[28px]"
            data-gsap-split
          >
            Hear It From Our Happy Clients
          </h2>

          <div className="relative mt-10">
            <Image
              src="/coma 1.svg"
              alt=""
              width={69}
              height={50}
              className="pointer-events-none absolute -top-2 left-0 h-[50px] w-[69px]"
              aria-hidden
            />

            <p className="relative z-10 pt-10 text-[18px] leading-[var(--line-height-normal)] font-normal text-[#666666]">
              Sprays and traps weren&apos;t enough to stop the ongoing cockroach
              problem in our kitchen. For cockroach pest control, we got in
              touch with Accurate Pest Control. They performed an extensive
              examination and addressed unnoticed hidden areas. The kitchen has
              been spotless ever since, with no insects and complete peace of
              mind.
            </p>

            <div className="mt-4 flex justify-end">
              <Image
                src="/coma 2.svg"
                alt=""
                width={69}
                height={50}
                className="h-[50px] w-[69px]"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-2 border-t border-[#D8D8D8] pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[18px] leading-none font-bold text-[#111111]">
                  Fatima A., Dubai Marina
                </p>
                <p className="mt-2 text-[16px] leading-none font-normal text-[#666666]">
                  House Wife
                </p>
              </div>

              <div className="flex items-center gap-1" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
