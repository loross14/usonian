import { Suspense } from "react";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { type Property, type Architect } from "@/types";
import { HomeClient } from "./HomeClient";

// Cast to proper types
const propertiesRaw = propertiesData as Property[];
const architectsRaw = architectsData as Architect[];

function TableSkeleton() {
  return (
    <section className="py-20 px-12">
      <div className="flex justify-between items-center mb-12">
        <div className="h-4 w-32 bg-black/10 animate-pulse" />
        <div className="h-4 w-24 bg-black/10 animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-black/5 animate-pulse" />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  // Join properties with architect names
  const properties = propertiesRaw.map((property) => {
    const architect = architectsRaw.find((a) => a.id === property.architect_id);
    return {
      ...property,
      architect_name: architect?.name,
      is_taliesin: architect?.fellowship_years !== null,
    };
  });

  // Get featured properties (for sale) - first 3
  const featuredProperties = properties
    .filter((p) => p.status === "active")
    .slice(0, 3);

  // Get homes for table - newest active listings (sorted by year_built descending)
  const tableProperties = properties
    .filter((p) => p.status === "active")
    .sort((a, b) => (b.year_built || 0) - (a.year_built || 0))
    .slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="v2-hero">
        <h1 className="v2-hero-title">
          <span>ARCHITECT</span>
          <span>DESIGNED</span>
          <span>HOMES</span>
        </h1>
        <p className="v2-hero-subtitle">WHO DESIGNED YOUR HOME?</p>
      </section>

      {/* Featured Properties */}
      <Suspense fallback={<TableSkeleton />}>
        <HomeClient
          featuredProperties={featuredProperties}
          tableProperties={tableProperties}
        />
      </Suspense>
    </>
  );
}
