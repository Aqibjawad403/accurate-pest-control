import { Suspense } from "react";
import { notFound } from "next/navigation";
import LegacySectorRedirect from "@/components/LegacySectorRedirect";
import ServicesAnimations from "@/components/ServicesAnimations";
import ServicesDirectory from "@/components/ServicesDirectory";
import ServicesHero from "@/components/ServicesHero";
import {
  getAllPestPageSlugs,
  resolvePestSlug,
  resolveServiceSlug,
} from "@/data/pest-services";

const LEGACY_SECTOR_SLUGS = [
  "hotels-hospitality-sectors",
  "shopping-malls-sectors",
  "restaurants-sectors",
  "manufacturing-units-sectors",
  "hospitals-sectors",
  "commercial-buildings-sectors",
  "offices-sectors",
  "schools-sectors",
  "warehouse-sectors",
] as const;

export function generateStaticParams() {
  return [...getAllPestPageSlugs(), ...LEGACY_SECTOR_SLUGS].map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

export default async function PestSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if ((LEGACY_SECTOR_SLUGS as readonly string[]).includes(slug)) {
    return <LegacySectorRedirect />;
  }
  if (!resolvePestSlug(slug) && !resolveServiceSlug(slug)) {
    notFound();
  }

  return (
    <ServicesAnimations>
      <Suspense fallback={null}>
        <ServicesHero />
        <ServicesDirectory />
      </Suspense>
    </ServicesAnimations>
  );
}
