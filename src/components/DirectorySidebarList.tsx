"use client";

import Image from "next/image";

export default function DirectorySidebarList({
  items,
  activeIndex,
  onSelect,
}: {
  items: readonly { title: string }[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <ul className="w-full max-w-[416px] overflow-hidden rounded-[20px] border border-[#D9D9D9] bg-white">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isLast = index === items.length - 1;

        return (
          <li key={item.title} className="w-full" data-gsap-sidebar-item>
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(index)}
              className={`flex h-[70px] w-full items-center justify-between gap-4 text-left font-['Inter',var(--font-plus-jakarta),sans-serif] text-[18px] leading-none transition-colors duration-300 max-sm:text-[16px] ${
                isActive
                  ? "rounded-[20px] bg-[#32A849] px-5 font-semibold text-white opacity-100"
                  : "px-[25px] font-normal text-[#222222] hover:text-[#32A849]"
              }`}
            >
              <span>{item.title}</span>
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                  isActive
                    ? "scale-105 bg-white"
                    : "bg-[#32A849] group-hover:scale-105"
                }`}
              >
                <Image
                  src={isActive ? "/arrow.svg" : "/arrow-white.svg"}
                  alt=""
                  width={12}
                  height={11}
                  aria-hidden
                />
              </span>
            </button>
            {!isLast ? (
              <div className="mx-auto h-0 w-[366px] max-w-[calc(100%-50px)] border-t border-[#D9D9D9] opacity-100" />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
