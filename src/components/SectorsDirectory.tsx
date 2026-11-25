"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ArrowDot } from "@/components/ArrowButton";
import DirectorySidebarList from "@/components/DirectorySidebarList";
import FormStatusMessage from "@/components/FormStatusMessage";
import { useMailForm } from "@/hooks/useMailForm";
import { sectors } from "@/data/sectors";

function parseIndex(raw: string | null, max: number): number | null {
  if (raw == null || raw === "") return null;
  const index = Number.parseInt(raw, 10);
  if (!Number.isFinite(index) || index < 0 || index >= max) return null;
  return index;
}

function InspectionForm() {
  const { status, isSubmitting, handleSubmit, clearStatus } = useMailForm({
    subject: "Free Inspection Request",
  });

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
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-5"
      >
        <input type="hidden" name="_honey" value="" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Free Inspection Request" />
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
          disabled={isSubmitting}
          className="btn-white group mt-auto inline-flex h-[54px] w-[132px] items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 text-[18px] leading-none font-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-['Inter',var(--font-plus-jakarta),sans-serif] disabled:opacity-60"
        >
          <span>{isSubmitting ? "Sending..." : "Submit"}</span>
          <ArrowDot variant="green" />
        </button>
        <FormStatusMessage status={status} onClear={clearStatus} />
      </form>
    </section>
  );
}

export default function SectorsDirectory() {
  const router = useRouter();
  const pathname = usePathname() || "/sectors";
  const searchParams = useSearchParams();
  const sectorParam = searchParams.get("sector");
  const sectorFromQuery = parseIndex(sectorParam, sectors.length);
  const [activeIndex, setActiveIndex] = useState(sectorFromQuery ?? 0);
  const activeSector = sectors[activeIndex];
  const sectorContentRef = useRef<HTMLElement>(null);
  const previousActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (sectorFromQuery == null) return;
    setActiveIndex(sectorFromQuery);
  }, [sectorFromQuery]);

  useEffect(() => {
    if (pathname === "/sectors" && sectorParam == null) return;
    router.replace("/sectors", { scroll: false });
  }, [pathname, router, sectorParam]);

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
      className="bg-white pt-[107px] pb-[100px] pl-16 max-lg:pl-10 max-md:px-6 max-md:pt-14 max-md:pb-14"
      data-gsap-section="sectors-directory"
    >
      <div className="grid w-full grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-20 pr-16 max-lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] max-lg:gap-12 max-lg:pr-10 max-md:grid-cols-1 max-md:gap-10 max-md:pr-0">
        <div
          className="flex w-full max-w-[416px] flex-col gap-10"
          data-gsap-sector-sidebar
        >
          <nav aria-label="Sectors" data-gsap-sidebar>
            <h2 className="mb-4 text-[28px] leading-none font-bold text-[#111111] max-sm:text-[24px]">
              Sectors
            </h2>
            <DirectorySidebarList
              items={sectors}
              activeIndex={activeIndex}
              onSelect={(index) => {
                setActiveIndex(index);
                if (pathname !== "/sectors" || sectorParam != null) {
                  router.replace("/sectors", { scroll: false });
                }
              }}
            />
          </nav>

          <InspectionForm />
        </div>

        {/* Offset matches sidebar h2 (28px) + mb-4 so detail lines up with the list */}
        <article
          key={activeSector.title}
          ref={sectorContentRef}
          className="mt-11 min-w-0 max-md:mt-0"
          aria-live="polite"
          data-gsap-sector-content
        >
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[20px] bg-[#D9D9D9]">
            <Image
              src={activeSector.image}
              alt={`${activeSector.title} pest control`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
              priority={activeIndex === 0}
            />
          </div>
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
