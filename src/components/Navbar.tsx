"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDot } from "@/components/ArrowButton";
import { resolvePestSlug, resolveServiceSlug } from "@/data/pest-services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pests", href: "/pests" },
  { label: "Service", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "About Us", href: "/About" },
  { label: "Clients", href: "/clients" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

const moreLinks = [
  { label: "Documents", href: "/documents" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
];

function isNavLinkActive(href: string, activeHref: string) {
  if (href === "/") return activeHref === "/";
  return activeHref === href || activeHref.startsWith(`${href}/`);
}

function activeHrefFromPath(pathname: string) {
  const path = pathname || "/";
  if (path === "/") return "/";

  const slug = path.replace(/^\/+|\/+$/g, "");
  if (path === "/pests" || path.startsWith("/pests/") || resolvePestSlug(slug)) {
    return "/pests";
  }
  if (
    path === "/services" ||
    path.startsWith("/services/") ||
    resolveServiceSlug(slug)
  ) {
    return "/services";
  }
  if (path.startsWith("/sectors")) return "/sectors";
  if (path.toLowerCase().startsWith("/about")) return "/About";
  if (path.startsWith("/clients")) return "/clients";
  if (path.startsWith("/events")) return "/events";
  if (path.startsWith("/contact")) return "/contact";
  if (path.startsWith("/documents")) return "/documents";
  if (path.startsWith("/careers")) return "/careers";
  if (path.startsWith("/blogs")) return "/blogs";
  return path;
}

function heroShell() {
  return (
    document.querySelector<HTMLElement>("[data-gsap-hero='shell']") ??
    document.querySelector<HTMLElement>("[data-gsap-section='hero'] > div")
  );
}

function restingTop() {
  const shell = heroShell();
  const offset = window.matchMedia("(max-width: 1279px)").matches ? 20 : 40;
  const base = shell ? shell.getBoundingClientRect().top : 62;
  return Math.max(8, Math.round(base + offset));
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const activeHref = activeHrefFromPath(pathname);
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [restTop, setRestTop] = useState(102);
  const [useLightLogo, setUseLightLogo] = useState(false);
  const isMoreActive = moreLinks.some((link) =>
    isNavLinkActive(link.href, activeHref),
  );

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const apply = () => {
      const nav = navRef.current;
      if (!nav) return;

      const sticky = window.scrollY > 8;
      const top = sticky ? 20 : restingTop();
      nav.style.top = `${top}px`;
      nav.style.backgroundColor = sticky ? "rgba(255,255,255,0.3)" : "#ffffff";
      nav.style.backdropFilter = sticky ? "blur(15px)" : "none";
      nav.style.setProperty(
        "-webkit-backdrop-filter",
        sticky ? "blur(15px)" : "none",
      );

      setIsSticky((current) => (current === sticky ? current : sticky));
      setRestTop((current) => (sticky || current === top ? current : top));

      if (!sticky) {
        setUseLightLogo((current) => (current ? false : current));
        return;
      }

      const darkRegions = document.querySelectorAll<HTMLElement>(
        "[data-gsap-hero='shell'], [data-gsap-section='hero'] > div, footer",
      );
      const overlapsDark = [...darkRegions].some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < 110 && rect.bottom > 20;
      });
      setUseLightLogo((current) =>
        current === overlapsDark ? current : overlapsDark,
      );
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      style={{
        top: isSticky ? 20 : restTop,
        backgroundColor: isSticky ? "rgba(255,255,255,0.3)" : "#ffffff",
        backdropFilter: isSticky ? "blur(15px)" : "none",
        WebkitBackdropFilter: isSticky ? "blur(15px)" : "none",
      }}
      className="fixed right-16 left-16 z-[200] flex h-[100px] items-center justify-between gap-4 rounded-[50px] border border-black/10 px-[30px] max-xl:right-4 max-xl:left-4 max-xl:h-[76px] max-xl:gap-2 max-xl:px-4 max-[360px]:right-3 max-[360px]:left-3"
    >
      <Link href="/" className="shrink-0">
        <Image
          src="/logo1.png"
          alt="Accurate Pest Control"
          width={139}
          height={70}
          className={`h-[70px] w-[139px] object-contain max-sm:h-[52px] max-sm:w-[92px] max-[360px]:h-[44px] max-[360px]:w-[80px] ${
            useLightLogo ? "brightness-0 invert" : ""
          }`}
          priority
        />
      </Link>

      <ul className="hidden flex-1 items-center justify-center gap-[18px] xl:flex">
        {navLinks.map((link) => {
          const isActive = isNavLinkActive(link.href, activeHref);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-center text-[18px] leading-none font-normal whitespace-nowrap transition-colors ${
                  isActive ? "text-[#32A849]" : "text-[#444444] hover:text-[#32A849]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li
          className="relative"
          onMouseEnter={() => setIsMoreOpen(true)}
          onMouseLeave={() => setIsMoreOpen(false)}
          onFocus={() => setIsMoreOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsMoreOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsMoreOpen(false);
          }}
        >
          <button
            type="button"
            aria-expanded={isMoreOpen}
            aria-haspopup="menu"
            aria-controls="more-navigation-menu"
            onClick={() => setIsMoreOpen((open) => !open)}
            className={`inline-flex items-center gap-1.5 text-center text-[18px] leading-none font-normal whitespace-nowrap transition-colors ${
              isMoreActive || isMoreOpen
                ? "text-[#32A849]"
                : "text-[#444444] hover:text-[#32A849]"
            }`}
          >
            More
            <svg
              viewBox="0 0 12 8"
              className={`h-2.5 w-2.5 transition-transform duration-200 ${
                isMoreOpen ? "rotate-180" : ""
              }`}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1.5 6 6.5 11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            id="more-navigation-menu"
            role="menu"
            aria-hidden={!isMoreOpen}
            className={`absolute top-full left-1/2 z-50 w-[200px] -translate-x-1/2 pt-3 transition-all duration-200 ${
              isMoreOpen
                ? "pointer-events-auto visible opacity-100"
                : "pointer-events-none invisible opacity-0"
            }`}
          >
            <ul className="rounded-2xl border border-black/10 bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
              {moreLinks.map((link) => {
                const isActive = isNavLinkActive(link.href, activeHref);
                return (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      onClick={() => setIsMoreOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-xl px-4 py-2.5 text-[16px] leading-none font-normal transition-colors ${
                        isActive
                          ? "bg-[#E8F7EC] text-[#32A849]"
                          : "text-[#444444] hover:bg-[#F3F6F4] hover:text-[#32A849]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      </ul>

      <Link
        href="/contact"
        className="btn-green group hidden h-[54px] w-fit shrink-0 items-center justify-between gap-2.5 whitespace-nowrap rounded-[27px] py-3 pr-3 pl-5 text-[18px] leading-none font-normal xl:inline-flex"
      >
        <span className="whitespace-nowrap">Let’s Talk With Us</span>
        <ArrowDot variant="white" size="md" />
      </Link>

      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls={isMenuOpen ? "mobile-navigation-menu" : undefined}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DADDE0] bg-white text-[#005F13] transition-colors hover:bg-[#F3F6F4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32A849] xl:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
        >
          {isMenuOpen ? (
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="absolute top-[calc(100%+12px)] right-0 z-[60] max-h-[min(70vh,640px)] w-[360px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[24px] border border-black/10 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] isolate xl:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = isNavLinkActive(link.href, activeHref);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#E8F7EC] text-[#32A849]"
                        : "text-[#444444] hover:bg-[#F3F6F4] hover:text-[#32A849]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-1 border-t border-black/5 pt-1">
              <p className="px-4 py-2 text-[13px] font-semibold tracking-wide text-[#888888] uppercase">
                More
              </p>
              <ul className="flex flex-col">
                {moreLinks.map((link) => {
                  const isActive = isNavLinkActive(link.href, activeHref);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${
                          isActive
                            ? "bg-[#E8F7EC] text-[#32A849]"
                            : "text-[#444444] hover:bg-[#F3F6F4] hover:text-[#32A849]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="btn-green group mt-2 inline-flex h-[54px] w-full items-center justify-between gap-2.5 rounded-[27px] py-3 pr-3 pl-5 text-[17px] leading-none font-normal"
          >
            <span>Let’s Talk With Us</span>
            <ArrowDot variant="white" size="md" />
          </Link>
        </div>
      )}
    </nav>
  );
}
