"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HomeAnimations({ children }: { children: ReactNode }) {
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

      /* Bugfree-style SplitText heading animation (style-3) */
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
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out",
            stagger: 0.02,
            ...(isHero
              ? { delay: 0.45 }
              : {
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    once: true,
                  },
                }),
          });
        });

      /* Image wipe reveal like Bugfree at-animation-image-style-1 */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-reveal]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      /* Hero entrance — title handled by SplitText above */
      if (mainRef.current?.querySelector("[data-gsap-hero='shell']")) {
        const heroButton =
          mainRef.current.querySelector<HTMLElement>(
            "[data-gsap-hero='button']",
          );

        const hero = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            // Hard guarantee: CTA never stays stuck invisible after remounts
            if (heroButton) {
              gsap.set(heroButton, {
                opacity: 1,
                visibility: "visible",
                clearProps: "transform",
              });
            }
          },
        });
        hero
          .fromTo(
            "[data-gsap-hero='shell']",
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.1,
              clearProps: "transform",
            },
          )
          .fromTo(
            "[data-gsap-hero='nav']",
            { y: -40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              clearProps: "transform",
            },
            "-=0.75",
          )
          .fromTo(
            "[data-gsap-hero='badge']",
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, clearProps: "transform" },
            "-=0.35",
          )
          .fromTo(
            "[data-gsap-hero='copy']",
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, clearProps: "transform" },
            "-=0.2",
          )
          .fromTo(
            "[data-gsap-hero='button']",
            { scale: 0.85, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              clearProps: "transform,opacity",
            },
            "-=0.35",
          );
      }

      /* Scroll sections */
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-section]")
        .forEach((section) => {
          const name = section.dataset.gsapSection;
          const trigger = { trigger: section, start: "top 82%", once: true };

          if (name === "certifications") {
            gsap.from(section.querySelectorAll("[data-gsap-card]"), {
              scrollTrigger: trigger,
              y: 40,
              opacity: 0,
              scale: 0.94,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
            });
          } else if (name === "about") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-badge]"), {
                x: -40,
                opacity: 0,
                duration: 0.65,
                ease: "power3.out",
              })
              .from(
                section.querySelector("[data-gsap-copy]"),
                { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
                "-=0.35",
              )
              .from(
                section.querySelectorAll("[data-gsap-card]"),
                {
                  y: 50,
                  opacity: 0,
                  stagger: 0.12,
                  duration: 0.65,
                  ease: "power3.out",
                },
                "-=0.3",
              );
          } else if (name === "about-overview") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-copy]"), {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
              })
              .from(
                section.querySelector("[data-gsap-action]"),
                { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" },
                "-=0.25",
              );
          } else if (name === "principles") {
            gsap.from(section.querySelectorAll("[data-gsap-card]"), {
              scrollTrigger: trigger,
              y: 55,
              opacity: 0,
              stagger: 0.16,
              duration: 0.8,
              ease: "power3.out",
            });
          } else if (name === "ceo-message") {
            gsap.from(section.querySelectorAll("[data-gsap-copy]"), {
              scrollTrigger: trigger,
              y: 24,
              opacity: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
            });
          } else if (name === "services") {
            gsap.from(section.querySelector("[data-gsap-badge]"), {
              scrollTrigger: trigger,
              scale: 0.75,
              opacity: 0,
              duration: 0.55,
              ease: "back.out(1.4)",
            });

            const overlapStack = section.querySelector(
              "[data-gsap-overlap-cards]",
            );
            if (overlapStack) {
              const cards = gsap.utils.toArray<HTMLElement>(
                overlapStack.querySelectorAll("[data-gsap-row]"),
              );

              cards.slice(0, -1).forEach((card, index) => {
                const nextCard = cards[index + 1];

                gsap.to(card, {
                  scale: 0.94,
                  transformOrigin: "center top",
                  ease: "none",
                  scrollTrigger: {
                    trigger: nextCard,
                    start: "top bottom",
                    end: () =>
                      `top ${
                        window.matchMedia("(max-width: 639px)").matches
                          ? 12
                          : 96 + (index + 1) * 12
                      }px`,
                    scrub: true,
                  },
                });
              });
            } else {
              gsap.utils
                .toArray<HTMLElement>(
                  section.querySelectorAll("[data-gsap-row]"),
                )
                .forEach((row, index) => {
                  gsap.from(row, {
                    scrollTrigger: {
                      trigger: row,
                      start: "top 88%",
                      once: true,
                    },
                    x: index % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.85,
                    ease: "power3.out",
                  });
                });
            }
          } else if (name === "team") {
            gsap.from(section.querySelector("[data-gsap-badge]"), {
              scrollTrigger: trigger,
              y: 24,
              opacity: 0,
              duration: 0.55,
              ease: "power3.out",
            });

            gsap.from(section.querySelectorAll("[data-gsap-copy]"), {
              scrollTrigger: trigger,
              y: 24,
              opacity: 0,
              duration: 0.65,
              ease: "power3.out",
            });

            gsap.from(section.querySelectorAll("[data-gsap-card]"), {
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
              y: 60,
              opacity: 0,
              stagger: 0.14,
              duration: 0.85,
              ease: "power3.out",
            });
          } else if (name === "official-licenses") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-action]"), {
                y: 20,
                opacity: 0,
                duration: 0.55,
                ease: "power3.out",
              })
              .from(
                section.querySelectorAll("[data-gsap-card]"),
                {
                  y: 40,
                  opacity: 0,
                  stagger: 0.12,
                  duration: 0.7,
                  ease: "power3.out",
                },
                "-=0.2",
              );
          } else if (name === "sectors-directory") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-sector-sidebar]"), {
                x: -45,
                opacity: 0,
                duration: 0.75,
                ease: "power3.out",
              })
              .from(
                section.querySelector("[data-gsap-sector-content]"),
                { x: 45, opacity: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5",
              );
          } else if (name === "testimonials") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelectorAll("[data-gsap-copy]"), {
                y: 36,
                opacity: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
              });
          } else if (name === "logos") {
            gsap.from(section.querySelectorAll("[data-gsap-card]"), {
              scrollTrigger: trigger,
              y: 30,
              opacity: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: "power3.out",
            });
          } else if (name === "clients") {
            const cards = gsap.utils.toArray<HTMLElement>(
              section.querySelectorAll("[data-gsap-card]"),
            );

            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-badge]"), {
                y: 18,
                opacity: 0,
                scale: 0.92,
                duration: 0.5,
                ease: "back.out(1.6)",
              })
              .from(
                section.querySelector("[data-gsap-copy]"),
                { y: 28, opacity: 0, duration: 0.65, ease: "power3.out" },
                "-=0.2",
              )
              .from(
                cards,
                {
                  opacity: 0,
                  y: 36,
                  scale: 0.88,
                  filter: "blur(10px)",
                  duration: 0.75,
                  ease: "power3.out",
                  stagger: {
                    amount: 1.15,
                    grid: "auto",
                    from: "start",
                  },
                },
                "-=0.25",
              );
          } else if (name === "contact") {
            gsap
              .timeline({ scrollTrigger: trigger })
              .from(section.querySelector("[data-gsap-badge]"), {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
              })
              .from(
                section.querySelector("[data-gsap-copy]"),
                { y: 36, opacity: 0, duration: 0.75, ease: "power3.out" },
                "-=0.25",
              )
              .from(
                section.querySelector("[data-gsap-card]"),
                { y: 50, opacity: 0, duration: 0.85, ease: "power3.out" },
                "-=0.45",
              );
          } else if (name === "insights") {
            gsap.from(section.querySelector("[data-gsap-badge]"), {
              scrollTrigger: trigger,
              y: 20,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.from(section.querySelectorAll("[data-gsap-card]"), {
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
              y: 55,
              opacity: 0,
              stagger: 0.14,
              duration: 0.8,
              ease: "power3.out",
            });
          }
        });
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
