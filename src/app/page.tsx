import Link from "next/link";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { formatPrice, formatLocation, getStatusLabel, type Property, type Architect } from "@/types";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { StarIcon } from "@/components/icons/StarIcon";
import { Badge } from "@/components/ui/Badge";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";

// Cast to proper types
const properties = propertiesData as Property[];
const architects = architectsData as Architect[];

export default function HomePage() {
  // Get featured properties (for sale + have images)
  const featuredProperties = properties
    .filter((p) => p.best_image_url || getGeneratedSvgUrl(p.slug))
    .slice(0, 3)
    .map((property) => {
      const architect = architects.find((a) => a.id === property.architect_id);
      return {
        ...property,
        architect_name: architect?.name,
      };
    });

  // Get properties for sale section
  const forSaleProperties = properties
    .slice(0, 8)
    .map((property) => {
      const architect = architects.find((a) => a.id === property.architect_id);
      return {
        ...property,
        architect_name: architect?.name,
      };
    });

  // Get unique architects with property counts
  const architectsWithCounts = architects
    .filter((a) => a.property_count && a.property_count > 0)
    .slice(0, 7);

  // Count active listings
  const activeCount = properties.filter((p) => p.status === 'active').length;

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          {/* Massive Title */}
          <h1 className="animate-fade-up mb-4">
            ARCHITECT<span className="text-red">.</span><br />
            DESIGNED<br />
            HOMES
          </h1>
          <p className="text-xs tracking-[0.15em] opacity-50 mb-10 max-w-xl animate-fade-up animate-delay-1">
            A curated index of residential architecture. No staging. No filters.<br />
            Raw documentation of designed spaces available for acquisition.
          </p>

          {/* Prairie Lines */}
          <PrairieLines />

          {/* Hero Cards - Featured Properties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {featuredProperties.map((property, idx) => {
              const imageUrl = getGeneratedSvgUrl(property.slug) || property.best_image_url;
              const price = property.last_sale_price
                ? formatPrice(property.last_sale_price)
                : "Price Upon Request";

              return (
                <Link
                  key={property.id}
                  href={`/homes/${property.slug}`}
                  className={`group border border-black overflow-hidden card-hover animate-fade-up animate-delay-${idx + 1}`}
                >
                  {/* Image */}
                  <div className="relative h-[200px] bg-sand overflow-hidden">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={property.home_name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge status={property.status} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="font-bold text-sm mb-1">{property.home_name}</div>
                    <div className="text-[11px] opacity-60 tracking-[0.05em] mb-2 uppercase">
                      {property.architect_name}
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="opacity-50">{property.year_built}</span>
                      <span className="font-bold">{price}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architect Index Bar */}
      <section className="border-b border-black bg-black/[0.02]">
        <div className="container py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[10px] font-bold tracking-[0.15em] opacity-50 uppercase">
              Browse by Architect
            </div>
            <Link
              href="/architects"
              className="text-[10px] tracking-[0.1em] opacity-50 hover:opacity-100 border-b border-transparent hover:border-black transition-all"
            >
              VIEW ALL {architects.length} ARCHITECTS
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {architectsWithCounts.map((architect, idx) => (
              <Link
                key={architect.id}
                href={`/architects/${architect.slug}`}
                className="flex items-center gap-2 text-xs tracking-[0.02em] py-2 border-b border-transparent hover:border-black transition-all"
              >
                <StarIcon
                  size={10}
                  active={architect.fellowship_years !== null}
                />
                <span>{architect.name} ({architect.property_count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Sale Section */}
      <section className="border-b border-black">
        <div className="container py-10">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase">
              <StarIcon size={12} active />
              <span>FOR SALE // {activeCount} ACTIVE LISTINGS</span>
            </div>
            <Link
              href="/homes"
              className="text-[10px] tracking-[0.1em] opacity-50 hover:opacity-100 border-b border-transparent hover:border-black transition-all"
            >
              VIEW ALL PROPERTIES
            </Link>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[40px_160px_1fr_80px_140px_100px_120px] gap-4 py-3 border-b-2 border-black text-[9px] tracking-[0.15em] opacity-50 uppercase">
            <div></div>
            <div>Architect</div>
            <div>Property</div>
            <div>Year</div>
            <div>Location</div>
            <div className="text-right">Status</div>
            <div className="text-right">Price USD</div>
          </div>

          {/* Property Rows */}
          {forSaleProperties.map((property, idx) => {
            const location = formatLocation(property.parsed_city, property.parsed_state);
            const price = property.last_sale_price
              ? formatPrice(property.last_sale_price)
              : "Upon Request";
            const isTaliesin = architects.find(
              (a) => a.id === property.architect_id
            )?.fellowship_years !== null;

            return (
              <Link
                key={property.id}
                href={`/homes/${property.slug}`}
                className={`property-row grid grid-cols-1 md:grid-cols-[40px_160px_1fr_80px_140px_100px_120px] gap-2 md:gap-4 animate-fade-up animate-delay-${Math.min(idx + 1, 4)}`}
              >
                {/* Star */}
                <div className="hidden md:flex justify-center">
                  <StarIcon size={10} active={isTaliesin} />
                </div>
                {/* Architect */}
                <div className="font-bold text-[11px] tracking-[0.05em] uppercase">
                  <span className="md:hidden text-[9px] opacity-40 mr-2">ARCHITECT:</span>
                  {property.architect_name}
                </div>
                {/* Name */}
                <div className="text-xs">
                  <span className="md:hidden text-[9px] opacity-40 mr-2">PROPERTY:</span>
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
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Pagination / Stats */}
      <section className="border-b border-black">
        <div className="container py-6">
          <div className="flex justify-between items-center text-[11px] tracking-[0.1em]">
            <div className="opacity-50">
              SHOWING 1-{Math.min(8, properties.length)} OF {properties.length} ENTRIES
              <span className="cursor" />
            </div>
            <div className="flex gap-4">
              <span className="px-2 py-1 border border-black font-bold">01</span>
              <Link href="/homes" className="px-2 py-1 border border-transparent hover:border-black">
                02
              </Link>
              <Link href="/homes" className="px-2 py-1 border border-transparent hover:border-black">
                NEXT
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
