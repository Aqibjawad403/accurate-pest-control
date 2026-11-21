"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  formatPestTypeName,
  getPestShortName,
  pestTreatments,
  serviceOptions,
} from "@/data/pest-services";

function parseIndex(raw: string | null, max: number): number | null {
  if (raw == null || raw === "") return null;
  const index = Number.parseInt(raw, 10);
  if (!Number.isFinite(index) || index < 0 || index >= max) return null;
  return index;
}

export default function ServicesHero({
  pest: pestParam,
  type: typeParam,
  service: serviceParam = null,
}: {
  pest: string | null;
  type: string | null;
  service?: string | null;
}) {
  const pestIndex = parseIndex(pestParam, pestTreatments.length);
  const pest = pestIndex != null ? pestTreatments[pestIndex] : null;
  const types = pest?.types ?? [];
  const typeIndex = parseIndex(typeParam, types.length);
  const activeType = pest && typeIndex != null ? types[typeIndex] : null;
  const serviceIndex = parseIndex(serviceParam, serviceOptions.length);
  const service =
    pest == null && serviceIndex != null
      ? serviceOptions[serviceIndex]
      : null;

  const typeTitle = activeType ? formatPestTypeName(activeType.name) : null;
  const pestTitle = pest?.title ?? null;
  const serviceTitle = service?.title ?? null;
  const bannerTitle = typeTitle ?? pestTitle ?? serviceTitle ?? "Services";

  const pestShort = pest ? getPestShortName(pest.title) : null;
  const pestCrumb = pestShort
    ? `${pestShort.endsWith("s") ? pestShort : `${pestShort}s`} (Treatment)`
    : null;

  return (
    <section
      className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
      data-gsap-section="hero"
    >
      <div
        className="relative h-[420px] w-full rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
        data-gsap-hero="shell"
      >
        <div data-gsap-hero="nav">
          <Navbar activeHref="/services" />
        </div>
        <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

        <div
          className="absolute top-[270px] right-16 left-16 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
          data-gsap-hero="copy"
        >
          <h1
            className="text-[55px] leading-none font-bold max-sm:text-[32px] max-sm:leading-[1.1]"
            data-gsap-split
          >
            {bannerTitle}
          </h1>
          <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px] max-sm:leading-[1.45]">
            <Link href="/" className="transition-opacity hover:opacity-80">
              Home
            </Link>
            <span aria-hidden="true"> &gt; </span>
            {activeType && pestCrumb != null && pestIndex != null ? (
              <>
                <Link
                  href="/services"
                  className="transition-opacity hover:opacity-80"
                >
                  Services
                </Link>
                <span aria-hidden="true"> &gt; </span>
                <Link
                  href={`/services?pest=${pestIndex}`}
                  className="transition-opacity hover:opacity-80"
                >
                  {pestCrumb}
                </Link>
                <span aria-hidden="true"> &gt; </span>
                <span aria-current="page">{typeTitle}</span>
              </>
            ) : pestTitle ? (
              <>
                <Link
                  href="/services"
                  className="transition-opacity hover:opacity-80"
                >
                  Services
                </Link>
                <span aria-hidden="true"> &gt; </span>
                <span aria-current="page">{pestTitle}</span>
              </>
            ) : serviceTitle ? (
              <>
                <Link
                  href="/services"
                  className="transition-opacity hover:opacity-80"
                >
                  Services
                </Link>
                <span aria-hidden="true"> &gt; </span>
                <span aria-current="page">{serviceTitle}</span>
              </>
            ) : (
              <span aria-current="page">Services</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
