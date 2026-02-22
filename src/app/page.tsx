import { redirect } from "next/navigation";
import { Suspense } from "react";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { type Property, type Architect } from "@/types";
import { HomeClient } from "./HomeClient";
import { CompassIcon } from "@/components/icons/CompassIcon";

// Cast to proper types
const propertiesRaw = propertiesData as Property[];
const architectsRaw = architectsData as Architect[];

export default function HomePage() {
  // Temporary redirect to archive page
  redirect('/homes');
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

  return (
    <>
      {/* Hero Section */}
      <section className="v2-hero">
        <div className="mb-6">
          <CompassIcon size="hero" />
        </div>
        <h1 className="v2-hero-title">
          <span>ARCHITECT</span>
          <span>DESIGNED</span>
          <span>HOMES</span>
        </h1>
        <p className="v2-hero-subtitle">WHO DESIGNED YOUR HOME?</p>
      </section>

      {/* Featured Properties */}
      <Suspense fallback={null}>
        <HomeClient featuredProperties={featuredProperties} />
      </Suspense>
    </>
  );
}
