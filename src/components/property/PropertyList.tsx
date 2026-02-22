"use client";

import Link from "next/link";
import { StarIcon } from "@/components/icons/StarIcon";
import { formatPrice, formatLocation, type Property } from "@/types";

interface EnhancedProperty extends Property {
  architect_name?: string;
  is_taliesin?: boolean;
}

interface PropertyListProps {
  properties: EnhancedProperty[];
  totalCount: number;
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "active":
      return "status-badge for-sale";
    case "sold":
      return "status-badge sold";
    case "museum":
    case "donated":
      return "status-badge museum";
    default:
      return "status-badge sold";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "active":
      return "FOR SALE";
    case "sold":
      return "SOLD";
    case "museum":
      return "MUSEUM";
    case "donated":
      return "MUSEUM";
    default:
      return status.toUpperCase();
  }
}

export function PropertyList({ properties, totalCount }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <section className="table-section">
        <div className="container">
          <div className="py-16 text-center">
            <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase mb-4">
              No properties match your filters
            </p>
            <p className="text-xs opacity-40">
              Try adjusting your filter criteria
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="table-section">
      <div className="container">
        {/* Table Header */}
        <div className="table-header">
          <div></div>
          <div>ARCHITECT</div>
          <div>PROPERTY</div>
          <div>YEAR</div>
          <div>LOCATION</div>
          <div>STATUS</div>
          <div style={{ textAlign: "right" }}>PRICE</div>
        </div>

        {/* Property Rows */}
        {properties.map((property, idx) => {
          const location = formatLocation(
            property.parsed_city,
            property.parsed_state
          );
          const price = property.last_sale_price
            ? formatPrice(property.last_sale_price)
            : "N/A";
          const isForSale = property.status === "active";

          return (
            <Link
              key={property.id}
              href={`/homes/${property.slug}`}
              className="table-row"
              style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
            >
              {/* Star */}
              <StarIcon size={16} active={property.is_taliesin} />

              {/* Architect */}
              <div className="architect-name">{property.architect_name}</div>

              {/* Property Name */}
              <div className="property-name">{property.home_name}</div>

              {/* Year */}
              <div className="property-year">{property.year_built}</div>

              {/* Location */}
              <div className="property-location">{location}</div>

              {/* Status */}
              <span className={getStatusBadgeClass(property.status)}>
                {getStatusLabel(property.status)}
              </span>

              {/* Price */}
              <div className={`property-price ${!isForSale ? "na" : ""}`}>
                {price}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="pagination-section">
        <div className="container">
          <div className="pagination">
            <button className="page-btn page-arrow">&larr;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">{Math.ceil(totalCount / 10)}</button>
            <button className="page-btn page-arrow">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
