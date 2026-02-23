"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { PropertyList } from "@/components/property/PropertyList";
import { PropertyCard } from "@/components/property/PropertyCard";
import { HeroFilter } from "@/components/ui/HeroFilter";
import { SortControl } from "@/components/ui/SortControl";
import { sortProperties, type SortOption, SORT_OPTIONS } from "@/utils/propertySort";

import { Pagination } from "@/components/pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";

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

/**
 * Get initial filter value from URL or localStorage (client-side only)
 * Priority: URL param > localStorage > default ("all")
 */
function getInitialFilter(): ExperienceFilter {
  if (typeof window === "undefined") return "all";

  const urlStatus = new URLSearchParams(window.location.search).get("status") as ExperienceFilter;
  if (urlStatus && VALID_FILTERS.includes(urlStatus)) {
    return urlStatus;
  }

  const stored = localStorage.getItem(FILTER_STORAGE_KEY) as ExperienceFilter;
  if (stored && VALID_FILTERS.includes(stored)) {
    return stored;
  }

  return "all";
}

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

  // Portal container - initialized after mount
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Experience filter state - initialized from URL/localStorage via initializer (single render)
  const [currentStatus, setCurrentStatus] = useState<ExperienceFilter>(getInitialFilter);

  // Sort state - defaults to "smart" (experience-based priority sort)
  // See src/utils/propertySort.ts for sort logic and priority order
  const [sortOption, setSortOption] = useState<SortOption>("smart");

  // Pagination state - read from URL, defaults to page 1
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // Find portal container on mount
  useEffect(() => {
    const slot = document.getElementById("hero-filter-slot");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM query on mount is valid
    if (slot) setPortalContainer(slot);
  }, []);

  // Sync URL with localStorage preference on mount (deferred decision - keeping current behavior)
  useEffect(() => {
    const urlStatus = searchParams.get("status") as ExperienceFilter;
    if (!urlStatus) {
      const stored = localStorage.getItem(FILTER_STORAGE_KEY) as ExperienceFilter;
      if (stored && VALID_FILTERS.includes(stored) && stored !== "all") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("status", stored);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  }, [pathname, router, searchParams]);

  // Sync filter state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlStatus = searchParams.get("status") as ExperienceFilter;
    if (urlStatus && VALID_FILTERS.includes(urlStatus)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state with URL is valid
      setCurrentStatus(urlStatus);
      localStorage.setItem(FILTER_STORAGE_KEY, urlStatus);
    } else if (!urlStatus) {
      setCurrentStatus("all");
    }
  }, [searchParams]); // Only depend on searchParams

  const currentArchitect = searchParams.get("architect");
  const currentState = searchParams.get("state");

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      // Reset to page 1 when filters change
      params.delete("page");
      if (value) {
        params.set(key, value);
        // Persist experience filter to localStorage
        if (key === "status") {
          localStorage.setItem(FILTER_STORAGE_KEY, value);
          setCurrentStatus(value as ExperienceFilter);
        }
      } else {
        params.delete(key);
        // When clearing status, default to "all" and persist
        if (key === "status") {
          localStorage.setItem(FILTER_STORAGE_KEY, "all");
          setCurrentStatus("all");
        }
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Handle page changes - update URL with ?page=N
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page"); // Clean URL for page 1
      } else {
        params.set("page", page.toString());
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
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

  // Apply sorting AFTER filtering (filter first, then sort the result)
  // This ensures sort order is preserved when filters change
  const sortedProperties = useMemo(() => {
    return sortProperties(filteredProperties, sortOption);
  }, [filteredProperties, sortOption]);

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

      {/* Sort Control - intentionally placed ABOVE the grid, not in HeroFilter */}
      <div className="container pt-6">
        <SortControl value={sortOption} onChange={setSortOption} options={SORT_OPTIONS} />
      </div>

      {/* Property Display */}
      {view === "list" ? (
        <PropertyList
          properties={sortedProperties}
          totalCount={properties.length}
        />
      ) : (
        <PaginatedGrid
          properties={sortedProperties}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

// ============================================================================
// GRID IMPLEMENTATIONS
// ============================================================================

/** Items per page - 5 rows × 5 columns on desktop */
const ITEMS_PER_PAGE = 25;

/**
 * PaginatedGrid - Archive pagination
 * Shows 25 items per page (5 rows) with minimal numbered pagination
 */
function PaginatedGrid({
  properties,
  currentPage,
  onPageChange,
}: {
  properties: EnhancedProperty[];
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const {
    paginatedItems,
    totalPages,
    totalCount,
    startIndex,
    endIndex,
  } = usePagination({
    items: properties,
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
  });

  return (
    <section className="table-section">
      <div className="container py-10">
        <div className="responsive-card-grid">
          {paginatedItems.map((property, idx) => (
            <div
              key={property.id}
              className="animate-fade-up"
              style={{
                animationDelay: `${idx * 30}ms`,
              }}
            >
              <PropertyCard property={property} variant="v2" />
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-[11px] tracking-[0.15em] opacity-50 uppercase mb-2">
              No properties match your filters
            </p>
          </div>
        )}

        {properties.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
}
