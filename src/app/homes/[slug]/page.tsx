import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import propertiesDataRaw from "@/data/properties.json";
import architectsDataRaw from "@/data/architects.json";
import { formatPrice, formatLocation, getPropertyBadgeType, type Property, type Architect } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ReferenceLink } from "@/components/ui/ReferenceLink";
import { ViewPhotosButton } from "@/components/ui/ViewPhotosButton";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getHeroImageUrl } from "@/lib/hero-images";
import { getArchitectPortraitUrl } from "@/lib/architect-portraits";
import { isValidUrl } from "@/lib/url-helpers";
import { SiteHeader } from "@/components/layout/SiteHeader";

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
    title: "Usonian",
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

  // Get hero image (prioritize JPG photos over SVG illustrations)
  const heroImageUrl = getHeroImageUrl(property.slug);
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);
  const propertyImageUrl = heroImageUrl || generatedSvgUrl;

  // Get architect portrait if available
  const architectPortraitUrl = architect ? getArchitectPortraitUrl(architect.slug) : null;

  const isTaliesin = architect?.fellowship_years !== null;

  return (
    <>
      {/* Site Header with Breadcrumb */}
      <SiteHeader
        breadcrumbs={[
          { label: "USONIAN", href: "/" },
          { label: "HOMES", href: "/homes" },
          { label: property.home_name.toUpperCase() },
        ]}
      />

      {/* Hero Section - Split Layout */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
            {/* Left: Content */}
            <div className="flex-1">

              {/* Architect */}
              {architect && (
                <Link
                  href={`/architects/${architect.slug}`}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] mb-4 opacity-60 hover:opacity-100 transition-opacity"
                >
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
                <span className="opacity-30" aria-hidden="true">{"/"}</span><span className="opacity-30" aria-hidden="true">{"/"}</span>
                <span className="opacity-60">{location}</span>
                <span className="opacity-30" aria-hidden="true">{"/"}</span><span className="opacity-30" aria-hidden="true">{"/"}</span>
                <Badge status={getPropertyBadgeType(property)} />
                {property.preservation_status && (
                  <>
                    <span className="opacity-30" aria-hidden="true">{"/"}</span><span className="opacity-30" aria-hidden="true">{"/"}</span>
                    <span className="text-gold text-[10px] tracking-[0.2em]">{property.preservation_status}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right: Story + View Photos */}
            <div className="lg:flex-shrink-0 lg:self-start lg:max-w-lg flex flex-col gap-4">
              {/* Property Image */}
              {propertyImageUrl && (
                <div className="w-full aspect-[4/3] rounded overflow-hidden relative">
                  <Image
                    src={propertyImageUrl}
                    alt={property.home_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 512px"
                  />
                </div>
              )}

              {/* Story Content */}
              <div>
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

              {/* Button */}
              <div>
                <ViewPhotosButton url={property.best_image_url} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - 3 Column Cards */}
      <section className="border-b border-black bg-black/[0.02]">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Details Card */}
            <div className="border border-black p-6 bg-white">
              <h3 className="mb-6 text-[11px] tracking-[0.2em] opacity-60">DETAILS</h3>
              <dl className="space-y-4">
                {property.year_built && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Year Built</dt>
                    <dd className="font-bold">{property.year_built}</dd>
                  </div>
                )}
                {location && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Location</dt>
                    <dd className="font-bold text-right max-w-[60%]">{location}</dd>
                  </div>
                )}
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
                {property.square_footage && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Size</dt>
                    <dd className="font-bold">{property.square_footage.toLocaleString()} sq ft</dd>
                  </div>
                )}
                {(property.bedrooms || property.bathrooms) && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Beds / Baths</dt>
                    <dd className="font-bold">{property.bedrooms || "—"} / {property.bathrooms || "—"}</dd>
                  </div>
                )}
                {property.last_sale_date && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Last Sale</dt>
                    <dd className="font-bold">{property.last_sale_date}</dd>
                  </div>
                )}
                {property.last_sale_price && (
                  <div className="flex justify-between text-xs">
                    <dt className="opacity-50">Price</dt>
                    <dd className={`font-bold ${property.status === 'active' ? 'text-red' : ''}`}>
                      {property.status === 'sold' ? 'SOLD FOR ' : ''}{formatPrice(property.last_sale_price)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* References & Purchase History Card */}
            <div className="border border-black p-6 bg-white">
              {/* References Section */}
              <div className="mb-6">
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

              {/* Divider */}
              <div className="border-t border-black/20 my-6"></div>

              {/* Purchase History Section */}
              <div>
                <h3 className="mb-4 text-[11px] tracking-[0.2em] opacity-60">PURCHASE HISTORY</h3>
                {property.listing_source_url ? (
                  <a
                    href={property.listing_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red hover:underline"
                  >
                    View listing source →
                  </a>
                ) : (
                  <p className="text-xs opacity-40 italic">Data unknown currently</p>
                )}
              </div>
            </div>

            {/* Architect Card */}
            {architect && (
              <Link
                href={`/architects/${architect.slug}`}
                className="block border border-black p-6 bg-white hover:bg-black/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase opacity-60">Architect</span>
                </div>
                {/* Architect Portrait */}
                {architectPortraitUrl && (
                  <div className="mb-4">
                    <Image
                      src={architectPortraitUrl}
                      alt={`Portrait of ${architect.name}`}
                      width={96}
                      height={96}
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
      </section>

    </>
  );
}
