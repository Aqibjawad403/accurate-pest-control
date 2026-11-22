import { Suspense } from "react";
import ServicesAnimations from "@/components/ServicesAnimations";
import ServicesDirectory from "@/components/ServicesDirectory";
import ServicesHero from "@/components/ServicesHero";

export default function ServicesPage() {
  return (
    <ServicesAnimations>
      <Suspense fallback={null}>
        <ServicesHero />
        <ServicesDirectory />
      </Suspense>
    </ServicesAnimations>
  );
}
