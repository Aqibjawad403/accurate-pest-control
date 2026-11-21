"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDot } from "@/components/ArrowButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pest & Services", href: "/pests" },
  { label: "Sectors", href: "/sectors" },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({ activeHref = "/" }: { activeHref?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const normalizedActiveHref =
    activeHref === "/services" ? "/pests" : activeHref;

  return (
    <nav
      aria-label="Main navigation"
      className="absolute top-10 right-16 left-16 z-50 flex h-[100px] items-center justify-between gap-4 rounded-[50px] border border-black/10 bg-white px-[30px] opacity-100 max-xl:top-5 max-xl:right-4 max-xl:left-4 max-xl:h-[76px] max-xl:gap-2 max-xl:px-4 max-[360px]:right-3 max-[360px]:left-3"
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
      </ul>

      <Link
        href="/contact"
        className="group hidden h-[54px] w-[223px] shrink-0 items-center justify-between gap-2.5 rounded-[27px] bg-[#32A849] py-3 pr-3 pl-5 text-[18px] leading-none font-normal text-white transition-opacity hover:opacity-95 xl:inline-flex"
      >
        <span>Let’s Talk With Us</span>
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
          </ul>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="group mt-2 inline-flex h-[54px] w-full items-center justify-between gap-2.5 rounded-[27px] bg-[#32A849] py-3 pr-3 pl-5 text-[17px] leading-none font-normal text-white transition-opacity hover:opacity-95"
          >
            <span>Let’s Talk With Us</span>
            <ArrowDot variant="white" size="md" />
          </Link>
        </div>
      )}
    </nav>
  );
}
