"use client";

import Link from "next/link";
import Image from "next/image";
import { Property, formatPrice, formatLocation, getStatusLabel } from "@/types";
import { YearBadge } from "@/components/ui/YearBadge";
import { Badge } from "@/components/ui/Badge";
import { getGeneratedSvgUrl } from "@/lib/generated-houses";
import { getHeroImageUrl } from "@/lib/hero-images";
import { PropertyAlertButton } from "@/components/property/PropertyAlertButton";

interface PropertyCardProps {
  property: Property & { architect_name?: string };
  /** v2 uses brutalist card styling with red accents */
  variant?: "default" | "v2";
}

export function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const location = formatLocation(property.parsed_city, property.parsed_state);
  const price = property.last_sale_price
    ? formatPrice(property.last_sale_price)
    : "Price Upon Request";

  // Prioritize: Hero JPG > Generated SVG > External URL
  const heroImageUrl = getHeroImageUrl(property.slug);
  const generatedSvgUrl = getGeneratedSvgUrl(property.slug);
  const imageUrl = heroImageUrl || generatedSvgUrl || property.best_image_url;

  // V2 variant - brutalist card style
  if (variant === "v2") {
    const isForSale = property.status === "active";
    const cardClass = `property-card-v2 ${isForSale ? "property-card-v2--for-sale" : ""}`;

    return (
      <Link href={`/homes/${property.slug}`} className={cardClass}>
        {/* Status Badge - always visible */}
        <Badge status={property.status} variant="overlay" />

        {/* Image */}
        <div className="relative h-[200px] bg-sand overflow-hidden mb-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={property.home_name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
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

  // Default variant - original organic style
  return (
    <article className="group">
      <Link href={`/homes/${property.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-16-9 overflow-hidden bg-sand mb-4">
          {imageUrl ? (
            // Use img tag for local images (hero JPGs, SVGs), Image component for external photos
            heroImageUrl || generatedSvgUrl ? (
              <img
                src={imageUrl}
                alt={property.home_name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : property.best_image_url ? (
              <Image
                src={property.best_image_url}
                alt={property.home_name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            ) : null
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate">
              <span className="text-sm">No image available</span>
            </div>
          )}

          {/* Architectural Whisper - status badge that fades in on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-charcoal/85 backdrop-blur-sm">
              {/* Status indicator dot */}
              <span className={`w-1.5 h-1.5 rounded-full ${
                property.status === 'active' ? 'bg-green-400' :
                property.status === 'museum' ? 'bg-gold' :
                property.status === 'donated' ? 'bg-sky' :
                'bg-slate-light'
              }`} />
              <span className="text-xs font-medium tracking-wider text-warm-white uppercase">
                {getStatusLabel(property.status)}
              </span>
              {property.preservation_status && (
                <>
                  <span className="text-warm-white/40">·</span>
                  <span className="text-xs font-medium tracking-wider text-terracotta">
                    {property.preservation_status}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          {/* Architect - THE STAR (this is a JOHN LAUTNER house) */}
          {property.architect_name && (
            <h3 className="font-heading text-xl font-semibold text-terracotta group-hover:text-terracotta-dark transition-colors">
              {property.architect_name}
            </h3>
          )}

          {/* Property Name - Secondary (the address is just context) */}
          <p className="text-sm text-charcoal/70">
            {property.home_name}
          </p>

          {/* Metadata Line */}
          <div className="flex items-center gap-2 text-sm text-slate">
            <YearBadge year={property.year_built} />
            <span className="text-sand-dark">|</span>
            <span>{location}</span>
          </div>

          {/* Price */}
          <div className="pt-2">
            <span className="text-lg font-medium text-charcoal">{price}</span>
          </div>
        </div>
      </Link>

      {/* Watch for Listing - only for off-market properties */}
      {property.status !== 'active' && (
        <PropertyAlertButton
          propertyId={property.id}
          propertyName={property.home_name}
          variant="card"
        />
      )}
    </article>
  );
}
