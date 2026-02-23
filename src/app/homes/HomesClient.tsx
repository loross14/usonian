"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { PropertyList } from "@/components/property/PropertyList";
import { PropertyCard } from "@/components/property/PropertyCard";
import { HeroFilter } from "@/components/ui/HeroFilter";

import { CountdownLoader } from "@/components/pagination/CountdownLoader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import {
  matchesExperienceFilter,
  type Property,
  type Architect,
  type ExperienceFilter,
} from "@/types";

// localStorage key for persisting experience filter preference
const FILTER_STORAGE_KEY = "usonian-archive-experience-filter";

// Valid experience filter values
const VALID_FILTERS: ExperienceFilter[] = ["all", "sale", "visit", "stay", "offmarket"];

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
    sale: number;
    visit: number;
    stay: number;
    offmarket: number;
  };
}

export function HomesClient({
  properties,
  architects,
  states,
}: HomesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<"list" | "grid">("grid");
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Experience filter state - initialized to "all" (default), then updated on mount
  // Priority: URL param > localStorage > default ("all")
  const [currentStatus, setCurrentStatus] = useState<ExperienceFilter>("all");
  const [isStatusInitialized, setIsStatusInitialized] = useState(false);

  // Find the portal target on mount
  useEffect(() => {
    const slot = document.getElementById("hero-filter-slot");
    setPortalContainer(slot);
  }, []);

  // Initialize filter from URL or localStorage on mount (client-side only)
  useEffect(() => {
    const urlStatus = searchParams.get("status") as ExperienceFilter;

    // If URL has a valid filter, use it
    if (urlStatus && VALID_FILTERS.includes(urlStatus)) {
      setCurrentStatus(urlStatus);
      // Also persist to localStorage
      localStorage.setItem(FILTER_STORAGE_KEY, urlStatus);
    } else {
      // No URL param - check localStorage
      const stored = localStorage.getItem(FILTER_STORAGE_KEY) as ExperienceFilter;
      if (stored && VALID_FILTERS.includes(stored)) {
        setCurrentStatus(stored);
        // Update URL to match stored preference
        const params = new URLSearchParams(searchParams.toString());
        if (stored === "all") {
          // "all" is the default, so we can omit it from URL or keep it clean
          params.delete("status");
        } else {
          params.set("status", stored);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
      // Otherwise, keep the default "sale"
    }
    setIsStatusInitialized(true);
  }, []); // Only run on mount

  // Sync filter state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    if (!isStatusInitialized) return;

    const urlStatus = searchParams.get("status") as ExperienceFilter;
    if (urlStatus && VALID_FILTERS.includes(urlStatus)) {
      if (urlStatus !== currentStatus) {
        setCurrentStatus(urlStatus);
        localStorage.setItem(FILTER_STORAGE_KEY, urlStatus);
      }
    } else if (!urlStatus && currentStatus !== "all") {
      // URL has no status param, default to "all"
      setCurrentStatus("all");
    }
  }, [searchParams, isStatusInitialized]);

  const currentArchitect = searchParams.get("architect");
  const currentState = searchParams.get("state");

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
        // Persist experience filter to localStorage
        if (key === "status") {
          localStorage.setItem(FILTER_STORAGE_KEY, value);
          setCurrentStatus(value as ExperienceFilter);
        }
      } else {
        params.delete(key);
        // When clearing status, default to "sale" and persist
        if (key === "status") {
          localStorage.setItem(FILTER_STORAGE_KEY, "sale");
          setCurrentStatus("sale");
        }
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const filteredProperties = useMemo(() => {
    const architectId = searchParams.get("architect");
    const stateFilter = searchParams.get("state");

    return properties.filter((property) => {
      // Experience filter - use currentStatus state (which handles URL/localStorage/default priority)
      if (!matchesExperienceFilter(property, currentStatus)) {
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

      return true;
    });
  }, [properties, searchParams, currentStatus]);

  const architectOptions = architects
    .filter((a) => a.property_count && a.property_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const stateOptions = states.sort();

  return (
    <>
      {/* Hero Filter - rendered via portal into hero section */}
      {portalContainer &&
        createPortal(
          <HeroFilter
            currentStatus={currentStatus}
            onStatusChange={(status) =>
              updateFilter("status", status === "all" ? null : status)
            }
            view={view}
            onViewChange={setView}
            currentArchitect={currentArchitect}
            architectOptions={architectOptions}
            onArchitectChange={(id) => updateFilter("architect", id)}
            currentState={currentState}
            stateOptions={stateOptions}
            onStateChange={(state) => updateFilter("state", state)}
          />,
          portalContainer
        )}

      {/* Property Display */}
      {view === "list" ? (
        <PropertyList
          properties={filteredProperties}
          totalCount={properties.length}
        />
      ) : (
        <CountdownScrollGrid properties={filteredProperties} />
      )}
    </>
  );
}

// ============================================================================
// GRID IMPLEMENTATIONS
// ============================================================================

/**
 * CountdownScrollGrid - "THE COUNTDOWN"
 * Shows remaining count as descending counter: «187 MORE»
 */
function CountdownScrollGrid({ properties }: { properties: EnhancedProperty[] }) {
  const {
    visibleItems,
    sentinelRef,
    isLoading,
    isComplete,
    loadedCount,
    totalCount,
    remainingCount,
  } = useInfiniteScroll({
    items: properties,
    batchSize: 9,
    loadDelay: 400,
  });

  return (
    <section className="table-section">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((property, idx) => {
            const batchIndex = Math.floor(idx / 9);
            const currentBatch = Math.floor((visibleItems.length - 1) / 9);
            const shouldAnimate = batchIndex === currentBatch;
            const indexInBatch = idx % 9;

            return (
              <div
                key={property.id}
                className={shouldAnimate ? "animate-fade-up" : ""}
                style={{
                  animationDelay: shouldAnimate ? `${indexInBatch * 50}ms` : undefined,
                }}
              >
                <PropertyCard property={property} variant="v2" />
              </div>
            );
          })}
        </div>

        {properties.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase mb-2">
              No properties match your filters
            </p>
          </div>
        )}

        {properties.length > 0 && (
          <>
            <CountdownLoader
              isLoading={isLoading}
              isComplete={isComplete}
              loadedCount={loadedCount}
              totalCount={totalCount}
              remainingCount={remainingCount}
            />
            <div ref={sentinelRef} style={{ height: "1px" }} />
          </>
        )}
      </div>
    </section>
  );
}
