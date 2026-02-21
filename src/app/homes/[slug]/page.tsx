import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import propertiesDataRaw from "@/data/properties.json";
import architectsDataRaw from "@/data/architects.json";
import { formatPrice, formatLocation, type Property, type Architect } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getArchitectPortraitUrl } from "@/lib/architect-portraits";

// Cast JSON data to proper types
const propertiesData = propertiesDataRaw as Property[];
const architectsData = architectsDataRaw as Architect[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return propertiesData.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = propertiesData.find((p) => p.slug === slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.home_name} | Usonian`,
    description: property.description || `${property.home_name} by ${property.architect_id}`,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = propertiesData.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const architect = architectsData.find((a) => a.id === property.architect_id);
  const location = formatLocation(property.parsed_city, property.parsed_state);
  const price = property.last_sale_price
    ? formatPrice(property.last_sale_price)
    : "Price Upon Request";

  // Use generated SVG as primary hero image (cleaner for design-focused MVP)
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);

  // Get architect portrait if available
  const architectPortraitUrl = architect ? getArchitectPortraitUrl(architect.slug) : null;

  // Get related properties by the same architect
  const relatedProperties = propertiesData
    .filter((p) => p.architect_id === property.architect_id && p.id !== property.id)
    .slice(0, 3)
    .map((p) => ({
      ...p,
      architect_name: architect?.name,
    }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end bg-charcoal">
        {/* Use generated SVG as primary hero (cleaner for design-focused MVP), fallback to best_image_url */}
        {generatedSvgUrl ? (
          <div className="absolute inset-0 bg-warm-white">
            <img
              src={generatedSvgUrl}
              alt={property.home_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
          </div>
        ) : property.best_image_url ? (
          <div className="absolute inset-0">
            <Image
              src={property.best_image_url}
              alt={property.home_name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
          </div>
        ) : null}

        <div className="relative container pb-12 md:pb-16">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-slate-light">
                <li>
                  <Link href="/homes" className="hover:text-warm-white transition-colors">
                    Homes
                  </Link>
                </li>
                <li>/</li>
                <li className="text-warm-white">{property.home_name}</li>
              </ol>
            </nav>

            {/* Architect */}
            {architect && (
              <Link
                href={`/architects/${architect.slug}`}
                className="inline-block text-gold text-sm font-medium uppercase tracking-wider mb-3 hover:text-terracotta transition-colors"
              >
                {architect.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-warm-white mb-4">{property.home_name}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-slate-light mb-6">
              <span>{property.year_built}</span>
              <span className="w-1 h-1 rounded-full bg-slate-light" />
              <span>{location}</span>
              {property.preservation_status && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-light" />
                  <span className="text-gold">{property.preservation_status}</span>
                </>
              )}
            </div>

            {/* Price and Status */}
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl text-warm-white font-medium">
                {price}
              </span>
              <Badge status={property.status} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="section bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* The Story */}
              <div className="mb-12">
                <h2 className="mb-6">The Story</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-charcoal leading-relaxed">
                    {property.description ||
                      `This ${property.year_built} residence by ${architect?.name || 'a master architect'} exemplifies thoughtful architectural design with its integration of indoor and outdoor spaces, use of natural materials, and response to the surrounding landscape.`
                    }
                  </p>
                  {property.significance && (
                    <p className="text-charcoal leading-relaxed mt-4">
                      <strong>Significance:</strong> {property.significance}
                    </p>
                  )}
                  {property.curator_notes && (
                    <p className="text-slate mt-4 italic">
                      Note: {property.curator_notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Image (opens in new tab per user request) */}
              {property.best_image_url && (
                <div className="mb-12">
                  <h3 className="mb-4">Gallery</h3>
                  <a
                    href={property.best_image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-16-9 bg-sand rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={property.best_image_url}
                      alt={property.home_name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal/20">
                      <span className="px-4 py-2 bg-warm-white text-charcoal text-sm font-medium rounded">
                        View Full Image
                      </span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Details Card */}
              <div className="bg-sand p-6 rounded-lg mb-8">
                <h3 className="mb-4">Details</h3>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-slate">Year Built</dt>
                    <dd className="text-charcoal font-medium">{property.year_built}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate">Location</dt>
                    <dd className="text-charcoal font-medium">{location}</dd>
                  </div>
                  {property.square_footage != null && (
                    <div className="flex justify-between">
                      <dt className="text-slate">Size</dt>
                      <dd className="text-charcoal font-medium">
                        {property.square_footage.toLocaleString()} sq ft
                      </dd>
                    </div>
                  )}
                  {property.client_owner && (
                    <div className="flex justify-between">
                      <dt className="text-slate">Original Owner</dt>
                      <dd className="text-charcoal font-medium">{property.client_owner}</dd>
                    </div>
                  )}
                  {property.current_owner && (
                    <div className="flex justify-between">
                      <dt className="text-slate">Current Owner</dt>
                      <dd className="text-charcoal font-medium">{property.current_owner}</dd>
                    </div>
                  )}
                  {property.last_sale_date && (
                    <div className="flex justify-between">
                      <dt className="text-slate">Last Sale</dt>
                      <dd className="text-charcoal font-medium">{property.last_sale_date}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Architect Card */}
              {architect && (
                <div className="bg-warm-white border border-sand p-6 rounded-lg">
                  <p className="text-xs font-medium uppercase tracking-wider text-terracotta mb-2">
                    Architect
                  </p>
                  {/* Architect Portrait */}
                  {architectPortraitUrl && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={architectPortraitUrl}
                        alt={`Portrait of ${architect.name}`}
                        className="w-32 h-32 object-contain rounded"
                      />
                    </div>
                  )}
                  <h3 className="mb-2">{architect.name}</h3>
                  {architect.fellowship_years && (
                    <p className="text-sm text-slate mb-4">
                      Taliesin Fellowship {architect.fellowship_years}
                    </p>
                  )}
                  <p className="text-sm text-charcoal mb-4 line-clamp-3">
                    {architect.biography?.slice(0, 150)}...
                  </p>
                  <Link
                    href={`/architects/${architect.slug}`}
                    className="inline-flex items-center gap-2 text-terracotta text-sm font-medium hover:text-terracotta-dark transition-colors"
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="section bg-sand">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="mb-2">More from {architect?.name}</h2>
                <p className="text-slate">
                  Explore other properties by this architect
                </p>
              </div>
              <Link
                href={`/architects/${architect?.slug}`}
                className="text-terracotta font-medium hover:text-terracotta-dark transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
