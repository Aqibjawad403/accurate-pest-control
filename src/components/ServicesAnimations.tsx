"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ServicesAnimations({
  children,
}: {
  children: ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());

      /* Bugfree-style SplitText headings */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-split]")
        .forEach((element) => {
          const split = SplitText.create(element, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });

          gsap.set(element, { perspective: 400 });
          gsap.set(split.chars, { opacity: 0, x: 50 });

          const isHero = Boolean(element.closest("[data-gsap-section='hero']"));

          gsap.to(split.chars, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out",
            stagger: 0.02,
            ...(isHero
              ? { delay: 0.35 }
              : {
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    once: true,
                  },
                }),
          });
        });

      /* Image wipe reveal */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-reveal]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      /* Hero entrance — fromTo avoids reading pre-hydration DOM styles */
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .fromTo(
          "[data-gsap-hero='shell']",
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1 },
        )
        .fromTo(
          "[data-gsap-hero='nav']",
          { y: -36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.7",
        )
        .fromTo(
          "[data-gsap-hero='copy']",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.25",
        );

      /* Sidebar blocks */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-sidebar]")
        .forEach((block, index) => {
          gsap.from(block, {
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              once: true,
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
          });
        });

      /* Sidebar list items stagger */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-sidebar-item]")
        .forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              once: true,
            },
            y: 18,
            opacity: 0,
            duration: 0.45,
            delay: Math.min(index * 0.03, 0.45),
            ease: "power2.out",
          });
        });

      /* Detail content */
      gsap.from("[data-gsap-detail='body'] > *", {
        scrollTrigger: {
          trigger: "[data-gsap-detail='body']",
          start: "top 85%",
          once: true,
        },
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      /* FAQ section */
      const faqSection = document.querySelector("[data-gsap-section='faq']");
      if (faqSection) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: faqSection,
              start: "top 85%",
              once: true,
            },
          })
          .from(faqSection, {
            y: 40,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          })
          .from(
            faqSection.querySelectorAll("[data-gsap-faq-item]"),
            {
              y: 24,
              opacity: 0,
              stagger: 0.08,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.35",
          );
      }
    }, mainRef);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef} className="flex flex-1 flex-col">
      {children}
    </main>
  );
}
