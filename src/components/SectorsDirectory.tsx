"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDot } from "@/components/ArrowButton";
import { sectors } from "@/data/sectors";

function InspectionForm() {
  return (
    <section
      aria-labelledby="inspection-heading"
      className="box-border flex min-h-[490px] w-full flex-col rounded-[20px] bg-[#005F13] px-[30px] py-[40px] text-white max-sm:min-h-0 max-sm:px-5 max-sm:py-7"
    >
      <h2
        id="inspection-heading"
        className="mb-[26px] text-[30px] leading-none font-bold font-['Inter',var(--font-plus-jakarta),sans-serif]"
      >
        Get a Free Inspection
      </h2>
      <form
        action="mailto:info@accuratepestcontrol.ae?subject=Free%20Inspection%20Request"
        method="post"
        encType="text/plain"
        className="flex flex-1 flex-col gap-5"
      >
        <label className="sr-only" htmlFor="sector-service">
          Service type
        </label>
        <select
          id="sector-service"
          name="Service"
          defaultValue=""
          required
          className="h-[50px] w-full rounded-[10px] border border-[#DADADA] bg-white px-3 text-[18px] leading-none font-normal text-[#C1C1C1] font-['Inter',var(--font-plus-jakarta),sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <option value="" disabled>
            Select Service
          </option>
          <option>General Pest Concern</option>
          <option>Termite</option>
          <option>Fumigation</option>
          <option>Disinfection</option>
          <option>Thermal Fogger</option>
          <option>Cleaning</option>
        </select>

        <label className="sr-only" htmlFor="sector-name">
          Name
        </label>
        <input
          id="sector-name"
          name="Name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          required
          className="h-[50px] w-full rounded-[10px] border border-[#DADADA] bg-white px-3 text-[18px] leading-none font-normal text-[#222222] placeholder:text-[#C1C1C1] font-['Inter',var(--font-plus-jakarta),sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />

        <label className="sr-only" htmlFor="sector-phone">
          Phone number
        </label>
        <input
          id="sector-phone"
          name="Phone"
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          required
          className="h-[50px] w-full rounded-[10px] border border-[#DADADA] bg-white px-3 text-[18px] leading-none font-normal text-[#222222] placeholder:text-[#C1C1C1] font-['Inter',var(--font-plus-jakarta),sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />

        <label className="sr-only" htmlFor="sector-email">
          Email
        </label>
        <input
          id="sector-email"
          name="Email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className="h-[50px] w-full rounded-[10px] border border-[#DADADA] bg-white px-3 text-[18px] leading-none font-normal text-[#222222] placeholder:text-[#C1C1C1] font-['Inter',var(--font-plus-jakarta),sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />

        <button
          type="submit"
          className="btn-white group mt-auto inline-flex h-[54px] w-[132px] items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 text-[18px] leading-none font-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-['Inter',var(--font-plus-jakarta),sans-serif]"
        >
          <span>Submit</span>
          <ArrowDot variant="green" />
        </button>
      </form>
    </section>
  );
}

export default function SectorsDirectory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSector = sectors[activeIndex];
  const sectorContentRef = useRef<HTMLElement>(null);
  const previousActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (previousActiveIndex.current === activeIndex) return;
    previousActiveIndex.current = activeIndex;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const article = sectorContentRef.current;
    if (!article) return;

    const tween = gsap.fromTo(
      article,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
    );

    return () => {
      tween.kill();
    };
  }, [activeIndex]);

  return (
    <section
      className="bg-white px-16 pt-[80px] pb-[100px] max-lg:px-10 max-md:px-6 max-md:pt-14 max-md:pb-14"
      data-gsap-section="sectors-directory"
    >
      <div className="grid w-full grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-20 max-lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] max-lg:gap-12 max-md:grid-cols-1 max-md:gap-10">
        <div
          className="flex w-full max-w-[416px] flex-col gap-10"
          data-gsap-sector-sidebar
        >
          <nav aria-label="Sectors">
            <h1 className="mb-4 text-[28px] leading-none font-bold text-[#111111] max-sm:text-[24px]">
              Sectors
            </h1>
            <ul className="w-full overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
              {sectors.map((sector, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={sector.title} className="w-full">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIndex(index)}
                      className={`flex h-[70px] w-full items-center justify-between gap-4 text-left font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-none transition-colors duration-300 max-sm:h-[56px] max-sm:text-[16px] ${
                        isActive
                          ? "rounded-[20px] bg-[#32A849] px-5 font-semibold text-white"
                          : "px-[25px] font-normal text-[#222222] hover:text-[#32A849]"
                      }`}
                    >
                      <span>{sector.title}</span>
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isActive ? "bg-white" : "bg-[#32A849]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 12 11"
                          className={`h-[11px] w-3 ${isActive ? "text-[#32A849]" : "text-white"}`}
                          aria-hidden="true"
                        >
                          <path
                            d="M1 5.5h9m0 0L6 1.5m4 4-4 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {index < sectors.length - 1 ? (
                      <div className="mx-auto h-0 w-[366px] max-w-[calc(100%-50px)] border-t border-[#D9D9D9]" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <InspectionForm />
        </div>

        <article
          key={activeSector.title}
          ref={sectorContentRef}
          className="min-w-0"
          aria-live="polite"
          data-gsap-sector-content
        >
          <div
            className="h-[320px] w-full rounded-[20px] bg-[#D9D9D9] max-sm:h-[220px]"
            role="img"
            aria-label={`${activeSector.title} pest control`}
          />
          <h2 className="mt-4 text-[40px] leading-[1.15] font-bold text-[#222222] max-sm:text-[28px]">
            {activeSector.title}
          </h2>
          <p className="mt-3 text-[16px] leading-[1.7] font-normal text-[#666666]">
            {activeSector.intro}
          </p>
          <h3 className="mt-6 text-[22px] leading-[1.2] font-bold text-[#222222]">
            {activeSector.howWeHelpTitle}
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-[#666666] marker:text-[#005F13]">
            {activeSector.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[1.7] font-normal text-[#666666]">
            {activeSector.outro}
          </p>
        </article>
      </div>
    </section>
  );
}
