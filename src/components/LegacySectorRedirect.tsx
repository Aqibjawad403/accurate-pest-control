"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacySectorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sectors");
  }, [router]);

  return null;
}
