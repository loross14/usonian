import { Suspense } from "react";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { matchesExperienceFilter, type Property, type Architect } from "@/types";
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
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
            {/* Left: Logo + Title + Subtitle */}
            <div className="flex-shrink-0 relative">
              {/* American Flag Balloon Concept - Underlay */}
              <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ zIndex: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" className="w-full h-full"><defs><radialGradient id="d12-redBalloon" cx="30%" cy="30%" r="60%"><stop offset="0%" stopColor="#FF6B6B"/><stop offset="100%" stopColor="#E63946"/></radialGradient><radialGradient id="d12-whiteBalloon" cx="30%" cy="30%" r="60%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#F0F0F0"/></radialGradient><radialGradient id="d12-blueBalloon" cx="30%" cy="30%" r="60%"><stop offset="0%" stopColor="#6B9FC4"/><stop offset="100%" stopColor="#457B9D"/></radialGradient><style>{`.d12-stripe{opacity:0.9}.d12-star{opacity:0.95}.d12-string{stroke:#999;stroke-width:0.5;fill:none;opacity:0.6}.d12-float1{animation:d12-float1 4s ease-in-out infinite}.d12-float2{animation:d12-float2 5s ease-in-out infinite}.d12-float3{animation:d12-float3 4.5s ease-in-out infinite}.d12-float4{animation:d12-float4 3.8s ease-in-out infinite}.d12-sway{animation:d12-sway 6s ease-in-out infinite}@keyframes d12-float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes d12-float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes d12-float3{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes d12-float4{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@keyframes d12-sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}`}</style></defs><g className="d12-sway" style={{transformOrigin:'320px 100px'}}><g className="d12-stripes"><g className="d12-float1"><rect className="d12-stripe" x="180" y="30" width="280" height="12" rx="6" fill="url(#d12-redBalloon)"/></g><g className="d12-float2"><rect className="d12-stripe" x="190" y="48" width="260" height="12" rx="6" fill="url(#d12-whiteBalloon)"/></g><g className="d12-float3"><rect className="d12-stripe" x="200" y="66" width="240" height="12" rx="6" fill="url(#d12-redBalloon)"/></g><g className="d12-float1"><rect className="d12-stripe" x="210" y="84" width="220" height="12" rx="6" fill="url(#d12-whiteBalloon)"/></g><g className="d12-float4"><rect className="d12-stripe" x="220" y="102" width="200" height="12" rx="6" fill="url(#d12-redBalloon)"/></g><g className="d12-float2"><rect className="d12-stripe" x="230" y="120" width="180" height="12" rx="6" fill="url(#d12-whiteBalloon)"/></g><g className="d12-float3"><rect className="d12-stripe" x="240" y="138" width="160" height="12" rx="6" fill="url(#d12-redBalloon)"/></g></g><g className="d12-union"><rect x="180" y="30" width="90" height="66" rx="8" fill="url(#d12-blueBalloon)" className="d12-float1"/><g className="d12-stars"><circle className="d12-star d12-float2" cx="198" cy="42" r="4" fill="white"/><circle className="d12-star d12-float3" cx="218" cy="42" r="4" fill="white"/><circle className="d12-star d12-float4" cx="238" cy="42" r="4" fill="white"/><circle className="d12-star d12-float1" cx="255" cy="42" r="4" fill="white"/><circle className="d12-star d12-float4" cx="208" cy="55" r="4" fill="white"/><circle className="d12-star d12-float2" cx="228" cy="55" r="4" fill="white"/><circle className="d12-star d12-float3" cx="248" cy="55" r="4" fill="white"/><circle className="d12-star d12-float1" cx="198" cy="68" r="4" fill="white"/><circle className="d12-star d12-float3" cx="218" cy="68" r="4" fill="white"/><circle className="d12-star d12-float2" cx="238" cy="68" r="4" fill="white"/><circle className="d12-star d12-float4" cx="255" cy="68" r="4" fill="white"/><circle className="d12-star d12-float2" cx="208" cy="81" r="4" fill="white"/><circle className="d12-star d12-float1" cx="228" cy="81" r="4" fill="white"/><circle className="d12-star d12-float4" cx="248" cy="81" r="4" fill="white"/></g></g></g><g className="d12-accent-balloons"><g className="d12-float2"><ellipse cx="520" cy="65" rx="18" ry="22" fill="url(#d12-redBalloon)" opacity="0.8"/><path className="d12-string" d="M520 87 Q522 120 518 160"/></g><g className="d12-float4"><ellipse cx="555" cy="80" rx="14" ry="17" fill="url(#d12-whiteBalloon)" opacity="0.85"/><path className="d12-string" d="M555 97 Q553 130 556 165"/></g><g className="d12-float1"><ellipse cx="105" cy="70" rx="16" ry="20" fill="url(#d12-blueBalloon)" opacity="0.75"/><path className="d12-string" d="M105 90 Q107 125 104 168"/></g><g className="d12-float3"><ellipse cx="75" cy="90" rx="12" ry="15" fill="url(#d12-redBalloon)" opacity="0.7"/><path className="d12-string" d="M75 105 Q73 140 76 175"/></g></g></svg>
              </div>
              <div className="flex items-center gap-4 md:gap-6 relative" style={{ zIndex: 1 }}>
                {/* Logo - Left, sized to match text block height */}
                <img
                  src="/icons/Usonian-Logo.png"
                  alt=""
                  aria-hidden="true"
                  className="flex-shrink-0 animate-fade-up h-16 w-16 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain"
                />
                {/* Title + Subtitle - Right */}
                <div>
                  <h1 className="animate-fade-up mb-2">
                    ARCHIVE
                  </h1>
                  <p className="text-xs tracking-[0.15em] animate-fade-up animate-delay-1" style={{ color: 'var(--v2-red)' }}>
                    CELEBRATING 250 YEARS OF AMERICAN ARCHITECTURE.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Filter slot (rendered via portal from HomesClient) */}
            <div id="hero-filter-slot" className="md:flex-shrink-0 md:mt-2" />
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
