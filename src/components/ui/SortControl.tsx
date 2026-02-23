"use client";

import { type SortOption, SORT_OPTIONS } from "@/utils/propertySort";

// =============================================================================
// TYPES
// =============================================================================

interface SortControlProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className="sort-control">
      <label htmlFor="sort-select" className="sort-control-label">
        SORT BY:
      </label>
      <select
        id="sort-select"
        className="sort-control-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
