"use client";

import Link from "next/link";
import { Property, formatPrice, formatLocation, getPropertyBadgeType } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getHeroImageUrl } from "@/lib/hero-images";

interface PropertyCardProps {
  property: Property & { architect_name?: string };
  /** @deprecated No longer used - v2 is the only variant */
  variant?: "default" | "v2";
}

export function PropertyCard({ property }: PropertyCardProps) {
  const location = formatLocation(property.parsed_city, property.parsed_state);

  const isForSale = property.status === "active";
  const isSold = property.status === "sold";

  let price: string;
  if (isForSale) {
    price = property.listing_price
      ? `Listed for ${formatPrice(property.listing_price)}`
      : "Price not listed";
  } else if (isSold && property.last_sale_price) {
    price = `SOLD FOR ${formatPrice(property.last_sale_price)}`;
  } else {
    price = property.last_sale_price ? formatPrice(property.last_sale_price) : "N/A";
  }

  // Prioritize: Hero JPG > Generated SVG > External URL
  const heroImageUrl = getHeroImageUrl(property.slug);
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);
  const imageUrl = heroImageUrl || generatedSvgUrl || property.best_image_url;
  const cardClass = `property-card-v2 ${isForSale ? "property-card-v2--for-sale" : ""}`;

  return (
    <Link href={`/homes/${property.slug}`} className={cardClass}>
      {/* Image */}
      <div className="relative aspect-[4/3] bg-sand overflow-hidden mb-4">
        {/* Experience Badge - shows based on property's experience category */}
        <Badge status={getPropertyBadgeType(property)} variant="overlay" />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={property.home_name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-200"
          />
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-1">{property.home_name}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] opacity-60 tracking-wide uppercase">
          {property.architect_name}
        </span>
        <span className="text-[11px] opacity-50">{property.year_built}</span>
      </div>
      <p className="text-sm opacity-60 mb-3">{location}</p>
      <p className={`text-lg font-semibold ${isForSale ? "text-gold" : ""}`}>
        {price}
      </p>
    </Link>
  );
}
