import { Suspense } from "react";
import ServicesAnimations from "@/components/ServicesAnimations";
import ServicesDirectory from "@/components/ServicesDirectory";
import ServicesHero from "@/components/ServicesHero";

type SearchParams = Promise<{
  pest?: string;
  type?: string;
  service?: string;
}>;

type ServicesPageProps = {
  searchParams: SearchParams;
};

function ServicesShell({
  pest,
  type,
  service,
}: {
  pest: string | null;
  type: string | null;
  service: string | null;
}) {
  return (
    <ServicesAnimations>
      <ServicesHero pest={pest} type={type} service={service} />
      <ServicesDirectory pest={pest} type={type} service={service} />
    </ServicesAnimations>
  );
}

async function ServicesFromParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <ServicesShell
      pest={params.pest ?? null}
      type={params.type ?? null}
      service={params.service ?? null}
    />
  );
}

export default function ServicesPage({ searchParams }: ServicesPageProps) {
  return (
    <Suspense
      fallback={<ServicesShell pest={null} type={null} service={null} />}
    >
      <ServicesFromParams searchParams={searchParams} />
    </Suspense>
  );
}
