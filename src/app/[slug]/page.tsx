import { Suspense } from "react";
import { notFound } from "next/navigation";
import ServicesAnimations from "@/components/ServicesAnimations";
import ServicesDirectory from "@/components/ServicesDirectory";
import ServicesHero from "@/components/ServicesHero";
import {
  getAllPestPageSlugs,
  resolvePestSlug,
  resolveServiceSlug,
} from "@/data/pest-services";

export function generateStaticParams() {
  return getAllPestPageSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function PestSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
