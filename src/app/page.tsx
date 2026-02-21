import Link from "next/link";
import Image from "next/image";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getArchitectPortraitUrl, getArchitectPortraitWideUrl } from "@/lib/architect-portraits";

export default function HomePage() {
  // Get featured properties (for sale + have images)
  const featuredProperties = propertiesData
    .filter((p) => p.best_image_url)
    .slice(0, 5)
    .map((property) => {
      const architect = architectsData.find((a) => a.id === property.architect_id);
      return {
        ...property,
        architect_name: architect?.name,
      };
    });

  // Get a spotlight architect (preferring one with a portrait)
  const architectsWithPortraits = architectsData.filter(
    (a) => getArchitectPortraitUrl(a.slug) !== null
  );
  const spotlightArchitect = architectsWithPortraits[0] || architectsData[0];
  const spotlightPortraitUrl = getArchitectPortraitUrl(spotlightArchitect.slug);
  const spotlightPortraitWideUrl = getArchitectPortraitWideUrl(spotlightArchitect.slug);

  const heroProperty = featuredProperties[0];

  return (
    <>
      {/* Hero Section - Dual Entry Points */}
      <section className="relative min-h-[70vh] flex items-center bg-charcoal">
        {/* Background Image - subtle */}
        {heroProperty?.best_image_url && (
          <div className="absolute inset-0">
            <Image
              src={heroProperty.best_image_url}
              alt=""
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80" />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative container">
          <div className="max-w-4xl">
            {/* Tagline */}
            <p className="text-gold text-sm font-medium uppercase tracking-wider mb-6">
              For those who know the difference
            </p>

            <h1 className="text-warm-white mb-6">
              Architect-Designed,
              <br />
              <span className="text-terracotta">Curated.</span>
            </h1>

            <p className="text-slate-light text-lg mb-12 max-w-xl">
              Homes by the architects who studied with Wright. Stories that
              outlive the sale.
            </p>

            {/* Two Clear Entry Points */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/homes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-warm-white font-medium rounded hover:bg-terracotta-dark transition-colors"
              >
                Browse Homes
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/architects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-light text-warm-white font-medium rounded hover:border-warm-white hover:bg-warm-white/5 transition-colors"
              >
                Meet the Architects
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-warm-white">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionHeading className="mb-2">Featured Homes</SectionHeading>
              <p className="text-slate">
                Exceptional properties by master architects
              </p>
            </div>
            <Link
              href="/homes"
              className="text-terracotta font-medium hover:text-terracotta-dark transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(1, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Architect Spotlight */}
      <section className="section bg-sand">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-terracotta text-sm font-medium uppercase tracking-wider mb-4">
                Architect Spotlight
              </p>
              <h2 className="mb-6">{spotlightArchitect.name}</h2>
              <p className="text-slate mb-4">
                {spotlightArchitect.fellowship_years && (
                  <span className="text-cypress">
                    Taliesin Fellowship {spotlightArchitect.fellowship_years}
                  </span>
                )}
              </p>
              <p className="text-charcoal mb-6 leading-relaxed">
                {spotlightArchitect.biography?.slice(0, 300)}...
              </p>
              <Link
                href={`/architects/${spotlightArchitect.slug}`}
                className="inline-flex items-center gap-2 text-terracotta font-medium hover:text-terracotta-dark transition-colors"
              >
                View Profile
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {/* Architect Portrait */}
              {spotlightPortraitWideUrl ? (
                <div className="bg-warm-white rounded-lg overflow-hidden">
                  <img
                    src={spotlightPortraitWideUrl}
                    alt={`Portrait of ${spotlightArchitect.name}`}
                    className="w-full h-auto"
                  />
                </div>
              ) : spotlightPortraitUrl ? (
                <div className="bg-warm-white p-4 rounded-lg flex justify-center">
                  <img
                    src={spotlightPortraitUrl}
                    alt={`Portrait of ${spotlightArchitect.name}`}
                    className="w-48 h-48 object-contain"
                  />
                </div>
              ) : null}
              {/* Stats */}
              <div className="bg-warm-white p-8 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-4xl font-heading text-terracotta">
                      {spotlightArchitect.property_count}
                    </p>
                    <p className="text-sm text-slate mt-1">Properties Listed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-heading text-terracotta">
                      {spotlightArchitect.birth_year}
                    </p>
                    <p className="text-sm text-slate mt-1">Born</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - refined */}
      <section className="py-16 md:py-20 bg-charcoal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-light text-sm uppercase tracking-wider mb-4">
              The collection grows
            </p>
            <h2 className="text-warm-white mb-4">
              {propertiesData.length} homes and counting
            </h2>
            <p className="text-slate-light mb-8">
              Each one a piece of architectural history.
            </p>
            <Link
              href="/homes"
              className="inline-flex items-center gap-2 text-terracotta font-medium hover:text-terracotta-dark transition-colors"
            >
              See them all
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
