import { notFound } from "next/navigation";
import Link from "next/link";
import architectsData from "@/data/architects.json";
import propertiesData from "@/data/properties.json";
import { formatPrice, formatLocation, type Architect, type Property } from "@/types";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { StarIcon } from "@/components/icons/StarIcon";
import { Badge } from "@/components/ui/Badge";
import { ReferenceLink } from "@/components/ui/ReferenceLink";
import { getArchitectPortraitUrl, getArchitectPortraitWideUrl } from "@/lib/architect-portraits";
import { isValidUrl } from "@/lib/url-helpers";

// Cast to proper types
const architects = architectsData as Architect[];
const properties = propertiesData as Property[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return architects.map((architect) => ({
    slug: architect.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const architect = architects.find((a) => a.slug === slug);
  if (!architect) return { title: "Architect Not Found" };

  return {
    title: "Usonian",
    description: architect.biography?.slice(0, 160) || `Properties by ${architect.name}`,
  };
}

export default async function ArchitectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const architect = architects.find((a) => a.slug === slug);

  if (!architect) {
    notFound();
  }

  // Get all properties by this architect
  const architectProperties = properties
    .filter((p) => p.architect_id === architect.id)
    .map((p) => ({
      ...p,
      architect_name: architect.name,
    }));

  // Get architect portrait URLs
  const portraitUrl = getArchitectPortraitUrl(architect.slug);
  const portraitWideUrl = getArchitectPortraitWideUrl(architect.slug);

  const isTaliesin = architect.fellowship_years !== null;
  const propertyCount = architectProperties.length;
  const activeYears = architect.birth_year && architect.death_year
    ? architect.death_year - architect.birth_year
    : null;
  const yearStr = architect.birth_year
    ? `${architect.birth_year}${architect.death_year ? ` - ${architect.death_year}` : ' - present'}`
    : "—";

  // Split name for stacked display
  const nameParts = architect.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <>
      {/* Hero Section - Massive Stacked Name */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] tracking-[0.15em] opacity-50">
              <li>
                <Link href="/architects" className="hover:opacity-100 transition-opacity">
                  ARCHITECTS
                </Link>
              </li>
              <li>/</li>
              <li className="opacity-100 font-bold">{architect.name.toUpperCase()}</li>
            </ol>
          </nav>

          {/* Fellowship */}
          {isTaliesin && (
            <div className="flex items-center gap-3 mb-4">
              <StarIcon size={16} active />
              <span className="fellowship-badge">Taliesin {architect.fellowship_years}</span>
            </div>
          )}

          {/* Stacked Name */}
          <h1 className="animate-fade-up mb-6">
            {firstName}<br />
            {lastName && <span className="text-red">{lastName}</span>}
          </h1>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.1em]">
            <span className="opacity-60">{yearStr}</span>
            {architect.birthplace && (
              <>
                <span className="opacity-30">//</span>
                <span className="opacity-60">{architect.birthplace}</span>
              </>
            )}
            <span className="opacity-30">//</span>
            <span className="font-bold">{propertyCount} PROPERTIES</span>
          </div>
        </div>
      </section>

      {/* Prairie Lines */}
      <div className="container">
        <PrairieLines />
      </div>

      {/* Stats Grid */}
      <section className="border-b border-black">
        <div className="data-grid grid-cols-2 md:grid-cols-4">
          <div className="data-cell animate-fade-up animate-delay-1">
            <div className="data-label">Properties</div>
            <div className="data-value text-red">{propertyCount}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-2">
            <div className="data-label">Active Years</div>
            <div className="data-value">{activeYears || "—"}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-3">
            <div className="data-label">Birth Year</div>
            <div className="data-value">{architect.birth_year || "—"}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-4">
            <div className="data-label">Fellowship</div>
            <div className="data-value text-base">{isTaliesin ? "Yes" : "No"}</div>
            {isTaliesin && (
              <div className="text-xs opacity-50 mt-1">{architect.fellowship_years}</div>
            )}
          </div>
        </div>
      </section>

      {/* Portrait + Biography */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Portrait */}
            {(portraitWideUrl || portraitUrl) && (
              <div className="lg:col-span-1">
                <img
                  src={portraitWideUrl ?? portraitUrl ?? undefined}
                  alt={`Portrait of ${architect.name}`}
                  className="w-full max-w-[300px] grayscale"
                />
              </div>
            )}

            {/* Biography */}
            <div className={portraitWideUrl || portraitUrl ? "lg:col-span-2" : "lg:col-span-3"}>
              <h2 className="mb-6">BIOGRAPHY</h2>
              <div className="accent-border">
                <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                  {architect.biography || `${architect.name} was a master architect of the organic architecture tradition.`}
                </p>
              </div>

              {/* Wikipedia Link */}
              {isValidUrl(architect.wikipedia_url) && (
                <div className="mt-8">
                  <h3 className="mb-3 text-[10px] tracking-[0.2em] opacity-50">LEARN MORE</h3>
                  <ReferenceLink url={architect.wikipedia_url} label="Wikipedia" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Table */}
      <section className="border-b border-black">
        <div className="container py-16">
          <div className="flex justify-between items-center mb-8">
            <h2>PROPERTIES BY {architect.name.toUpperCase()}</h2>
            <span className="text-[11px] tracking-[0.1em] opacity-50">
              {propertyCount} {propertyCount === 1 ? 'ENTRY' : 'ENTRIES'}
            </span>
          </div>

          {architectProperties.length > 0 ? (
            <>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[40px_1fr_80px_160px_100px_140px] gap-4 py-3 border-b-2 border-black text-[9px] tracking-[0.15em] opacity-50 uppercase">
                <div></div>
                <div>Property</div>
                <div>Year</div>
                <div>Location</div>
                <div className="text-right">Status</div>
                <div className="text-right">Price USD</div>
              </div>

              {/* Property Rows */}
              {architectProperties.map((property) => {
                const location = formatLocation(property.parsed_city, property.parsed_state);
                const price = property.last_sale_price
                  ? formatPrice(property.last_sale_price)
                  : "Upon Request";

                return (
                  <Link
                    key={property.id}
                    href={`/homes/${property.slug}`}
                    className="property-row grid grid-cols-1 md:grid-cols-[40px_1fr_80px_160px_100px_140px] gap-2 md:gap-4"
                  >
                    {/* Star */}
                    <div className="hidden md:flex justify-center">
                      <StarIcon size={10} active={isTaliesin} />
                    </div>
                    {/* Name */}
                    <div className="text-xs font-bold">
                      <span className="md:hidden text-[9px] opacity-40 mr-2 font-normal">PROPERTY:</span>
                      {property.home_name}
                    </div>
                    {/* Year */}
                    <div className="text-[11px] opacity-60">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">YEAR:</span>
                      {property.year_built}
                    </div>
                    {/* Location */}
                    <div className="text-[11px] tracking-[0.02em]">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">LOCATION:</span>
                      {location}
                    </div>
                    {/* Status */}
                    <div className="md:text-right">
                      <Badge status={property.status} />
                    </div>
                    {/* Price */}
                    <div className={`font-bold text-xs md:text-right ${property.status === 'active' ? 'text-red' : ''}`}>
                      <span className="md:hidden text-[9px] opacity-40 mr-2 font-normal">PRICE:</span>
                      {price}
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <p className="text-sm opacity-50 py-8 border-t border-black">
              No properties currently listed for this architect.
            </p>
          )}
        </div>
      </section>

      {/* Explore More */}
      <section className="border-b border-black bg-black/[0.02]">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-sm mb-2">EXPLORE MORE ARCHITECTS</h3>
              <p className="text-xs opacity-50">
                Discover other masters of the organic architecture tradition
              </p>
            </div>
            <Link
              href="/architects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black font-bold text-xs tracking-[0.1em] hover:bg-black hover:text-white transition-colors"
            >
              VIEW ALL ARCHITECTS
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
