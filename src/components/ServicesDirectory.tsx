"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDot } from "@/components/ArrowButton";
import DirectorySidebarList from "@/components/DirectorySidebarList";
import ServicesFaq from "@/components/ServicesFaq";
import {
  formatPestTypeName,
  getPestShortName,
  getPestTypeHeadline,
  getPestTypeParagraphs,
  pestTreatments,
  serviceOptions,
  type PestType,
  type ServiceAboutSection,
  type ServiceDetail,
} from "@/data/pest-services";

function AboutArrowList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.4] font-normal text-[#444444] max-sm:text-[16px]"
        >
          <Image
            src="/selector.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0 -rotate-90 opacity-100"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AboutSectionBlock({ section }: { section: ServiceAboutSection }) {
  const items = section.items ?? [];
  const benefits = section.benefits ?? [];

  return (
    <div className="mt-10">
      <h3 className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[32px] leading-none font-bold tracking-[0.2px] text-black max-sm:text-[24px]">
        {section.title}
      </h3>

      {section.intro ? (
        <p className="mt-4 font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.5] font-normal text-[#444444] max-sm:text-[16px]">
          {section.intro}
        </p>
      ) : null}

      {items.length > 0 ? <AboutArrowList items={items} /> : null}

      {benefits.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.5] font-normal text-[#444444] max-sm:text-[16px]"
            >
              <span className="font-bold text-black">{benefit.title}:</span>{" "}
              {benefit.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function parseIndex(raw: string | null, max: number): number | null {
  if (raw == null || raw === "") return null;
  const index = Number.parseInt(raw, 10);
  if (!Number.isFinite(index) || index < 0 || index >= max) return null;
  return index;
}

type ActiveSelection =
  | { group: "pest"; index: number }
  | { group: "service"; index: number };

function useDetailReveal(title: string) {
  const detailRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const el = detailRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
    );
  }, [title]);

  return detailRef;
}

/** Pest type detail: headline + body (design: Argentine Ants page) */
function PestTypeDetailContent({
  pest,
  type,
}: {
  pest: ServiceDetail;
  type: PestType;
}) {
  const headline = getPestTypeHeadline(type);
  const paragraphs = getPestTypeParagraphs(pest, type);
  const detailRef = useDetailReveal(`${type.name}-${headline}`);

  return (
    <article ref={detailRef} className="w-full max-w-[760px]">
      <h2 className="text-[40px] leading-[1.15] font-bold text-[#111111] max-sm:text-[28px]">
        {headline}
      </h2>

      <div className="mt-5 flex flex-col gap-4" data-gsap-detail="body">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[16px] leading-[1.7] font-normal text-[#666666]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {type.sections?.map((section) => (
        <section key={section.heading} className="mt-10">
          <h3 className="text-[28px] leading-[1.2] font-bold text-[#111111] max-sm:text-[22px]">
            {section.heading}
          </h3>
          {section.paragraphs?.map((paragraph, index) => (
            <p
              key={`${section.heading}-${index}`}
              className="mt-4 text-[16px] leading-[1.7] font-normal text-[#666666]"
            >
              {paragraph}
            </p>
          ))}
          {section.items && section.items.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-[#666666]">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}

/** Pest detail: headline + body + guide + steps + subtype image grid */
function PestDetailContent({
  item,
  pestIndex,
}: {
  item: ServiceDetail;
  pestIndex: number;
}) {
  const detailRef = useDetailReveal(item.title);
  const shortName = getPestShortName(item.title);
  const types = item.types ?? [];
  const headline =
    item.detailHeadline?.trim() ||
    `Professional ${shortName} Treatment Services in UAE`;
  const bodyParagraphs =
    item.detailParagraphs && item.detailParagraphs.length > 0
      ? item.detailParagraphs
      : item.paragraphs;
  const guideItems = item.guideItems ?? [];
  const steps = item.steps ?? [];
  const hasGuide = Boolean(
    item.guideTitle || item.guideIntro || guideItems.length > 0,
  );

  return (
    <article ref={detailRef} className="w-full max-w-[760px]">
      <h2 className="text-[40px] leading-[1.15] font-bold text-[#111111] max-sm:text-[28px]">
        {headline}
      </h2>

      <div className="mt-5 flex flex-col gap-4" data-gsap-detail="body">
        {bodyParagraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[16px] leading-[1.7] font-normal text-[#666666]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {hasGuide ? (
        <div className="mt-10" data-gsap-detail="guide">
          {item.guideTitle ? (
            <h3 className="text-[28px] leading-[1.2] font-bold text-[#111111] max-sm:text-[22px]">
              {item.guideTitle}
            </h3>
          ) : null}
          {item.guideIntro ? (
            <p className="mt-4 text-[16px] leading-[1.7] font-normal text-[#666666]">
              {item.guideIntro}
            </p>
          ) : null}
          {guideItems.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-[#666666]">
              {guideItems.map((itemText) => (
                <li key={itemText}>{itemText}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {steps.length > 0 ? (
        <div className="mt-10" data-gsap-detail="steps">
          <h3 className="text-[28px] leading-[1.2] font-bold text-[#111111] max-sm:text-[22px]">
            Our {shortName} Treatment and Removal Process
          </h3>
          {item.stepsIntro ? (
            <p className="mt-4 text-[16px] leading-[1.7] font-normal text-[#666666]">
              {item.stepsIntro}
            </p>
          ) : null}
          <ol className="mt-6 flex flex-col gap-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32A849] text-[16px] font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-[18px] leading-none font-bold text-[#111111]">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-[16px] leading-[1.7] font-normal text-[#666666]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {types.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-[28px] leading-none font-bold text-[#111111] max-sm:text-[22px]">
            We treat all types of {shortName.toLowerCase()} infestations
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {types.map((type, typeIndex) => (
              <Link
                key={type.name}
                href={`/services?pest=${pestIndex}&type=${typeIndex}`}
                className="image-zoom group relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#E0E0E0]"
                aria-label={`View ${formatPestTypeName(type.name)} details`}
              >
                {type.image ? (
                  <span
                    aria-hidden
                    className="image-zoom__media absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${type.image}")` }}
                  />
                ) : null}
                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-5 left-5 z-[1] pr-16 text-[20px] leading-none font-bold tracking-wide text-white uppercase max-sm:bottom-4 max-sm:left-4 max-sm:text-[16px]">
                  {type.name}
                </span>
                <span className="absolute right-4 bottom-4 z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#32A849] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/arrow-white.svg"
                    alt=""
                    width={12}
                    height={11}
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link
          href="/#contact"
          className="btn-green group mt-8 inline-flex h-[54px] shrink-0 items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 text-[18px] leading-none font-normal"
        >
          <span>Get {shortName} Treatment</span>
          <ArrowDot variant="white" />
        </Link>
      )}
    </article>
  );
}

/** Fumigation-style service detail: image + intro + about panel */
function AlternateServiceDetailContent({ item }: { item: ServiceDetail }) {
  const detailRef = useDetailReveal(item.title);
  const introTitle = item.introTitle?.trim() || "Introduction";
  const aboutTitle = item.aboutTitle?.trim() || "About";
  const aboutParagraphs =
    item.aboutParagraphs && item.aboutParagraphs.length > 0
      ? item.aboutParagraphs
      : item.paragraphs;
  const aboutSections = item.aboutSections ?? [];

  return (
    <article ref={detailRef} className="w-full max-w-[929px]">
      {item.image ? (
        <div
          className="relative aspect-[865/400] w-full overflow-hidden rounded-[25px] bg-[#E0E0E0]"
          data-gsap-reveal
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 929px"
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div
          className="h-[320px] w-full rounded-[25px] bg-[#E0E0E0] max-sm:h-[220px]"
          data-gsap-reveal
        />
      )}

      <div className="mt-10" data-gsap-detail="body">
        <h2 className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[45px] leading-none font-bold tracking-normal text-black max-sm:text-[28px]">
          {introTitle}
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          {item.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.5] font-normal text-[#444444] max-sm:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <section
        className="mt-12 w-full rounded-[20px] bg-[#F2F2F2] px-10 py-12 max-md:mt-8 max-md:rounded-[16px] max-md:px-5 max-md:py-8"
        aria-labelledby="service-about-heading"
        data-gsap-detail="about"
      >
        <h2
          id="service-about-heading"
          className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[45px] leading-none font-bold tracking-[0.2px] text-black max-sm:text-[28px]"
        >
          {aboutTitle}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-[1.5] font-normal text-[#444444] max-sm:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {aboutSections.map((section) => (
          <AboutSectionBlock key={section.title} section={section} />
        ))}
      </section>
    </article>
  );
}

/** Services detail: image + title + body (existing design) */
function DefaultServiceDetailContent({ item }: { item: ServiceDetail }) {
  const detailRef = useDetailReveal(item.title);

  return (
    <article ref={detailRef} className="w-full max-w-[760px]">
      <div
        className="h-[320px] w-full rounded-[20px] bg-[#E0E0E0] max-sm:h-[220px]"
        data-gsap-reveal
      />

      <div data-gsap-detail="body">
        <h2 className="mt-8 text-[40px] leading-[1.1] font-bold text-[#222222] max-sm:text-[28px]">
          {item.title}
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          {item.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[16px] leading-[1.7] font-normal text-[#666666]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {item.offeredServices && item.offeredServices.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-[22px] leading-none font-bold text-[#222222]">
              Offered Services
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-[#666666]">
              {item.offeredServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.stepsIntro || (item.steps && item.steps.length > 0) ? (
          <div className="mt-8">
            {item.stepsIntro ? (
              <p className="text-[16px] leading-[1.7] font-normal text-[#666666]">
                {item.stepsIntro}
              </p>
            ) : null}

            {item.steps && item.steps.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-[#666666]">
                {item.steps.map((step) => (
                  <li key={step.title}>
                    <span className="font-bold text-[#222222]">
                      {step.title}
                      {step.description ? ":" : ""}
                    </span>
                    {step.description ? ` ${step.description}` : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ServiceDetailContent({ item }: { item: ServiceDetail }) {
  if (item.alternateLayout) {
    return <AlternateServiceDetailContent item={item} />;
  }

  return <DefaultServiceDetailContent item={item} />;
}

export default function ServicesDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pestParam = searchParams.get("pest");
  const typeParam = searchParams.get("type");
  const serviceParam = searchParams.get("service");
  const pestFromUrl = parseIndex(pestParam, pestTreatments.length);
  const serviceFromUrl = parseIndex(serviceParam, serviceOptions.length);
  const pestQuery = pestParam;
  const typeQuery = typeParam;
  const serviceQuery = serviceParam;

  const pestForTypes =
    pestFromUrl != null ? pestTreatments[pestFromUrl] : null;
  const types = pestForTypes?.types ?? [];
  const typeFromUrl = parseIndex(typeQuery, types.length);

  // Type detail mode: only when a pest has types and type= is valid
  const isTypeDetail =
    pestFromUrl != null && typeFromUrl != null && types.length > 0;

  // Manual sidebar clicks override URL until the query string changes
  const [override, setOverride] = useState<ActiveSelection | null>(null);

  useEffect(() => {
    setOverride(null);
  }, [pestQuery, typeQuery, serviceQuery]);

  if (isTypeDetail && pestForTypes) {
    const shortName = getPestShortName(pestForTypes.title);
    const pluralName = shortName.endsWith("s") ? shortName : `${shortName}s`;
    const typeItems = types.map((type) => ({
      title: formatPestTypeName(type.name),
    }));
    const activeType = types[typeFromUrl];

    return (
      <section
        className="bg-white pt-[107px] pb-[100px] pl-16 max-lg:pl-10 max-md:px-6 max-md:pt-14 max-md:pb-14"
        data-gsap-section="directory"
      >
        <div className="grid w-full grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-20 pr-16 max-lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] max-lg:gap-12 max-lg:pr-10 max-md:grid-cols-1 max-md:gap-10 max-md:pr-0">
          <div className="flex w-full max-w-[416px] flex-col gap-10">
            <nav
              aria-label={`Types of ${pluralName}`}
              data-gsap-sidebar
            >
              <h2 className="mb-4 text-[28px] leading-none font-bold text-[#111111] max-sm:text-[24px]">
                Types of {pluralName}
              </h2>
              <DirectorySidebarList
                items={typeItems}
                activeIndex={typeFromUrl}
                onSelect={(index) => {
                  router.push(`/services?pest=${pestFromUrl}&type=${index}`, {
                    scroll: false,
                  });
                }}
              />
            </nav>
          </div>

          {/* Offset matches sidebar h2 (28px) + mb-4 so detail lines up with the list */}
          <div className="mt-11 min-w-0 pr-0 max-md:mt-0">
            <PestTypeDetailContent
              key={`type-${pestFromUrl}-${typeFromUrl}`}
              pest={pestForTypes}
              type={activeType}
            />
          </div>
        </div>
      </section>
    );
  }

  const active: ActiveSelection =
    override ??
    (pestFromUrl != null
      ? { group: "pest", index: pestFromUrl }
      : {
          group: "service",
          index: serviceFromUrl ?? 0,
        });

  const activeItem =
    active.group === "pest"
      ? pestTreatments[active.index]
      : serviceOptions[active.index];

  const hasFaqs = Boolean(activeItem.faqs && activeItem.faqs.length > 0);

  return (
    <section
      className={`bg-white pt-[107px] pl-16 max-lg:pl-10 max-md:px-6 max-md:pt-14 ${
        hasFaqs ? "pb-0" : "pb-[100px] max-md:pb-14"
      }`}
      data-gsap-section="directory"
    >
      <div className="grid w-full grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-20 pr-16 max-lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] max-lg:gap-12 max-lg:pr-10 max-md:grid-cols-1 max-md:gap-10 max-md:pr-0">
        <div className="flex w-full max-w-[416px] flex-col gap-10">
          <nav aria-label="Pest Treatments" data-gsap-sidebar>
            <h2 className="mb-4 text-[28px] leading-none font-bold text-[#111111] max-sm:text-[24px]">
              Pest Treatments
            </h2>
            <DirectorySidebarList
              items={pestTreatments}
              activeIndex={active.group === "pest" ? active.index : null}
              onSelect={(index) => {
                setOverride({ group: "pest", index });
                router.push(`/services?pest=${index}`, { scroll: false });
              }}
            />
          </nav>

          <nav aria-label="Our Services" data-gsap-sidebar>
            <h2 className="mb-4 text-[28px] leading-none font-bold text-[#111111] max-sm:text-[24px]">
              Our Services
            </h2>
            <DirectorySidebarList
              items={serviceOptions}
              activeIndex={active.group === "service" ? active.index : null}
              onSelect={(index) => {
                setOverride({ group: "service", index });
                router.push(`/services?service=${index}`, { scroll: false });
              }}
            />
          </nav>
        </div>

        {/* Offset matches sidebar h2 (28px) + mb-4 so images/content align with the list */}
        <div className="mt-11 min-w-0 pr-0 max-md:mt-0">
          {active.group === "pest" ? (
            <PestDetailContent
              key={`pest-${active.index}`}
              item={activeItem}
              pestIndex={active.index}
            />
          ) : (
            <ServiceDetailContent
              key={`service-${active.index}`}
              item={activeItem}
            />
          )}
        </div>
      </div>

      {hasFaqs ? (
        <div
          className="mt-16 -mb-2 ml-auto w-full max-w-[929px] max-md:mt-10"
          data-gsap-section="faq"
        >
          <ServicesFaq title={activeItem.title} faqs={activeItem.faqs!} />
        </div>
      ) : null}
    </section>
  );
}
