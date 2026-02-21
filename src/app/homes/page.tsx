import Link from "next/link";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";
import { formatPrice, formatLocation, type Property, type Architect } from "@/types";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { StarIcon } from "@/components/icons/StarIcon";
import { Badge } from "@/components/ui/Badge";

// Cast to proper types
const propertiesRaw = propertiesData as Property[];
const architectsRaw = architectsData as Architect[];

export const metadata = {
  title: "Homes | Usonian",
  description:
    "Browse our curated collection of architect-designed homes by master architects.",
};

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

  // Stats
  const totalProperties = properties.length;
  const activeCount = properties.filter((p) => p.status === "active").length;
  const soldCount = properties.filter((p) => p.status === "sold").length;
  const museumCount = properties.filter((p) => p.status === "museum" || p.status === "donated").length;

  // Get unique architects for filter
  const uniqueArchitects = [...new Set(properties.map((p) => p.architect_name))].filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          <h1 className="animate-fade-up mb-4">HOMES</h1>
          <p className="text-xs tracking-[0.15em] opacity-50 max-w-xl animate-fade-up animate-delay-1">
            A CURATED INDEX OF {totalProperties} ARCHITECT-DESIGNED RESIDENCES.<br />
            BROWSE BY ARCHITECT, LOCATION, OR STATUS.
          </p>
        </div>
      </section>

      {/* Prairie Lines */}
      <div className="container">
        <PrairieLines />
      </div>

      {/* Stats Bar */}
      <section className="border-b border-black">
        <div className="data-grid grid-cols-2 md:grid-cols-4">
          <div className="data-cell animate-fade-up animate-delay-1">
            <div className="data-label">Total Properties</div>
            <div className="data-value">{totalProperties}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-2">
            <div className="data-label">For Sale</div>
            <div className="data-value text-red">{activeCount}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-3">
            <div className="data-label">Sold</div>
            <div className="data-value">{soldCount}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-4">
            <div className="data-label">Museums</div>
            <div className="data-value">{museumCount}</div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b border-black bg-black/[0.02]">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.15em] opacity-50 uppercase">
              Filter:
            </span>
            <button className="text-[11px] tracking-[0.1em] px-3 py-1 border border-black font-bold">
              ALL
            </button>
            <button className="text-[11px] tracking-[0.1em] px-3 py-1 border border-transparent hover:border-black opacity-60 hover:opacity-100 transition-all">
              FOR SALE
            </button>
            <button className="text-[11px] tracking-[0.1em] px-3 py-1 border border-transparent hover:border-black opacity-60 hover:opacity-100 transition-all">
              SOLD
            </button>
            <button className="text-[11px] tracking-[0.1em] px-3 py-1 border border-transparent hover:border-black opacity-60 hover:opacity-100 transition-all">
              MUSEUM
            </button>
          </div>
        </div>
      </section>

      {/* Properties Table */}
      <section className="border-b border-black">
        <div className="container py-10">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[40px_180px_1fr_80px_160px_100px_140px] gap-4 py-3 border-b-2 border-black text-[9px] tracking-[0.15em] opacity-50 uppercase">
            <div></div>
            <div>Architect</div>
            <div>Property</div>
            <div>Year</div>
            <div>Location</div>
            <div className="text-right">Status</div>
            <div className="text-right">Price USD</div>
          </div>

          {/* Property Rows */}
          {properties.map((property, idx) => {
            const location = formatLocation(property.parsed_city, property.parsed_state);
            const price = property.last_sale_price
              ? formatPrice(property.last_sale_price)
              : "Upon Request";

            return (
              <Link
                key={property.id}
                href={`/homes/${property.slug}`}
                className="property-row grid grid-cols-1 md:grid-cols-[40px_180px_1fr_80px_160px_100px_140px] gap-2 md:gap-4"
              >
                {/* Star */}
                <div className="hidden md:flex justify-center">
                  <StarIcon size={10} active={property.is_taliesin} />
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

      {/* Pagination */}
      <section className="border-b border-black">
        <div className="container py-6">
          <div className="flex justify-between items-center text-[11px] tracking-[0.1em]">
            <div className="opacity-50">
              SHOWING 1-{properties.length} OF {properties.length} ENTRIES
              <span className="cursor" />
            </div>
            <div className="flex gap-4">
              <span className="px-2 py-1 border border-black font-bold">01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
