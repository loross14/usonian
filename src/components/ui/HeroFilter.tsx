"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ViewToggle } from "./ViewToggle";
import { type ExperienceFilter } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

export interface HeroFilterProps {
  // Experience filter
  currentStatus: ExperienceFilter;
  onStatusChange: (status: ExperienceFilter) => void;

  // View
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;

  // Architect
  currentArchitect: string | null;
  architectOptions: Array<{ id: string; name: string }>;
  onArchitectChange: (id: string | null) => void;

  // Location
  currentState: string | null;
  stateOptions: string[];
  onStateChange: (state: string | null) => void;

  // Sort
  sortValue: string;
  sortOptions: Array<{ value: string; label: string }>;
  onSortChange: (value: string) => void;
}

interface ExperienceTab {
  value: ExperienceFilter;
  label: string;
  shortLabel: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface CompactDropdownProps {
  icon: "architect" | "location" | "sort";
  label: string;
  value: string | null;
  options: DropdownOption[];
  onChange: (value: string | null) => void;
  id: string;
  showAllOption?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const EXPERIENCE_TABS: ExperienceTab[] = [
  { value: "all", label: "ALL", shortLabel: "ALL" },
  { value: "sale", label: "BUY", shortLabel: "BUY" },
  { value: "visit", label: "VISIT", shortLabel: "VISIT" },
  { value: "stay", label: "STAY", shortLabel: "STAY" },
  { value: "offmarket", label: "OFF-MARKET", shortLabel: "OFF" },
];

const MAX_DISPLAY_LENGTH = 14;

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Formats an architect name to abbreviated form.
 * "Frank Lloyd Wright" -> "F. Wright"
 * "Le Corbusier" -> "L. Corbusier"
 * "Wright" -> "Wright" (single word unchanged)
 */
export function formatArchitectName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "";

  const words = trimmed.split(/\s+/);
  if (words.length === 1) {
    return words[0];
  }

  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastName = words[words.length - 1];

  return `${firstInitial}. ${lastName}`;
}

/**
 * Truncates a label if it exceeds the maximum display length.
 */
export function truncateLabel(label: string, maxLength: number = MAX_DISPLAY_LENGTH): string {
  if (label.length <= maxLength) {
    return label;
  }
  return `${label.slice(0, maxLength)}...`;
}

/**
 * Generates a unique ID for accessibility purposes.
 */
export function generateDropdownId(prefix: string): string {
  return `hero-dropdown-${prefix}`;
}

// =============================================================================
// ICON COMPONENTS
// =============================================================================

function ArchitectIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="hero-dropdown-icon"
      aria-hidden="true"
    >
      <path d="M8 1L3 15M8 1L13 15M4.5 10h7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="hero-dropdown-icon"
      aria-hidden="true"
    >
      <path d="M8 1C5.5 1 3.5 3 3.5 5.5C3.5 9 8 15 8 15S12.5 9 12.5 5.5C12.5 3 10.5 1 8 1Z" />
      <circle cx="8" cy="5.5" r="1.5" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="hero-dropdown-icon"
      aria-hidden="true"
    >
      <path d="M2 4h12M4 8h8M6 12h4" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`hero-dropdown-chevron ${isOpen ? "open" : ""}`}
      viewBox="0 0 10 6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 0l5 6 5-6z" />
    </svg>
  );
}

// =============================================================================
// COMPACT DROPDOWN
// =============================================================================

function CompactDropdown({
  icon,
  label,
  value,
  options,
  onChange,
  id,
  showAllOption = true,
}: CompactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = `${id}-menu`;
  const labelId = `${id}-label`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent): void => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  const handleToggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (selectedValue: string | null): void => {
      onChange(selectedValue);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [onChange]
  );

  const selectedOption = value ? options.find((opt) => opt.value === value) : null;
  const displayLabel = selectedOption ? truncateLabel(selectedOption.label) : label;
  const IconComponent = icon === "architect" ? ArchitectIcon : icon === "sort" ? SortIcon : LocationIcon;

  return (
    <div
      ref={containerRef}
      className="hero-dropdown"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        id={id}
        onClick={handleToggle}
        className={`hero-dropdown-btn ${value ? "has-value" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-labelledby={labelId}
      >
        <IconComponent />
        <span id={labelId} className="hero-dropdown-label">
          {displayLabel}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul
          id={menuId}
          role="listbox"
          aria-labelledby={id}
          className="hero-dropdown-menu"
        >
          {showAllOption && (
            <li
              role="option"
              aria-selected={!value}
              onClick={() => handleSelect(null)}
              className={`hero-dropdown-item ${!value ? "selected" : ""}`}
              tabIndex={0}
            >
              ALL {label}
            </li>
          )}
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`hero-dropdown-item ${value === opt.value ? "selected" : ""}`}
              tabIndex={0}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function HeroFilter({
  currentStatus,
  onStatusChange,
  view,
  onViewChange,
  currentArchitect,
  architectOptions,
  onArchitectChange,
  currentState,
  stateOptions,
  onStateChange,
  sortValue,
  sortOptions,
  onSortChange,
}: HeroFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Format architect options with abbreviated names for display
  const formattedArchitectOptions: DropdownOption[] = architectOptions.map((architect) => ({
    value: architect.id,
    label: formatArchitectName(architect.name),
  }));

  // Format state options
  const formattedStateOptions: DropdownOption[] = stateOptions.map((state) => ({
    value: state,
    label: state,
  }));

  // Format sort options
  const formattedSortOptions: DropdownOption[] = sortOptions.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div
      ref={containerRef}
      className="hero-filter hero-filter--single-row"
      role="search"
      aria-label="Filter properties"
    >
      {/* Single Row: View Toggle + Tabs + Dropdowns */}
      <div className="hero-filter-row" role="group" aria-label="Filter and sort controls">
        {/* View Toggle - Left */}
        <ViewToggle view={view} onChange={onViewChange} className="hero-filter-view" />

        {/* Experience Tabs */}
        <div className="hero-filter-tabs" role="tablist" aria-label="Experience type">
          {EXPERIENCE_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              onClick={() => onStatusChange(tab.value)}
              className={`hero-filter-tab ${currentStatus === tab.value ? "active" : ""}`}
              aria-selected={currentStatus === tab.value}
              aria-controls={`panel-${tab.value}`}
              tabIndex={currentStatus === tab.value ? 0 : -1}
            >
              <span className="hero-filter-tab-label">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Dropdowns - Right */}
        <div className="hero-filter-dropdowns" role="group" aria-label="Filter options">
          <CompactDropdown
            id={generateDropdownId("architect")}
            icon="architect"
            label="ARCHITECT"
            value={currentArchitect}
            options={formattedArchitectOptions}
            onChange={onArchitectChange}
          />
          <CompactDropdown
            id={generateDropdownId("state")}
            icon="location"
            label="STATE"
            value={currentState}
            options={formattedStateOptions}
            onChange={onStateChange}
          />
          <CompactDropdown
            id={generateDropdownId("sort")}
            icon="sort"
            label="SORT BY"
            value={sortValue}
            options={formattedSortOptions}
            onChange={(val) => onSortChange(val || sortOptions[0]?.value || "smart")}
            showAllOption={false}
          />
        </div>
      </div>
    </div>
  );
}
