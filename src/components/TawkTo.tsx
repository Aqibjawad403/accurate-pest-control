"use client";

import { useEffect } from "react";

const PROPERTY_ID = "689adb6e2b2f371923cecf42";
const WIDGET_ID = "1j2eeialn";
const SCRIPT_ID = "tawk-to-apc-dubai";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkTo() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById(SCRIPT_ID)) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
