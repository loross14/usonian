"use client";

type ViewMode = "list" | "grid";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ view, onChange, className = "" }: ViewToggleProps) {
  return (
    <div className={`view-toggle ${className}`}>
      <button
        type="button"
        className={`view-toggle-btn ${view === "grid" ? "active" : ""}`}
        onClick={() => onChange("grid")}
        aria-pressed={view === "grid"}
        title="Grid View"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
        </svg>
        GRID
      </button>
      <button
        type="button"
        className={`view-toggle-btn ${view === "list" ? "active" : ""}`}
        onClick={() => onChange("list")}
        aria-pressed={view === "list"}
        title="List View"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        LIST
      </button>
    </div>
  );
}
