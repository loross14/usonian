"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { StatusFilter, Architect } from "@/types";

interface PropertyFiltersProps {
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
  { value: "sold", label: "SOLD" },
  { value: "museum", label: "MUSEUM" },
];

export function PropertyFilters({
  architects,
  states,
}: PropertyFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentStatus = (searchParams.get("status") as StatusFilter) || "all";
  const currentArchitect = searchParams.get("architect");
  const currentState = searchParams.get("state");
  const currentYear = searchParams.get("year");

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

  const architectOptions = architects
    .filter((a) => a.property_count && a.property_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const stateOptions = states.sort();

  return (
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

        <select
          className="filter-dropdown"
          value={currentYear || ""}
          onChange={(e) => updateFilter("year", e.target.value || null)}
        >
          <option value="">YEAR</option>
          <option value="1930s">1930s</option>
          <option value="1940s">1940s</option>
          <option value="1950s">1950s</option>
          <option value="1960s">1960s</option>
          <option value="1970s">1970s</option>
          <option value="1980s">1980s</option>
        </select>
      </div>
    </div>
  );
}
