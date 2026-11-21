import type { ReactNode } from "react";

type ArrowButtonProps = {
  children: ReactNode;
  className?: string;
  arrowBg?: "white" | "green";
  arrowSize?: "sm" | "md";
};

/** Diagonal NE arrow (↗) — default */
function ArrowDiagonal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width={12}
      height={12}
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M3 9L9 3M9 3H4.5M9 3V7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Straight right arrow (→) — hover */
function ArrowStraight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 12"
      width={14}
      height={12}
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M1.25 6H11.5M11.5 6L7.75 2.25M11.5 6L7.75 9.75"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      <span className="arrow-dot__icons relative z-[1] inline-grid h-3 w-3 place-items-center">
        <ArrowDiagonal className="arrow-dot__icon arrow-dot__icon--diagonal col-start-1 row-start-1 h-3 w-3" />
        <ArrowStraight className="arrow-dot__icon arrow-dot__icon--straight col-start-1 row-start-1 h-3 w-[14px]" />
      </span>
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
