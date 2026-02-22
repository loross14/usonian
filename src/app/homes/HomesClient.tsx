"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { PropertyList } from "@/components/property/PropertyList";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { YearRangeSlider } from "@/components/ui/YearRangeSlider";
import {
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

interface HomesClientProps {
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

const STATUS_TABS: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "ALL" },
  { value: "active", label: "FOR SALE" },
  { value: "sold", label: "SOLD / OFF-MARKET" },
  { value: "museum", label: "MUSEUM" },
];

export function HomesClient({
  properties,
  architects,
  states,
  counts,
}: HomesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<"list" | "grid">("grid");

  // Calculate year bounds from data
  const yearBounds = useMemo(() => {
    const years = properties.map((p) => p.year_built).filter(Boolean) as number[];
    return {
      min: Math.min(...years),
      max: Math.max(...years),
    };
  }, [properties]);

  // Year range state - initialize from URL or use full range
  const getYearRangeFromUrl = useCallback(() => {
    const minYear = searchParams.get("yearMin");
    const maxYear = searchParams.get("yearMax");
    return [
      minYear ? parseInt(minYear, 10) : yearBounds.min,
      maxYear ? parseInt(maxYear, 10) : yearBounds.max,
    ] as [number, number];
  }, [searchParams, yearBounds]);

  const [yearRange, setYearRange] = useState<[number, number]>(getYearRangeFromUrl);

  const currentStatus = (searchParams.get("status") as StatusFilter) || "all";
  const currentArchitect = searchParams.get("architect");
  const currentState = searchParams.get("state");

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const filteredProperties = useMemo(() => {
    const status = (searchParams.get("status") as StatusFilter) || "all";
    const architectId = searchParams.get("architect");
    const stateFilter = searchParams.get("state");

    return properties.filter((property) => {
      // Status filter
      const statusValues = STATUS_FILTER_MAP[status];
      if (
        statusValues &&
        !statusValues.includes(property.status as PropertyStatus)
      ) {
        return false;
      }

      // Architect filter
      if (architectId && property.architect_id !== architectId) {
        return false;
      }

      // State filter
      if (stateFilter && property.parsed_state !== stateFilter) {
        return false;
      }

      // Year range filter
      if (property.year_built) {
        if (property.year_built < yearRange[0] || property.year_built > yearRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [properties, searchParams, yearRange]);

  // Calculate year span
  const years = properties.map((p) => p.year_built).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const architectOptions = architects
    .filter((a) => a.property_count && a.property_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const stateOptions = states.sort();

  return (
    <>
      {/* Stats Grid */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="stat-label">Total Properties</div>
              <div className="stat-value">{counts.all}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-label">For Sale</div>
              <div className="stat-value">
                <span className="accent">{counts.active}</span>
              </div>
            </div>
            <div className="stat-cell">
              <div className="stat-label">Architects</div>
              <div className="stat-value">{architects.length}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-label">Year Span</div>
              <div className="stat-value">
                {minYear}
                <span className="accent">-</span>
                {maxYear}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-bar">
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Status Tabs */}
              <div className="filter-tabs">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() =>
                      updateFilter("status", tab.value === "all" ? null : tab.value)
                    }
                    className={`filter-tab ${currentStatus === tab.value ? "active" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <ViewToggle view={view} onChange={setView} />
            </div>

            {/* Filter Dropdowns */}
            <div className="filter-dropdowns">
              <select
                className="filter-dropdown"
                value={currentArchitect || ""}
                onChange={(e) => updateFilter("architect", e.target.value || null)}
              >
                <option value="">ARCHITECT</option>
                {architectOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <select
                className="filter-dropdown"
                value={currentState || ""}
                onChange={(e) => updateFilter("state", e.target.value || null)}
              >
                <option value="">LOCATION</option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <YearRangeSlider
                min={yearBounds.min}
                max={yearBounds.max}
                value={yearRange}
                onChange={(newRange) => {
                  setYearRange(newRange);
                  // Update URL params
                  const params = new URLSearchParams(searchParams.toString());
                  if (newRange[0] !== yearBounds.min) {
                    params.set("yearMin", newRange[0].toString());
                  } else {
                    params.delete("yearMin");
                  }
                  if (newRange[1] !== yearBounds.max) {
                    params.set("yearMax", newRange[1].toString());
                  } else {
                    params.delete("yearMax");
                  }
                  router.push(`${pathname}?${params.toString()}`, { scroll: false });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Display */}
      {view === "list" ? (
        <PropertyList
          properties={filteredProperties}
          totalCount={properties.length}
        />
      ) : (
        <section className="table-section">
          <div className="container py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, idx) => (
                <div
                  key={property.id}
                  className={`animate-fade-up animate-delay-${Math.min(idx + 1, 8)}`}
                >
                  <PropertyCard property={property} variant="v2" />
                </div>
              ))}
            </div>
            {filteredProperties.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase mb-2">
                  No properties match your filters
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
