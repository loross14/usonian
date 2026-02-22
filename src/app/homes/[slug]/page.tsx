import { notFound } from "next/navigation";
import Link from "next/link";
import propertiesDataRaw from "@/data/properties.json";
import architectsDataRaw from "@/data/architects.json";
import { formatPrice, formatLocation, type Property, type Architect } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { StarIcon } from "@/components/icons/StarIcon";
import { PropertyAlertButton } from "@/components/property/PropertyAlertButton";
import { ReferenceLink } from "@/components/ui/ReferenceLink";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getArchitectPortraitUrl } from "@/lib/architect-portraits";
import { isValidUrl } from "@/lib/url-helpers";

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
    : "PRICE UPON REQUEST";

  // Use generated SVG as primary hero image
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);

  // Get architect portrait if available
  const architectPortraitUrl = architect ? getArchitectPortraitUrl(architect.slug) : null;

  // Get related properties by the same architect
  const relatedProperties = propertiesData
    .filter((p) => p.architect_id === property.architect_id && p.id !== property.id)
    .slice(0, 4)
    .map((p) => ({
      ...p,
      architect_name: architect?.name,
    }));

  const isTaliesin = architect?.fellowship_years !== null;

  return (
    <>
      {/* Hero Section - Massive Typography */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] tracking-[0.15em] opacity-50">
              <li>
                <Link href="/homes" className="hover:opacity-100 transition-opacity">
                  HOMES
                </Link>
              </li>
              <li>/</li>
              <li className="opacity-100 font-bold">{property.home_name.toUpperCase()}</li>
            </ol>
          </nav>

          {/* Architect */}
          {architect && (
            <Link
              href={`/architects/${architect.slug}`}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] mb-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              <StarIcon size={12} active={isTaliesin} />
              <span className="uppercase">{architect.name}</span>
              {isTaliesin && (
                <span className="fellowship-badge ml-2">Taliesin {architect.fellowship_years}</span>
              )}
            </Link>
          )}

          {/* Title */}
          <h1 className="animate-fade-up mb-6">{property.home_name}</h1>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.1em]">
            <span className="opacity-60">{property.year_built}</span>
            <span className="opacity-30">//</span>
            <span className="opacity-60">{location}</span>
            <span className="opacity-30">//</span>
            <Badge status={property.status} />
            {property.preservation_status && (
              <>
                <span className="opacity-30">//</span>
                <span className="text-gold text-[10px] tracking-[0.2em]">{property.preservation_status}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Prairie Lines */}
      <div className="container">
        <PrairieLines />
      </div>

      {/* Data Grid */}
      <section className="border-b border-black">
        <div className="data-grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <div className="data-cell animate-fade-up animate-delay-1">
            <div className="data-label">Year</div>
            <div className="data-value">{property.year_built}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-2">
            <div className="data-label">Location</div>
            <div className="data-value text-base">{property.parsed_city || "—"}</div>
            <div className="text-xs opacity-50 mt-1">{property.parsed_state}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-3">
            <div className="data-label">Status</div>
            <div className="mt-2">
              <Badge status={property.status} />
            </div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-4">
            <div className="data-label">Price</div>
            <div className={`data-value ${property.status === 'active' ? 'text-red' : ''}`}>
              {property.last_sale_price ? formatPrice(property.last_sale_price) : "—"}
            </div>
          </div>
          {property.square_footage && (
            <div className="data-cell animate-fade-up">
              <div className="data-label">Size</div>
              <div className="data-value">{property.square_footage.toLocaleString()}</div>
              <div className="text-xs opacity-50 mt-1">SQ FT</div>
            </div>
          )}
          {(property.bedrooms || property.bathrooms) && (
            <div className="data-cell animate-fade-up">
              <div className="data-label">Beds / Baths</div>
              <div className="data-value">
                {property.bedrooms || "—"} / {property.bathrooms || "—"}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Property Image */}
      {generatedSvgUrl && (
        <section className="border-b border-black bg-sand">
          <div className="aspect-[21/9] relative overflow-hidden">
            <img
              src={generatedSvgUrl}
              alt={property.home_name}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Content Grid */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* The Story */}
              <div className="mb-12">
                <h2 className="mb-6">THE STORY</h2>
                <div className="accent-border">
                  <p className="text-sm leading-relaxed opacity-80">
                    {property.description ||
                      `This ${property.year_built} residence by ${architect?.name || 'a master architect'} exemplifies thoughtful architectural design with its integration of indoor and outdoor spaces, use of natural materials, and response to the surrounding landscape.`
                    }
                  </p>
                  {property.significance && (
                    <p className="text-sm leading-relaxed opacity-80 mt-4">
                      <span className="font-bold">SIGNIFICANCE:</span> {property.significance}
                    </p>
                  )}
                  {property.curator_notes && (
                    <p className="text-xs leading-relaxed opacity-50 mt-4 italic">
                      NOTE: {property.curator_notes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Details Card */}
              <div className="border border-black p-6">
                <h3 className="mb-6 text-[11px] tracking-[0.2em] opacity-60">DETAILS</h3>
                <dl className="space-y-4">
                  {property.client_owner && (
                    <div className="flex justify-between text-xs">
                      <dt className="opacity-50">Original Owner</dt>
                      <dd className="font-bold text-right max-w-[60%]">{property.client_owner}</dd>
                    </div>
                  )}
                  {property.current_owner && (
                    <div className="flex justify-between text-xs">
                      <dt className="opacity-50">Current Owner</dt>
                      <dd className="font-bold text-right max-w-[60%]">{property.current_owner}</dd>
                    </div>
                  )}
                  {property.last_sale_date && (
                    <div className="flex justify-between text-xs">
                      <dt className="opacity-50">Last Sale</dt>
                      <dd className="font-bold">{property.last_sale_date}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* References Card */}
              <div className="border border-black p-6">
                <h3 className="mb-4 text-[11px] tracking-[0.2em] opacity-60">REFERENCES</h3>
                {isValidUrl(property.best_image_url) ? (
                  <div className="space-y-2">
                    <ReferenceLink url={property.best_image_url} />
                  </div>
                ) : (
                  <p className="text-xs opacity-40 italic">
                    No external references available
                  </p>
                )}
              </div>

              {/* Watch for Listing Card - only for off-market properties */}
              {property.status !== 'active' && (
                <div className="border border-black bg-black/[0.02] p-6">
                  <h3 className="mb-2 text-[11px] tracking-[0.2em]">INTERESTED?</h3>
                  <p className="text-xs opacity-60 mb-4">
                    Get notified when this property becomes available.
                  </p>
                  <PropertyAlertButton
                    propertyId={property.id}
                    propertyName={property.home_name}
                    variant="sidebar"
                  />
                </div>
              )}

              {/* Architect Card */}
              {architect && (
                <Link
                  href={`/architects/${architect.slug}`}
                  className="block border border-black p-6 hover:bg-black/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <StarIcon size={16} active={isTaliesin} />
                    <span className="text-[10px] tracking-[0.15em] uppercase opacity-60">Architect</span>
                  </div>
                  {/* Architect Portrait */}
                  {architectPortraitUrl && (
                    <div className="mb-4">
                      <img
                        src={architectPortraitUrl}
                        alt={`Portrait of ${architect.name}`}
                        className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  )}
                  <h3 className="text-sm mb-2 group-hover:underline underline-offset-4">{architect.name}</h3>
                  {architect.fellowship_years && (
                    <p className="text-[10px] tracking-[0.1em] opacity-50 mb-2">
                      TALIESIN {architect.fellowship_years}
                    </p>
                  )}
                  <p className="text-xs opacity-60 line-clamp-3">
                    {architect.biography?.slice(0, 150)}...
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="border-b border-black">
          <div className="container py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg">MORE FROM {architect?.name?.toUpperCase()}</h2>
              <Link
                href={`/architects/${architect?.slug}`}
                className="text-[10px] tracking-[0.1em] opacity-50 hover:opacity-100 border-b border-transparent hover:border-black transition-all"
              >
                VIEW ALL
              </Link>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[40px_1fr_80px_140px_100px_120px] gap-4 py-3 border-b-2 border-black text-[9px] tracking-[0.15em] opacity-50 uppercase">
              <div></div>
              <div>Property</div>
              <div>Year</div>
              <div>Location</div>
              <div className="text-right">Status</div>
              <div className="text-right">Price</div>
            </div>

            {/* Related Property Rows */}
            {relatedProperties.map((p) => {
              const relLocation = formatLocation(p.parsed_city, p.parsed_state);
              const relPrice = p.last_sale_price ? formatPrice(p.last_sale_price) : "Upon Request";

              return (
                <Link
                  key={p.id}
                  href={`/homes/${p.slug}`}
                  className="property-row grid grid-cols-1 md:grid-cols-[40px_1fr_80px_140px_100px_120px] gap-2 md:gap-4"
                >
                  <div className="hidden md:flex justify-center">
                    <StarIcon size={10} active={isTaliesin} />
                  </div>
                  <div className="text-xs font-bold">{p.home_name}</div>
                  <div className="text-[11px] opacity-60">{p.year_built}</div>
                  <div className="text-[11px] tracking-[0.02em]">{relLocation}</div>
                  <div className="md:text-right">
                    <Badge status={p.status} />
                  </div>
                  <div className={`font-bold text-xs md:text-right ${p.status === 'active' ? 'text-red' : ''}`}>
                    {relPrice}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
