import { Suspense } from "react";
import HomeAnimations from "@/components/HomeAnimations";
import SectorsDirectory from "@/components/SectorsDirectory";
import SectorsHero from "@/components/SectorsHero";

export default function SectorsScreen() {
  return (
    <HomeAnimations>
      <SectorsHero />
      <Suspense fallback={null}>
        <SectorsDirectory />
      </Suspense>
    </HomeAnimations>
  );
}
