"use client";

/**
 * Architect Properties Client Component
 * =====================================
 *
 * Handles sorting for the properties grid on architect detail pages.
 * Uses the same propertySort utility as the homes page for consistency.
 *
 * Placement: Renders within the "Properties by [Architect]" section
 */

import { useState, useMemo } from "react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SortControl } from "@/components/ui/SortControl";
import { sortProperties, type SortOption, SORT_OPTIONS } from "@/utils/propertySort";
import { type Property } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

interface EnhancedProperty extends Property {
  architect_name?: string;
}

interface ArchitectPropertiesClientProps {
  properties: EnhancedProperty[];
  architectName: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ArchitectPropertiesClient({
  properties,
  architectName,
}: ArchitectPropertiesClientProps) {
  // Sort state - defaults to "smart" (experience-based priority sort)
  const [sortOption, setSortOption] = useState<SortOption>("smart");

  // Apply sorting
  const sortedProperties = useMemo(() => {
    return sortProperties(properties, sortOption);
  }, [properties, sortOption]);

  const propertyCount = properties.length;

  return (
    <>
      {/* Section Header with Sort Control */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2>PROPERTIES BY {architectName.toUpperCase()}</h2>
        <div className="flex items-center gap-6">
          <span className="text-[11px] tracking-[0.1em] opacity-50">
            {propertyCount} {propertyCount === 1 ? "ENTRY" : "ENTRIES"}
          </span>
          {propertyCount > 1 && (
            <SortControl
              value={sortOption}
              onChange={setSortOption}
              options={SORT_OPTIONS}
            />
          )}
        </div>
      </div>

      {/* Properties Grid */}
      {sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-sm opacity-50 py-8 border-t border-black">
          No properties currently listed for this architect.
        </p>
      )}
    </>
  );
}
