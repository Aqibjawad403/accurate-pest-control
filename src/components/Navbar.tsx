"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDot } from "@/components/ArrowButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pests & Services", href: "/pests" },
  { label: "Sectors", href: "/sectors" },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

const moreLinks = [
  { label: "Documents", href: "/documents" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blog" },
];

export default function Navbar({ activeHref = "/" }: { activeHref?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const normalizedActiveHref =
    activeHref === "/services" ? "/pests" : activeHref;
  const isMoreActive = moreLinks.some(
    (link) =>
      normalizedActiveHref === link.href ||
      normalizedActiveHref.startsWith(`${link.href}/`),
  );

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`${
        isSticky
          ? "fixed top-5 bg-[#FFFFFF4D] backdrop-blur-[15px]"
          : "absolute top-10 bg-white max-xl:top-5"
      } right-16 left-16 z-50 flex h-[100px] items-center justify-between gap-4 rounded-[50px] border border-black/10 px-[30px] max-xl:right-4 max-xl:left-4 max-xl:h-[76px] max-xl:gap-2 max-xl:px-4 max-[360px]:right-3 max-[360px]:left-3`}
    >
      <Link href="/" className="shrink-0">
        <Image
          src="/logo1.png"
          alt="Accurate Pest Control"
          width={139}
          height={70}
          className="h-[70px] w-[139px] object-contain max-sm:h-[52px] max-sm:w-[92px] max-[360px]:h-[44px] max-[360px]:w-[80px]"
          priority
        />
      </Link>

      <ul className="hidden flex-1 items-center justify-center gap-[18px] xl:flex">
        {navLinks.map((link) => {
          const isActive = link.href === normalizedActiveHref;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
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
                const isActive =
                  normalizedActiveHref === link.href ||
                  normalizedActiveHref.startsWith(`${link.href}/`);
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
          className="absolute top-[calc(100%+12px)] right-0 w-[360px] max-w-[calc(100vw-32px)] rounded-[24px] border border-black/10 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] xl:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = link.href === normalizedActiveHref;
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
                  const isActive =
                    normalizedActiveHref === link.href ||
                    normalizedActiveHref.startsWith(`${link.href}/`);
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
