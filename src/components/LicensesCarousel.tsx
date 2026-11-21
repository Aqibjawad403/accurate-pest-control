"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { OfficialDocument } from "@/data/official-documents";

type LicensesCarouselProps = {
  documents: OfficialDocument[];
};

const GAP = 24;
const AUTO_PLAY_MS = 4500;

function getVisibleCount(width: number) {
  if (width < 640) return 1;
  if (width < 1100) return 2;
  return 3;
}

export default function LicensesCarousel({ documents }: LicensesCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const indexRef = useRef(0);
  const visibleCountRef = useRef(3);
  const maxIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const goToRef = useRef<(nextIndex: number, instant?: boolean) => void>(
    () => {},
  );

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, documents.length - visibleCount);
  visibleCountRef.current = visibleCount;
  maxIndexRef.current = maxIndex;

  const measureCardWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const count = visibleCountRef.current;
    return (viewport.clientWidth - GAP * (count - 1)) / count;
  }, []);

  const applyCardWidths = useCallback(() => {
    const cardWidth = measureCardWidth();
    if (!cardWidth) return 0;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.style.width = `${cardWidth}px`;
      card.style.flex = `0 0 ${cardWidth}px`;
    });

    return cardWidth;
  }, [measureCardWidth]);

  const applyInViewStyles = useCallback((activeIndex: number, animate = false) => {
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    const count = visibleCountRef.current;

    cards.forEach((card, cardIndex) => {
      const inView =
        cardIndex >= activeIndex && cardIndex < activeIndex + count;
      const props = {
        opacity: inView ? 1 : 0.42,
        scale: inView ? 1 : 0.94,
      };

      if (animate) {
        gsap.to(card, { ...props, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.set(card, props);
      }
    });
  }, []);

  const goTo = useCallback(
    (nextIndex: number, instant = false) => {
      const track = trackRef.current;
      if (!track || documents.length === 0) return;

      const clamped = Math.max(0, Math.min(nextIndex, maxIndexRef.current));
      if (!instant && (clamped === indexRef.current || animatingRef.current)) {
        return;
      }

      const cardWidth = applyCardWidths();
      if (!cardWidth) return;

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const direction = clamped > indexRef.current ? 1 : -1;
      const targetX = -(clamped * (cardWidth + GAP));

      indexRef.current = clamped;
      setIndex(clamped);

      if (instant) {
        gsap.set(track, { x: targetX });
        applyInViewStyles(clamped, false);
        return;
      }

      animatingRef.current = true;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          animatingRef.current = false;
          applyInViewStyles(clamped, true);
        },
      });

      timeline
        .to(
          cards,
          {
            y: direction > 0 ? -14 : 14,
            opacity: 0.3,
            scale: 0.95,
            filter: "blur(3px)",
            duration: 0.28,
            stagger: {
              each: 0.04,
              from: direction > 0 ? "start" : "end",
            },
          },
          0,
        )
        .to(
          track,
          {
            x: targetX,
            duration: 0.72,
          },
          0.06,
        )
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.48,
            stagger: {
              each: 0.045,
              from: direction > 0 ? "start" : "end",
            },
          },
          0.34,
        );
    },
    [applyCardWidths, applyInViewStyles, documents.length],
  );

  goToRef.current = goTo;

  useLayoutEffect(() => {
    if (documents.length === 0) return;

    if (indexRef.current > maxIndex) {
      goTo(maxIndex, true);
      return;
    }

    goTo(indexRef.current, true);
  }, [documents.length, goTo, maxIndex, visibleCount]);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = viewportRef.current?.clientWidth ?? window.innerWidth;
      setVisibleCount(getVisibleCount(width));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (documents.length <= visibleCount || paused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      const current = indexRef.current;
      const next = current >= maxIndexRef.current ? 0 : current + 1;
      goToRef.current(next);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(id);
  }, [documents.length, paused, visibleCount]);

  if (documents.length === 0) {
    return (
      <p className="mt-[104px] text-center text-[16px] text-[#666] max-sm:mt-12">
        No licenses available yet.
      </p>
    );
  }

  const canGoPrev = index > 0;
  const canGoNext = index < maxIndex;
  const pageCount = maxIndex + 1;

  return (
    <div
      className="mt-[104px] max-sm:mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {documents.map((document, documentIndex) => {
            const preview = (
              <span className="image-zoom relative block h-[257px] w-full overflow-hidden rounded-[15px] bg-[#32A849] max-sm:h-[200px]">
                <Image
                  src={document.imageUrl}
                  alt={`${document.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 417px"
                  className="object-contain"
                />
              </span>
            );

            return (
              <article
                key={document.image}
                ref={(node) => {
                  cardsRef.current[documentIndex] = node;
                }}
                className="shrink-0"
                data-gsap-card
              >
                {document.pdfUrl ? (
                  <a
                    href={document.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${document.title} PDF`}
                    className="block focus-visible:rounded-[12px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#32A849]"
                  >
                    {preview}
                  </a>
                ) : (
                  preview
                )}
              </article>
            );
          })}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous licenses"
            disabled={!canGoPrev}
            onClick={() => goTo(index - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#32A849]/40 bg-white text-[#32A849] transition enabled:hover:bg-[#32A849] enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <svg viewBox="0 0 14 12" width="14" height="12" fill="none" aria-hidden>
              <path
                d="M12.75 6H2.5M2.5 6L6.25 2.25M2.5 6L6.25 9.75"
                stroke="currentColor"
                strokeWidth="1.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="License pages"
          >
            {Array.from({ length: pageCount }, (_, page) => (
              <button
                key={page}
                type="button"
                role="tab"
                aria-selected={page === index}
                aria-label={`Go to licenses page ${page + 1}`}
                onClick={() => goTo(page)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  page === index
                    ? "w-7 bg-[#32A849]"
                    : "w-2.5 bg-[#32A849]/30 hover:bg-[#32A849]/55"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next licenses"
            disabled={!canGoNext}
            onClick={() => goTo(index + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#32A849]/40 bg-white text-[#32A849] transition enabled:hover:bg-[#32A849] enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <svg viewBox="0 0 14 12" width="14" height="12" fill="none" aria-hidden>
              <path
                d="M1.25 6H11.5M11.5 6L7.75 2.25M11.5 6L7.75 9.75"
                stroke="currentColor"
                strokeWidth="1.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
