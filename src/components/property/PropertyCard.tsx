"use client";

import Link from "next/link";
import Image from "next/image";
import { Property, formatPrice, formatLocation, getContextualBadgeType, type ExperienceFilter } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getHeroImageUrl } from "@/lib/hero-images";

interface PropertyCardProps {
  property: Property & { architect_name?: string };
  /** @deprecated No longer used - v2 is the only variant */
  variant?: "default" | "v2";
  /** Active filter context - determines which badge to show */
  activeFilter?: ExperienceFilter;
}

export function PropertyCard({ property, activeFilter = "all" }: PropertyCardProps) {
  const location = formatLocation(property.parsed_city, property.parsed_state);

  const isForSale = property.status === "active";
  const isSold = property.status === "sold";

  let price: string;
  if (isForSale) {
    price = property.listing_price
      ? `Listed for ${formatPrice(property.listing_price)}`
      : "Price not listed";
  } else if (isSold && property.last_sale_price) {
    price = `Sold for ${formatPrice(property.last_sale_price)}`;
  } else if (property.last_sale_price) {
    price = `Last sold for ${formatPrice(property.last_sale_price)}`;
  } else {
    price = "Price unavailable";
  }

  // Prioritize: Hero JPG > Generated SVG > External URL
  const heroImageUrl = getHeroImageUrl(property.slug);
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);
  const imageUrl = heroImageUrl || generatedSvgUrl || property.best_image_url;
  const cardClass = `property-card-v2 ${isForSale ? "property-card-v2--for-sale" : ""}`;

  // Get contextual badge based on active filter
  const badgeType = getContextualBadgeType(property, activeFilter);

  return (
    <Link href={`/homes/${property.slug}`} className={cardClass}>
      {/* Image */}
      <div className="relative aspect-[4/3] bg-sand overflow-hidden mb-4">
        {/* Experience Badge - contextual based on active filter */}
        <Badge status={badgeType} variant="overlay" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={property.home_name}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="property-card-content">
        <h3 className="property-card-title">{property.home_name}</h3>
        <div className="property-card-meta">
          <span className="property-card-architect">{property.architect_name}</span>
          <span className="property-card-year">{property.year_built}</span>
        </div>
        <p className="property-card-location">{location}</p>
        <p className="property-card-price">{price}</p>
      </div>
    </Link>
  );
}
