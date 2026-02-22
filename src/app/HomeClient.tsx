"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { Badge } from "@/components/ui/Badge";
import { StarIcon } from "@/components/icons/StarIcon";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import {
  formatPrice,
  formatLocation,
  STATUS_FILTER_MAP,
  type Property,
  type Architect,
  type StatusFilter,
  type PropertyStatus,
} from "@/types";

interface EnhancedProperty extends Property {
  architect_name?: string;
  is_taliesin?: boolean;
}

interface HomeClientProps {
  properties: EnhancedProperty[];
  architects: Architect[];
  states: string[];
  counts: {
    all: number;
    active: number;
    sold: number;
    museum: number;
  };
}

export function HomeClient({
  properties,
  architects,
  states,
  counts,
}: HomeClientProps) {
  const searchParams = useSearchParams();

  const filteredProperties = useMemo(() => {
    const status = (searchParams.get("status") as StatusFilter) || "all";
    const architectId = searchParams.get("architect");
    const stateFilter = searchParams.get("state");

    return properties.filter((property) => {
      const statusValues = STATUS_FILTER_MAP[status];
      if (
        statusValues &&
        !statusValues.includes(property.status as PropertyStatus)
      ) {
        return false;
      }
      if (architectId && property.architect_id !== architectId) {
        return false;
      }
      if (stateFilter && property.parsed_state !== stateFilter) {
        return false;
      }
      return true;
    });
  }, [properties, searchParams]);

  // Featured properties (with images)
  const featuredProperties = filteredProperties
    .filter((p) => p.best_image_url || getGeneratedSvgUrl(p.slug))
    .slice(0, 3);

  // For Sale table - always show only active listings
  const forSaleProperties = useMemo(() => {
    return properties
      .filter((p) => p.status === "active")
      .slice(0, 8);
  }, [properties]);

  // Total active count
  const activeCount = properties.filter((p) => p.status === "active").length;

  return (
    <>
      {/* Filter Bar */}
      <PropertyFilters
        architects={architects}
        states={states}
        counts={counts}
      />

      {/* Featured Properties Cards */}
      <section className="border-b border-black">
        <div className="container py-10">
          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProperties.map((property, idx) => {
                const imageUrl =
                  getGeneratedSvgUrl(property.slug) || property.best_image_url;
                const price = property.last_sale_price
                  ? formatPrice(property.last_sale_price)
                  : "Price Upon Request";

                return (
                  <Link
                    key={property.id}
                    href={`/homes/${property.slug}`}
                    className={`group border border-black overflow-hidden card-hover animate-fade-up animate-delay-${idx + 1}`}
                  >
                    <div className="relative h-[200px] bg-sand overflow-hidden">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={property.home_name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge status={property.status} />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-sm mb-1">
                        {property.home_name}
                      </div>
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
          ) : (
            <div className="py-8 text-center">
              <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase">
                No featured properties match your filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Properties Table */}
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

          {forSaleProperties.length > 0 ? (
            <>
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
                const location = formatLocation(
                  property.parsed_city,
                  property.parsed_state
                );
                const price = property.last_sale_price
                  ? formatPrice(property.last_sale_price)
                  : "Upon Request";

                return (
                  <Link
                    key={property.id}
                    href={`/homes/${property.slug}`}
                    className={`property-row grid grid-cols-1 md:grid-cols-[40px_160px_1fr_80px_140px_100px_120px] gap-2 md:gap-4 animate-fade-up animate-delay-${Math.min(idx + 1, 4)}`}
                  >
                    <div className="hidden md:flex justify-center">
                      <StarIcon size={10} active={property.is_taliesin} />
                    </div>
                    <div className="font-bold text-[11px] tracking-[0.05em] uppercase">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">
                        ARCHITECT:
                      </span>
                      {property.architect_name}
                    </div>
                    <div className="text-xs">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">
                        PROPERTY:
                      </span>
                      {property.home_name}
                    </div>
                    <div className="text-[11px] opacity-60">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">
                        YEAR:
                      </span>
                      {property.year_built}
                    </div>
                    <div className="text-[11px] tracking-[0.02em]">
                      <span className="md:hidden text-[9px] opacity-40 mr-2">
                        LOCATION:
                      </span>
                      {location}
                    </div>
                    <div className="md:text-right">
                      <Badge status={property.status} />
                    </div>
                    <div
                      className={`font-bold text-xs md:text-right ${property.status === "active" ? "text-red" : ""}`}
                    >
                      <span className="md:hidden text-[9px] opacity-40 mr-2 font-normal">
                        PRICE:
                      </span>
                      {price}
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase mb-2">
                No properties match your filters
              </p>
              <p className="text-xs opacity-40">
                Try adjusting your filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination / Stats */}
      <section className="border-b border-black">
        <div className="container py-6">
          <div className="flex justify-between items-center text-[11px] tracking-[0.1em]">
            <div className="opacity-50">
              SHOWING {forSaleProperties.length} OF {activeCount} FOR SALE
              <span className="cursor" />
            </div>
            <div className="flex gap-4">
              <span className="px-2 py-1 border border-black font-bold">01</span>
              <Link
                href="/homes"
                className="px-2 py-1 border border-transparent hover:border-black"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
