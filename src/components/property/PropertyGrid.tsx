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
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-24"
    >
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={`
            property-card-animate
            ${isVisible ? "visible" : ""}
            ${index % 2 === 1 ? "md:mt-32" : ""}
          `}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}
