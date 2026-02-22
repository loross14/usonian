import { Suspense } from "react";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { type Property, type Architect } from "@/types";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { HomesClient } from "./HomesClient";

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

export default function HomesPage() {
  // Join properties with architect names
  const properties = propertiesRaw.map((property) => {
    const architect = architectsRaw.find((a) => a.id === property.architect_id);
    return {
      ...property,
      architect_name: architect?.name,
      is_taliesin: architect?.fellowship_years !== null,
    };
  });

  // Get unique states for filter dropdown
  const uniqueStates = [
    ...new Set(properties.map((p) => p.parsed_state).filter(Boolean)),
  ] as string[];

  // Stats
  const totalProperties = properties.length;
  const activeCount = properties.filter((p) => p.status === "active").length;
  const soldCount = properties.filter(
    (p) => p.status === "sold" || p.status === "archived"
  ).length;
  const museumCount = properties.filter(
    (p) => p.status === "museum" || p.status === "donated"
  ).length;

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          <h1 className="animate-fade-up mb-4">HOMES</h1>
          <p className="text-xs tracking-[0.15em] opacity-50 max-w-xl animate-fade-up animate-delay-1">
            A CURATED INDEX OF {totalProperties} ARCHITECT-DESIGNED RESIDENCES.
            <br />
            BROWSE BY ARCHITECT, LOCATION, OR STATUS.
          </p>
        </div>
      </section>

      {/* Prairie Lines */}
      <div className="container">
        <PrairieLines />
      </div>

      {/* Client-side Filters and List */}
      <Suspense fallback={<FiltersSkeleton />}>
        <HomesClient
          properties={properties}
          architects={architectsRaw}
          states={uniqueStates}
          counts={{
            all: totalProperties,
            active: activeCount,
            sold: soldCount,
            museum: museumCount,
          }}
        />
      </Suspense>
    </>
  );
}
