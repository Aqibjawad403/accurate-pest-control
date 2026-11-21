"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServiceFaq } from "@/data/pest-services";

export default function ServicesFaq({
  title,
  faqs,
}: {
  title: string;
  faqs: ServiceFaq[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full rounded-tl-[20px] bg-[#F2F2F2] px-12 pt-14 pb-14 opacity-100 max-md:rounded-tl-[16px] max-md:px-5 max-md:pt-10 max-md:pb-10"
      aria-labelledby="services-faq-heading"
    >
      <h2
        id="services-faq-heading"
        className="max-w-[700px] text-[36px] leading-[1.15] font-bold text-[#222222] max-sm:text-[28px]"
        data-gsap-split
      >
        FAQ About {title}
      </h2>

      <div className="mt-10 flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              data-gsap-faq-item
              className="w-full max-w-[825px] overflow-hidden rounded-[12px] border border-[#D9D9D9] bg-white opacity-100 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-3 text-left"
              >
                <span className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[20px] leading-[1.3] font-normal text-[#222222] align-middle max-sm:text-[16px]">
                  {faq.question}
                </span>
                <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#32A849] opacity-100 transition-transform duration-300 hover:scale-105">
                  <Image
                    src="/arrow_drop_down.svg"
                    alt=""
                    width={9}
                    height={5}
                    className={`origin-center transition-transform duration-300 ${
                      isOpen ? "rotate-0" : "-rotate-180"
                    }`}
                    aria-hidden
                  />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#D9D9D9] px-5 py-4">
                    <p className="font-['Inter',var(--font-plus-jakarta),sans-serif] text-[16px] leading-[1.6] font-normal text-[#666666]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
