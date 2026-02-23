"use client";

import { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";

interface PropertyGridProps {
  properties: (Property & { architect_name?: string })[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate text-lg">No properties found.</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="responsive-card-grid responsive-card-grid--staggered"
    >
      {properties.map((property, index) => (
        <div
          key={property.id}
          className="property-card-animate"
          style={{ animationDelay: isVisible ? `${index * 80}ms` : undefined }}
        >
          <PropertyCard property={property} variant="v2" />
        </div>
      ))}
    </div>
  );
}
