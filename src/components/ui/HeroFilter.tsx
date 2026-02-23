"use client";

import { useState, useRef, useEffect } from "react";
import { ViewToggle } from "./ViewToggle";
import { type ExperienceFilter } from "@/types";

interface HeroFilterProps {
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
}

const EXPERIENCE_TABS: Array<{ value: ExperienceFilter; label: string; shortLabel: string }> = [
  { value: "all", label: "ALL", shortLabel: "ALL" },
  { value: "sale", label: "BUY", shortLabel: "BUY" },
  { value: "visit", label: "VISIT", shortLabel: "VISIT" },
  { value: "stay", label: "STAY", shortLabel: "STAY" },
  { value: "offmarket", label: "OFF-MARKET", shortLabel: "OFF" },
];

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
}: HeroFilterProps) {
  const [isExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`hero-filter ${isExpanded ? "hero-filter--expanded" : ""}`}
    >
      {/* Row 1: Status Tabs + View Toggle */}
      <div className="hero-filter-row">
        <div className="hero-filter-tabs">
          {EXPERIENCE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={`hero-filter-tab ${currentStatus === tab.value ? "active" : ""}`}
              aria-pressed={currentStatus === tab.value}
            >
              <span className="hero-filter-tab-label">
                {tab.shortLabel}
              </span>
            </button>
          ))}
        </div>
        <ViewToggle view={view} onChange={onViewChange} className="hero-filter-view" />
      </div>

      {/* Row 2: Dropdowns */}
      <div className="hero-filter-row">
        <CompactDropdown
          icon="architect"
          label="ARCHITECT"
          value={currentArchitect}
          options={architectOptions.map((a) => ({ value: a.id, label: a.name }))}
          onChange={onArchitectChange}
        />
        <CompactDropdown
          icon="location"
          label="STATE"
          value={currentState}
          options={stateOptions.map((s) => ({ value: s, label: s }))}
          onChange={onStateChange}
        />
      </div>
    </div>
  );
}

// Compact Dropdown Component
interface CompactDropdownProps {
  icon: "architect" | "location";
  label: string;
  value: string | null;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string | null) => void;
}

function CompactDropdown({
  icon,
  label,
  value,
  options,
  onChange,
}: CompactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = value ? options.find((o) => o.value === value) : null;
  const displayLabel = selectedOption
    ? selectedOption.label.length > 14
      ? selectedOption.label.slice(0, 14) + "..."
      : selectedOption.label
    : label;

  const IconComponent = icon === "architect" ? ArchitectIcon : LocationIcon;

  return (
    <div ref={ref} className="hero-dropdown">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`hero-dropdown-btn ${value ? "has-value" : ""}`}
      >
        <IconComponent />
        <span className="hero-dropdown-label">{displayLabel}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="hero-dropdown-menu">
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
            className={`hero-dropdown-item ${!value ? "selected" : ""}`}
          >
            ALL {label}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`hero-dropdown-item ${value === opt.value ? "selected" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Icons
function ArchitectIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="hero-dropdown-icon"
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
    >
      <path d="M8 1C5.5 1 3.5 3 3.5 5.5C3.5 9 8 15 8 15S12.5 9 12.5 5.5C12.5 3 10.5 1 8 1Z" />
      <circle cx="8" cy="5.5" r="1.5" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`hero-dropdown-chevron ${isOpen ? "open" : ""}`}
      viewBox="0 0 10 6"
      fill="currentColor"
    >
      <path d="M0 0l5 6 5-6z" />
    </svg>
  );
}
