"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagicCursor() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 1024px)").matches;

    if (reducedMotion || isTouch || isNarrow) {
      ball.style.display = "none";
      return;
    }

    document.body.classList.add("tt-magic-cursor");
    document.documentElement.classList.add("has-magic-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const ratio = 0.15;
    const ballOpacity = 0.5;

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      x: pos.x,
      y: pos.y,
      width: 6,
      height: 6,
      opacity: 0,
    });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(ball, { autoAlpha: 1, duration: 0.25, overwrite: "auto" });
    };

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
      gsap.set(ball, { x: pos.x, y: pos.y });
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, .hide-cursor',
        ),
      );
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ball, { duration: 0.25, scale: 0, opacity: 0, overwrite: "auto" });
      }
    };

    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        gsap.to(ball, {
          duration: 0.25,
          scale: 1,
          opacity: ballOpacity,
          overwrite: "auto",
        });
      }
    };

    const onDocLeave = () => {
      gsap.to(ball, { duration: 0.25, autoAlpha: 0, overwrite: "auto" });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onDocLeave);
    gsap.ticker.add(updatePosition);

    return () => {
      document.body.classList.remove("tt-magic-cursor");
      document.documentElement.classList.remove("has-magic-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onDocLeave);
      gsap.ticker.remove(updatePosition);
    };
  }, []);

  return (
    <div id="magic-cursor" aria-hidden>
      <div ref={ballRef} id="ball" />
    </div>
  );
}
