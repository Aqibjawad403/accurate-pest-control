"use client";

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "./pdf-book.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type FlipDir = "next" | "prev" | null;
type FlipStyle =
  | "realistic"
  | "3d"
  | "slide"
  | "curl"
  | "horizontal"
  | "vertical"
  | "stack"
  | "magazine"
  | "card"
  | "drag";

type PdfPagesProps = {
  file: string;
  pageNumber: number;
  numPages: number | null;
  twoPage: boolean;
  rotate: number | null;
  flipDir: FlipDir;
  flipStyle?: FlipStyle;
  onFlipEnd?: () => void;
  onFlipCancel?: () => void;
  onBeginFlip?: (dir: "next" | "prev") => void;
  onLoadSuccess?: (payload: { numPages: number }) => void;
  onLoadError?: () => void;
};

const BOOK_STYLES = new Set<FlipStyle>([
  "realistic",
  "3d",
  "curl",
  "horizontal",
  "magazine",
  "drag",
]);

const FLIP_MS: Record<FlipStyle, number> = {
  realistic: 900,
  "3d": 800,
  slide: 480,
  curl: 720,
  horizontal: 850,
  vertical: 700,
  stack: 560,
  magazine: 900,
  card: 640,
  drag: 420,
};

const pdfCache = new Map<string, ArrayBuffer>();

const PdfPage = memo(function PdfPage({
  pageNumber,
  width,
  rotate,
}: {
  pageNumber: number | null;
  width: number;
  rotate: number | null;
}) {
  if (!pageNumber) {
    return <div className="h-full w-full bg-white" />;
  }

  return (
    <Page
      pageNumber={pageNumber}
      width={width}
      {...(rotate != null ? { rotate } : {})}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      loading={null}
    />
  );
});

function clampPage(page: number, numPages: number | null) {
  if (!page || page < 1) return null;
  if (numPages) return page <= numPages ? page : null;
  return page <= 2 ? page : null;
}

function slotMeta(
  page: number,
  current: number,
  twoPage: boolean,
  step: number,
) {
  if (twoPage) {
    if (page === current) return { band: "cur", side: "left" } as const;
    if (page === current + 1) return { band: "cur", side: "right" } as const;
    if (page === current + step) return { band: "next", side: "left" } as const;
    if (page === current + step + 1)
      return { band: "next", side: "right" } as const;
    if (page === current - step) return { band: "prev", side: "left" } as const;
    if (page === current - step + 1)
      return { band: "prev", side: "right" } as const;
  } else {
    if (page === current) return { band: "cur", side: "left" } as const;
    if (page === current + 1) return { band: "next", side: "left" } as const;
    if (page === current - 1) return { band: "prev", side: "left" } as const;
  }
  return { band: "hidden", side: "left" } as const;
}

async function fetchPdfBuffer(url: string) {
  let cached = pdfCache.get(url);
  if (!cached) {
    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "force-cache",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    cached = await response.arrayBuffer();
    if (!cached.byteLength) throw new Error("Empty PDF");
    pdfCache.set(url, cached);
  }
  return cached.slice(0);
}

export default function PdfPages({
  file,
  pageNumber,
  numPages,
  twoPage,
  rotate,
  flipDir,
  flipStyle = "horizontal",
  onFlipEnd,
  onFlipCancel,
  onBeginFlip,
  onLoadSuccess,
  onLoadError,
}: PdfPagesProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const dragRef = useRef<{
    dir: "next" | "prev";
    startX: number;
    width: number;
  } | null>(null);
  const dragProgressRef = useRef(0);
  const styleWhileFlipping = useRef(flipStyle);
  const [fileData, setFileData] = useState<{ data: ArrayBuffer } | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  if (!flipDir) {
    styleWhileFlipping.current = flipStyle || "horizontal";
  }

  const activeStyle = styleWhileFlipping.current || "horizontal";
  const isBookStyle = BOOK_STYLES.has(activeStyle);
  const step = twoPage ? 2 : 1;
  const isNext = flipDir === "next";
  const isPrev = flipDir === "prev";
  const flipDuration = FLIP_MS[activeStyle] || 700;
  const downloadHref = file || "#";

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const measure = () => {
      setStageSize({
        width: Math.floor(node.clientWidth),
        height: Math.floor(node.clientHeight),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [file, loading]);

  useEffect(() => {
    let cancelled = false;
    setPdf(null);
    setPageSize(null);
    setFileData(null);
    setFailed(false);
    setReady(false);
    setLoading(true);

    if (!file) {
      setFailed(true);
      setLoading(false);
      onLoadError?.();
      return;
    }

    (async () => {
      try {
        const buffer = await fetchPdfBuffer(file);
        if (cancelled) return;
        setFileData({ data: buffer });
        setLoading(false);
      } catch (error) {
        console.error("PDF fetch failed:", file, error);
        if (cancelled) return;
        setFailed(true);
        setLoading(false);
        onLoadError?.();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [file, onLoadError]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;

    pdf.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const rotation = rotate ?? page.rotate;
      const viewport = page.getViewport({ scale: 1, rotation: rotation });
      setPageSize((prev) =>
        prev &&
        prev.width === viewport.width &&
        prev.height === viewport.height
          ? prev
          : { width: viewport.width, height: viewport.height },
      );
      window.requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNumber, rotate]);

  useEffect(() => {
    if (!flipDir) {
      setIsRunning(false);
      setFlipProgress(0);
      return;
    }
    if (activeStyle === "drag" && dragRef.current) return;

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        setIsRunning(true);
        if (activeStyle === "drag") setFlipProgress(1);
      });
    });
    const timer = window.setTimeout(() => {
      if (!cancelled) onFlipEnd?.();
    }, flipDuration + 40);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [flipDir, onFlipEnd, flipDuration, activeStyle]);

  const pageWidth = useMemo(() => {
    if (!pageSize || stageSize.width < 1) return null;
    if (stageSize.height < 1) return stageSize.width;
    const available =
      (twoPage ? 2 : 1) === 2 ? stageSize.width / 2 : stageSize.width;
    const scale = Math.min(
      available / pageSize.width,
      stageSize.height / pageSize.height,
    );
    return Math.max(1, Math.floor(pageSize.width * scale));
  }, [stageSize, pageSize, twoPage]);

  const pageHeight = useMemo(() => {
    if (!pageSize || !pageWidth) return 0;
    return Math.max(1, Math.round(pageWidth * (pageSize.height / pageSize.width)));
  }, [pageSize, pageWidth]);

  const handleLoadSuccess = (doc: PDFDocumentProxy) => {
    setPdf(doc);
    onLoadSuccess?.({ numPages: doc.numPages });
  };

  const nextLeft = clampPage(pageNumber + step, numPages);
  const nextRight = twoPage ? clampPage(pageNumber + step + 1, numPages) : null;
  const currentLeft = clampPage(pageNumber, numPages);
  const currentRight = twoPage ? clampPage(pageNumber + 1, numPages) : null;

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const push = (value: number) => {
      if (clampPage(value, numPages)) pages.push(value);
    };
    push(pageNumber);
    if (twoPage) push(pageNumber + 1);
    if (ready) {
      if (twoPage) {
        push(pageNumber - 2);
        push(pageNumber - 1);
        push(pageNumber + 2);
        push(pageNumber + 3);
      } else {
        push(pageNumber - 1);
        push(pageNumber + 1);
      }
    }
    return [...new Set(pages)];
  }, [pageNumber, numPages, twoPage, ready]);

  const leafFront = isNext && twoPage ? currentRight : currentLeft;
  const leafBack = isNext
    ? nextLeft
    : clampPage(twoPage ? pageNumber - step + 1 : pageNumber - step, numPages);
  const bookWidth = twoPage && pageWidth ? pageWidth * 2 : pageWidth;

  const beginDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    dir: "next" | "prev",
  ) => {
    if (activeStyle !== "drag" || flipDir) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      dir,
      startX: event.clientX,
      width: pageWidth || 1,
    };
    dragProgressRef.current = 0;
    setFlipProgress(0);
    setIsRunning(false);
    onBeginFlip?.(dir);
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const delta =
        drag.dir === "next"
          ? drag.startX - event.clientX
          : event.clientX - drag.startX;
      const progress = Math.min(1, Math.max(0, delta / (drag.width * 0.85)));
      dragProgressRef.current = progress;
      setFlipProgress(progress);
    };

    const onUp = () => {
      if (!dragRef.current) return;
      const progress = dragProgressRef.current;
      dragRef.current = null;
      if (progress >= 0.32) {
        setIsRunning(true);
        setFlipProgress(1);
        window.setTimeout(() => onFlipEnd?.(), 420);
      } else {
        setFlipProgress(0);
        onFlipCancel?.();
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [onFlipEnd, onFlipCancel]);

  const onLeafTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === "transform" && !dragRef.current) {
      onFlipEnd?.();
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="py-16 text-center text-sm text-white/80">
          Loading document…
        </p>
      </div>
    );
  }

  if (failed || !fileData) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
        <p className="text-center text-sm text-red-300">
          Unable to open this document.
        </p>
        <a
          href={downloadHref}
          download
          className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white hover:bg-[#32A849]"
        >
          Download PDF instead
        </a>
      </div>
    );
  }

  const sized = Boolean(pageWidth && pageHeight);

  return (
    <div
      ref={stageRef}
      className="flex h-full w-full items-center justify-center"
    >
      <Document
        file={fileData}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <p className="py-16 text-center text-sm text-white/80">
            Loading document…
          </p>
        }
        error={
          <p className="py-16 text-center text-sm text-red-300">
            Unable to open this document.
          </p>
        }
        suspense={false}
      >
        {sized ? (
          <div
            className={[
              "pdf-stage",
              "pdf-book",
              `style-${activeStyle}`,
              isBookStyle ? "is-book" : "is-travel",
              isNext ? "is-next" : "",
              isPrev ? "is-prev" : "",
              isRunning ? "is-run" : "",
            ].join(" ")}
            style={
              {
                width: bookWidth ?? undefined,
                height: pageHeight,
                "--page-w": `${pageWidth}px`,
                "--book-w": `${bookWidth}px`,
              } as CSSProperties
            }
          >
            {visiblePages.map((page) => {
              const meta = slotMeta(page, pageNumber, twoPage, step);
              return (
                <div
                  key={page}
                  className={`pdf-slot is-${meta.side} is-${meta.band}`}
                  style={{ width: pageWidth!, height: pageHeight }}
                >
                  <PdfPage
                    pageNumber={page}
                    width={pageWidth!}
                    rotate={rotate}
                  />
                </div>
              );
            })}

            {twoPage && !currentRight ? (
              <div
                className="pdf-slot is-right is-cur"
                style={{ width: pageWidth!, height: pageHeight }}
                aria-hidden
              >
                <div className="h-full w-full bg-white" />
              </div>
            ) : null}

            {twoPage ? <div className="pdf-spine" /> : null}

            {isBookStyle && flipDir ? (
              <div
                className={[
                  "pdf-leaf",
                  isNext ? "is-right" : "is-left",
                  activeStyle === "drag" || isRunning ? "is-animating" : "",
                  isRunning && activeStyle !== "drag" ? "is-flipped" : "",
                  dragRef.current ? "is-dragging" : "",
                ].join(" ")}
                style={
                  {
                    left: twoPage && isNext ? pageWidth! : 0,
                    width: pageWidth!,
                    height: pageHeight,
                    "--flip-progress":
                      activeStyle === "drag" ? flipProgress : undefined,
                  } as CSSProperties
                }
                onTransitionEnd={onLeafTransitionEnd}
              >
                <div className="pdf-leaf-face">
                  <PdfPage
                    pageNumber={leafFront}
                    width={pageWidth!}
                    rotate={rotate}
                  />
                  <div className="pdf-leaf-shadow" />
                </div>
                <div className="pdf-leaf-face is-back">
                  <PdfPage
                    pageNumber={leafBack}
                    width={pageWidth!}
                    rotate={rotate}
                  />
                </div>
              </div>
            ) : null}

            {activeStyle === "drag" && !flipDir ? (
              <>
                <button
                  type="button"
                  aria-label="Drag to next page"
                  className="pdf-drag-handle is-right"
                  onPointerDown={(event) => {
                    if (!nextLeft && !(twoPage && nextRight)) return;
                    beginDrag(event, "next");
                  }}
                />
                {pageNumber > 1 ? (
                  <button
                    type="button"
                    aria-label="Drag to previous page"
                    className="pdf-drag-handle is-left"
                    onPointerDown={(event) => beginDrag(event, "prev")}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-white/80">
            Loading document…
          </p>
        )}
      </Document>
    </div>
  );
}
