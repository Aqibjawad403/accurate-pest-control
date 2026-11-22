"use client";

import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const PdfPages = lazy(() => import("./PdfPages"));

type OpenPdf = { url: string; title: string };
type FlipDir = "next" | "prev" | null;

type PdfViewerContextValue = {
  openPdf: (href: string, title?: string | null) => void;
  closePdf: () => void;
  isOpen: boolean;
};

const PdfViewerContext = createContext<PdfViewerContextValue | null>(null);

const DESKTOP_MQ = "(min-width: 768px)";

function normalizeHref(href: string | null | undefined) {
  if (!href || href === "#") return null;
  const value = String(href).trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `/${value}`;
}

function toAbsoluteUrl(href: string) {
  const normalized = normalizeHref(href);
  if (!normalized) return null;
  try {
    return new URL(normalized, window.location.origin).href;
  } catch {
    return normalized;
  }
}

function isPdfHref(href: string | null | undefined) {
  const normalized = normalizeHref(href);
  if (!normalized) return false;
  try {
    return new URL(normalized, window.location.origin).pathname
      .toLowerCase()
      .endsWith(".pdf");
  } catch {
    return /\.pdf($|[?#])/i.test(normalized);
  }
}

function titleFromHref(href: string) {
  try {
    return (
      decodeURIComponent(href.split("/").pop()?.split("?")[0] || "")
        .replace(/\.pdf$/i, "")
        .replace(/[-_]+/g, " ")
        .trim() || "Document"
    );
  } catch {
    return "Document";
  }
}

function filenameFromHref(href: string) {
  try {
    const name = decodeURIComponent(
      href.split("/").pop()?.split("?")[0] || "",
    );
    return name.toLowerCase().endsWith(".pdf")
      ? name
      : `${name || "document"}.pdf`;
  } catch {
    return "document.pdf";
  }
}

function useIsDesktop() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MQ);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return matches;
}

async function downloadPdf(url: string, filename: string) {
  try {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename || "document.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("PDF download failed:", error);
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 4V15M12 15L7.5 10.5M12 15L16.5 10.5M5 19H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RotateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20 11A8 8 0 1 1 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 5V11H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function usePdfViewer() {
  const value = useContext(PdfViewerContext);
  if (!value) {
    throw new Error("usePdfViewer must be used within a PdfViewerProvider");
  }
  return value;
}

export default function PdfViewerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openDoc, setOpenDoc] = useState<OpenPdf | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [rotate, setRotate] = useState<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [flipDir, setFlipDir] = useState<FlipDir>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();
  const twoPage = isDesktop && numPages != null && numPages > 1;
  const flipLock = useRef(false);
  const pendingFlip = useRef<FlipDir>(null);

  const closePdf = useCallback(() => {
    setOpenDoc(null);
    setPageNumber(1);
    setNumPages(null);
    setRotate(null);
    setLoadError(false);
    setFlipDir(null);
    document.documentElement.classList.remove("pdf-viewer-open");
    previousFocus.current?.focus?.();
  }, []);

  const openPdf = useCallback((href: string, title?: string | null) => {
    const url = normalizeHref(href);
    if (!url) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setPageNumber(1);
    setNumPages(null);
    setRotate(null);
    setLoadError(false);
    setFlipDir(null);
    document.documentElement.classList.add("pdf-viewer-open");
    setOpenDoc({
      url,
      title: title?.trim() || titleFromHref(url),
    });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.type === "click" && event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (
        !anchor ||
        anchor.closest("[data-pdf-viewer]") ||
        anchor.hasAttribute("download") ||
        anchor.dataset.pdfNative === "true"
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!isPdfHref(href)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      openPdf(href!, anchor.getAttribute("title") || anchor.textContent);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, [openPdf]);

  const onLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setLoadError(false);
  }, []);

  const onLoadError = useCallback(() => {
    setLoadError(true);
    setNumPages(null);
  }, []);

  useEffect(() => {
    if (twoPage) {
      setPageNumber((current) => (current % 2 === 0 ? current - 1 : current));
    }
  }, [twoPage]);

  const rightPage =
    twoPage && numPages && pageNumber < numPages
      ? pageNumber + 1
      : pageNumber;
  const canGoPrev = pageNumber > 1 && !flipDir;
  const canGoNext = Boolean(numPages && rightPage < numPages && !flipDir);

  const beginFlip = useCallback(
    (dir: "next" | "prev") => {
      if (pendingFlip.current) return;
      if (dir === "prev" && pageNumber <= 1) return;
      setFlipDir(dir);
    },
    [pageNumber],
  );

  const cancelFlip = useCallback(() => {
    setFlipDir(null);
  }, []);

  const goPrev = useCallback(() => {
    if (pageNumber <= 1 || pendingFlip.current) return;
    setFlipDir("prev");
  }, [pageNumber]);

  const goNext = useCallback(() => {
    if (!numPages || pendingFlip.current) return;
    const currentRight =
      twoPage && pageNumber < numPages ? pageNumber + 1 : pageNumber;
    if (currentRight >= numPages) return;
    setFlipDir("next");
  }, [numPages, pageNumber, twoPage]);

  const finishFlip = useCallback(() => {
    if (flipLock.current) return;
    const dir = pendingFlip.current;
    if (!dir) return;
    flipLock.current = true;
    const step = twoPage ? 2 : 1;
    if (dir === "next") {
      setPageNumber((current) =>
        numPages ? Math.min(numPages, current + step) : current + step,
      );
    } else {
      setPageNumber((current) => Math.max(1, current - step));
    }
    setFlipDir(null);
  }, [twoPage, numPages]);

  useEffect(() => {
    pendingFlip.current = flipDir;
  }, [flipDir]);

  useEffect(() => {
    if (!flipDir) flipLock.current = false;
  }, [flipDir]);

  useEffect(() => {
    if (!openDoc) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePdf();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openDoc, closePdf, goPrev, goNext]);

  const pageLabel = numPages
    ? rightPage !== pageNumber
      ? `Pages ${pageNumber}–${rightPage} of ${numPages}`
      : `Page ${pageNumber} of ${numPages}`
    : "Page —";

  const contextValue = useMemo(
    () => ({ openPdf, closePdf, isOpen: Boolean(openDoc) }),
    [openPdf, closePdf, openDoc],
  );

  return (
    <PdfViewerContext.Provider value={contextValue}>
      {children}
      {openDoc
        ? createPortal(
            <div
              data-pdf-viewer
              className="fixed inset-0 z-[300]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="pdf-viewer-title"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/80"
                aria-label="Close document"
                onClick={closePdf}
              />

              <div className="relative z-10 flex h-[100dvh] w-full items-center gap-1 px-1 pt-14 pb-24 sm:gap-3 sm:px-4 sm:pb-16">
                {numPages !== 1 ? (
                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                    className="z-20 flex h-12 w-12 shrink-0 items-center justify-center bg-transparent text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] hover:text-[#9AE6B4] disabled:cursor-not-allowed disabled:opacity-30 sm:h-16 sm:w-16"
                  >
                    <ChevronLeftIcon className="h-10 w-10 sm:h-12 sm:w-12" />
                  </button>
                ) : null}

                <div className="relative min-h-0 min-w-0 flex-1 self-stretch">
                  {loadError ? (
                    <p className="flex h-full items-center justify-center text-sm text-red-300">
                      Unable to open this document.
                    </p>
                  ) : (
                    <Suspense
                      fallback={
                        <p className="flex h-full items-center justify-center text-sm text-white/80">
                          Loading document…
                        </p>
                      }
                    >
                      <PdfPages
                        file={openDoc.url}
                        pageNumber={pageNumber}
                        numPages={numPages}
                        twoPage={twoPage}
                        rotate={rotate}
                        flipDir={flipDir}
                        flipStyle="horizontal"
                        onFlipEnd={finishFlip}
                        onFlipCancel={cancelFlip}
                        onBeginFlip={beginFlip}
                        onLoadSuccess={onLoadSuccess}
                        onLoadError={onLoadError}
                      />
                    </Suspense>
                  )}
                </div>

                {numPages !== 1 ? (
                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={goNext}
                    disabled={!canGoNext}
                    className="z-20 flex h-12 w-12 shrink-0 items-center justify-center bg-transparent text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] hover:text-[#9AE6B4] disabled:cursor-not-allowed disabled:opacity-30 sm:h-16 sm:w-16"
                  >
                    <ChevronRightIcon className="h-10 w-10 sm:h-12 sm:w-12" />
                  </button>
                ) : null}
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 p-3 sm:p-4">
                <h2
                  id="pdf-viewer-title"
                  className="min-w-0 truncate text-sm font-semibold text-white drop-shadow sm:text-base"
                >
                  {openDoc.title}
                </h2>
                <div className="pointer-events-auto flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadPdf(
                        toAbsoluteUrl(openDoc.url) || openDoc.url,
                        filenameFromHref(openDoc.url),
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#32A849]"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRotate((current) => ((current ?? 0) + 90) % 360)
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#32A849]"
                  >
                    <RotateIcon className="h-4 w-4" />
                    Rotate
                  </button>
                  <button
                    type="button"
                    onClick={closePdf}
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white hover:text-black"
                  >
                    <CloseIcon className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-3 pb-24 sm:pb-5">
                <p className="mb-2 text-center text-sm font-medium text-white/90 drop-shadow">
                  {pageLabel}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </PdfViewerContext.Provider>
  );
}
