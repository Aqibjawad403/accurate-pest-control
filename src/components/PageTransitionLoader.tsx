"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`page-loader${isLoading ? " page-loader--visible" : ""}`}
      aria-hidden={!isLoading}
    >
      <div className="page-loader__animation" role="status" aria-label="Loading">
        <svg
          className="page-loader__orbit"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <circle
            className="page-loader__arc page-loader__arc--one"
            cx="60"
            cy="60"
            r="46"
          />
          <circle
            className="page-loader__arc page-loader__arc--two"
            cx="60"
            cy="60"
            r="46"
          />
        </svg>
        <span className="page-loader__logo" aria-hidden="true">
          <Image
            src="/logo1.png"
            alt=""
            width={52}
            height={52}
            className="page-loader__logo-img"
            priority
          />
        </span>
      </div>
    </div>
  );
}
