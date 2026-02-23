"use client";

/**
 * Sort Control Component
 * ======================
 *
 * Generic dropdown for selecting sort order.
 * Renders ABOVE grids/tables (not in HeroFilter).
 *
 * This component is purely presentational - it does not manage state.
 * Pass any sort options via the `options` prop.
 *
 * Usage:
 *   <SortControl
 *     value={sortOption}
 *     onChange={setSortOption}
 *     options={SORT_OPTIONS}
 *   />
 *
 * Styling: Uses .sort-control classes defined in globals.css
 */

// =============================================================================
// TYPES
// =============================================================================

interface SortOption {
  value: string;
  label: string;
}

interface SortControlProps<T extends string> {
  value: T;
  onChange: (sort: T) => void;
  options: Array<{ value: T; label: string }>;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SortControl<T extends string>({
  value,
  onChange,
  options,
}: SortControlProps<T>) {
  return (
    <div className="sort-control">
      <label htmlFor="sort-select" className="sort-control-label">
        SORT BY:
      </label>
      <select
        id="sort-select"
        className="sort-control-select"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
