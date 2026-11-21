import Image from "next/image";
import type { ReactNode } from "react";

type ArrowButtonProps = {
  children: ReactNode;
  className?: string;
  arrowBg?: "white" | "green";
  arrowSize?: "sm" | "md";
};

/** Circular arrow "dot" with Bugfree-style hover motion */
export function ArrowDot({
  variant = "green",
  size = "md",
}: {
  variant?: "white" | "green";
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-[26px] w-[26px]" : "h-[30px] w-[30px]";
  const isWhite = variant === "white";

  return (
    <span
      className={`arrow-dot relative inline-flex ${dim} shrink-0 items-center justify-center overflow-hidden rounded-full ${
        isWhite ? "bg-white text-[#32A849]" : "bg-[#32A849] text-white"
      }`}
      aria-hidden
    >
      <span className="arrow-dot__ripple absolute inset-0 rounded-full bg-current opacity-0" />
      <Image
        src={isWhite ? "/arrow.svg" : "/arrow-white.svg"}
        alt=""
        width={12}
        height={11}
        className="arrow-dot__icon relative z-[1] h-[11px] w-3"
      />
    </span>
  );
}

export default function ArrowButton({
  children,
  className = "",
  arrowBg = "white",
  arrowSize = "md",
}: ArrowButtonProps) {
  return (
    <span
      className={`arrow-btn inline-flex items-center justify-between gap-2.5 ${className}`}
    >
      <span>{children}</span>
      <ArrowDot variant={arrowBg} size={arrowSize} />
    </span>
  );
}
