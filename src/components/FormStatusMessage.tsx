"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { FormStatus } from "@/lib/send-mail";

const WHATSAPP_URL =
  "https://wa.me/971524496173?text=" +
  encodeURIComponent(
    "Hi Accurate Pest Control, I just submitted a request on your website.",
  );

type FormStatusMessageProps = {
  status: FormStatus;
  onClear?: () => void;
  className?: string;
};

export default function FormStatusMessage({
  status,
  onClear,
  className = "",
}: FormStatusMessageProps) {
  useEffect(() => {
    if (status !== "sent") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClear) onClear();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [status, onClear]);

  if (!status || status === "idle" || status === "sending") {
    return null;
  }

  if (status === "sent" && typeof document !== "undefined") {
    return createPortal(
      <div
        className="fixed inset-0 z-[2147483000] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-success-title"
      >
        <button
          type="button"
          aria-label="Close success dialog"
          className="absolute inset-0 bg-black/50"
          onClick={onClear}
        />
        <div
          className={`relative z-10 w-full max-w-md rounded-2xl border-2 border-[#32A849] bg-white px-5 py-7 text-center shadow-xl ${className}`}
        >
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#32A849] shadow-md"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3
            id="form-success-title"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Your Request Is in Safe Hands!
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
            Thanks for reaching out to Accurate Pest Control. Need quick
            assistance? Chat with our team directly on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#32A849] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Chat on WhatsApp
            </a>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#9CA3AF] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        className={`mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 ${className}`}
      >
        Something went wrong. Please try again or{" "}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-red-900"
        >
          chat on WhatsApp
        </a>
        .
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="mt-2 block w-full text-xs font-medium text-red-600 underline"
          >
            Dismiss
          </button>
        ) : null}
      </div>
    );
  }

  return null;
}
