"use client";

import Link from "next/link";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getHeroImageUrl } from "@/lib/hero-images";
import { formatPrice, type Property } from "@/types";

interface EnhancedProperty extends Property {
  architect_name?: string;
  is_taliesin?: boolean;
}

interface HomeClientProps {
  featuredProperties: EnhancedProperty[];
  tableProperties: EnhancedProperty[];
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "active":
      return "v2-status-badge--for-sale";
    case "sold":
    case "archived":
      return "v2-status-badge--sold";
    case "museum":
    case "donated":
      return "v2-status-badge--museum";
    default:
      return "v2-status-badge--sold";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "active":
      return "For Sale";
    case "sold":
      return "Sold";
    case "archived":
      return "Off-Market";
    case "museum":
    case "donated":
      return "Museum";
    default:
      return "Off-Market";
  }
}

function getStatusDotClass(status: string): string {
  switch (status) {
    case "active":
      return "v2-status-dot v2-status-dot--active";
    case "pending":
      return "v2-status-dot v2-status-dot--pending";
    default:
      return "v2-status-dot";
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case "active":
      return "Available";
    case "pending":
      return "Pending";
    case "sold":
    case "archived":
      return "Off Market";
    case "museum":
    case "donated":
      return "Museum";
    default:
      return "Off Market";
  }
}

export function HomeClient({
  featuredProperties,
  tableProperties,
}: HomeClientProps) {
  const featuredCount = featuredProperties.length.toString().padStart(2, "0");
  const tableCount = tableProperties.length.toString().padStart(2, "0");

  return (
    <>
      {/* Featured Properties Section */}
      <section className="v2-featured-section">
        <div className="v2-section-header">
          <h2 className="v2-section-title">CURRENTLY FOR SALE</h2>
          <span className="v2-section-count">{featuredCount} LISTINGS</span>
        </div>
        <div className="v2-property-grid">
          {featuredProperties.map((property, idx) => {
            const imageUrl = getHeroImageUrl(property.slug) || getGeneratedSvgUrl(property.slug) || property.best_image_url;
            const price = property.last_sale_price
              ? formatPrice(property.last_sale_price)
              : "Price Upon Request";
            const isForSale = property.status === "active";

            return (
              <Link
                key={property.id}
                href={`/homes/${property.slug}`}
                className={`v2-property-card ${isForSale ? "v2-property-card--for-sale" : ""}`}
                tabIndex={0}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <span className={`v2-status-badge ${getStatusBadgeClass(property.status)}`}>
                  {getStatusLabel(property.status)}
                </span>
                <div className="v2-property-image">
                  {imageUrl ? (
                    <img src={imageUrl} alt={property.home_name} />
                  ) : (
                    property.home_name.toUpperCase()
                  )}
                </div>
                <h3 className="v2-property-name">{property.home_name}</h3>
                <div className="v2-property-meta">
                  <span className="v2-property-architect">{property.architect_name}</span>
                  <span className="v2-property-year">{property.year_built}</span>
                </div>
                <p className="v2-property-location">
                  {property.parsed_city}, {property.parsed_state}
                </p>
                <p className="v2-property-price">{price}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Homes Table Section */}
      <section className="v2-table-section">
        <div className="v2-section-header">
          <h2 className="v2-section-title">HOMES</h2>
          <span className="v2-section-count">{tableCount} AVAILABLE</span>
        </div>
        <table className="v2-sale-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Year</th>
              <th>Location</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {tableProperties.map((property, idx) => {
              const price = property.last_sale_price
                ? formatPrice(property.last_sale_price)
                : "Upon Request";
              const location = `${property.parsed_city || ""}, ${property.parsed_state || ""}`.replace(/^, |, $/g, "");

              return (
                <tr
                  key={property.id}
                  tabIndex={0}
                  onClick={() => (window.location.href = `/homes/${property.slug}`)}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <td className="v2-property-cell">{property.home_name}</td>
                  <td className="v2-year-cell">{property.year_built}</td>
                  <td className="v2-location-cell">{location}</td>
                  <td className="v2-status-cell">
                    <span className={getStatusDotClass(property.status)}></span>
                    {getStatusText(property.status)}
                  </td>
                  <td className="v2-price-cell">{price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* See All CTA */}
        <div className="v2-see-all-cta">
          <Link href="/homes" className="v2-see-all-button">
            SEE ALL HOMES
          </Link>
        </div>
      </section>
    </>
  );
}
