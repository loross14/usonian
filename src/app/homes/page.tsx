import { Suspense } from "react";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { matchesExperienceFilter, type Property, type Architect } from "@/types";
import { HomesClient } from "./HomesClient";
import { CompassIcon } from "@/components/icons/CompassIcon";

// Cast to proper types
const propertiesRaw = propertiesData as Property[];
const architectsRaw = architectsData as Architect[];

export const metadata = {
  title: "Usonian",
  description:
    "Browse our curated collection of architect-designed homes by master architects.",
};

function FiltersSkeleton() {
  return (
    <section className="border-b border-black bg-black/[0.02]">
      <div className="container py-4">
        <div className="flex items-center gap-4">
          <div className="h-6 w-16 bg-black/10 animate-pulse" />
          <div className="h-6 w-24 bg-black/10 animate-pulse" />
          <div className="h-6 w-24 bg-black/10 animate-pulse" />
          <div className="h-6 w-24 bg-black/10 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default async function HomesPage({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string }>;
}) {
  const params = await searchParams;
  const limit = params.limit ? parseInt(params.limit, 10) : undefined;

  // Join properties with architect names
  const allProperties = propertiesRaw.map((property) => {
    const architect = architectsRaw.find((a) => a.id === property.architect_id);
    return {
      ...property,
      architect_name: architect?.name,
      is_taliesin: architect?.fellowship_years !== null,
    };
  });

  // Apply limit if specified (for Figma capture)
  const properties = limit ? allProperties.slice(0, limit) : allProperties;

  // Get unique states for filter dropdown
  const uniqueStates = [
    ...new Set(properties.map((p) => p.parsed_state).filter(Boolean)),
  ] as string[];

  // Stats (use allProperties for accurate counts) - experience-based filters
  const totalProperties = allProperties.length;
  const saleCount = allProperties.filter((p) => matchesExperienceFilter(p, 'sale')).length;
  const visitCount = allProperties.filter((p) => matchesExperienceFilter(p, 'visit')).length;
  const stayCount = allProperties.filter((p) => matchesExperienceFilter(p, 'stay')).length;
  const offmarketCount = allProperties.filter((p) => matchesExperienceFilter(p, 'offmarket')).length;

  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="container py-8 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
            {/* Left: Title + Subtitle */}
            <div className="flex-shrink-0 max-w-xl">
              <h1 className="animate-fade-up mb-4">
                ARCHIVE<CompassIcon size="period" className="ml-1 align-baseline" />
              </h1>
              <p className="text-xs tracking-[0.15em] animate-fade-up animate-delay-1" style={{ color: 'var(--v2-red)' }}>
                CELEBRATING 250 YEARS OF AMERICAN ARCHITECTURE.
              </p>
            </div>

            {/* Right: Filter slot (rendered via portal from HomesClient) */}
            <div id="hero-filter-slot" className="lg:flex-shrink-0 lg:mt-2" />
          </div>
        </div>
      </section>

      {/* Client-side Filters and List */}
      <Suspense fallback={<FiltersSkeleton />}>
        <HomesClient
          properties={properties}
          architects={architectsRaw}
          states={uniqueStates}
          counts={{
            all: totalProperties,
            sale: saleCount,
            visit: visitCount,
            stay: stayCount,
            offmarket: offmarketCount,
          }}
        />
      </Suspense>
    </>
  );
}
