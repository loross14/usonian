# HOMES LISTING Page Specification
## Steve Jobs CUT/REFINE/ADD Audit

**Date:** 2026-02-21
**Mockup Reference:** `public/mockups/v2-homes-listing.html`
**Production Files:** `src/app/homes/page.tsx`, `src/app/homes/HomesClient.tsx`

---

## 1. Executive Summary

The production implementation lacks the bold, minimal elegance of the V2 mockup - it has too many visual distractions, inconsistent animation choreography, and missing key components (StatsGrid cascade, FilterBar with tab press animation, and Pagination). The hero section needs the dramatic skew-entry animation and red accent period, while the property table rows require staggered cascade animations with left-border hover states. Most critically, the "PrairieLines" component between hero and stats breaks the visual flow and should be removed entirely.

---

## 2. CUT List

**NO CUTS WITHOUT EXPLICIT APPROVAL**

The following elements are preserved:
- PrairieLines component
- Hero subtitle
- Filter labels and "Clear All" button
- Count badges
- "SHOWING X OF Y" section
- All existing UI elements

Any removal requires direct user approval.

---

## 3. REFINE List

### 3.1 Hero Section

| Element | Before | After | CSS Property |
|---------|--------|-------|--------------|
| Hero padding | `py-16 md:py-24` | `py-20` (80px) | padding-block |
| H1 font-size | `clamp(3rem, 10vw, 7.5rem)` | `clamp(4rem, 12vw, 8rem)` | font-size |
| H1 line-height | `0.85` | `0.9` | line-height |
| H1 content | `HOMES` | `HOMES<span class="text-red">.</span>` | Add red accent period |
| H1 animation | `animate-fade-up` | `animate-hero-skew` | New keyframe (see Section 6) |

### 3.2 Stats Grid

| Element | Before | After | CSS Property |
|---------|--------|-------|--------------|
| Section padding | `border-b border-black` only | `padding: 40px 0; border-bottom: 1px solid black;` | padding-block |
| Grid gap | `gap: 1px` | `gap: 1px` (keep) | gap |
| Cell padding | `2rem 1.5rem` (32px 24px) | `32px 24px` | padding |
| Label font-size | `0.5625rem` (9px) | `11px` | font-size |
| Label letter-spacing | `0.2em` | `0.1em` | letter-spacing |
| Label margin-bottom | `0.75rem` | `8px` | margin-bottom |
| Value font-size | `1.5rem` (24px) | `32px` | font-size |
| Animation | `animate-fade-up` | `animate-stats-cascade` with stagger | New keyframe (see Section 6) |
| "For Sale" label | `For Sale` | `For Sale` | Keep |
| "For Sale" value color | `text-red` | Keep `.accent { color: var(--red); }` on value | color |

### 3.3 Filter Bar

| Element | Before | After | CSS Property |
|---------|--------|-------|--------------|
| Section padding | `py-4` | `padding: 24px 0;` | padding-block |
| Section background | `bg-black/[0.02]` | `transparent` | background |
| Tab group gap | `gap-1` | `gap: 0` (joined borders) | gap |
| Tab padding | `px-3 py-1` | `12px 20px` | padding |
| Tab font-size | `11px` | `11px` (keep) | font-size |
| Tab border | `border-transparent` or `border-black` | `border: 1px solid black; border-right: none;` | border |
| Last tab | No special handling | `border-right: 1px solid black;` | border-right |
| Active tab | `bg-black text-white` | Keep | background, color |
| Tab active animation | None | `filter-press` on :active | New keyframe (see Section 6) |
| Dropdown style | Custom FilterDropdown | Native `<select>` with custom arrow | Complete restyling |
| Dropdown min-width | Variable | `140px` | min-width |
| Dropdown padding | `px-3 py-1.5` | `12px 16px; padding-right: 36px;` | padding |
| Dropdown border | `border border-black` | `border: 1px solid rgba(0,0,0,0.4);` | border |

### 3.4 Property Table

| Element | Before | After | CSS Property |
|---------|--------|-------|--------------|
| Grid columns | `40px_180px_1fr_80px_160px_100px_140px` | `40px 160px 1fr 80px 180px 100px 140px` | grid-template-columns |
| Header padding | `py-3` | `16px 24px` | padding |
| Header border | `border-b-2 border-black` | Keep | border-bottom |
| Header font-size | `9px` | `11px` | font-size |
| Header opacity | `0.5` | `0.6` | opacity |
| Row padding | `1rem 0` | `20px 24px` | padding |
| Row border | `border-bottom: 1px solid black` | `border-bottom: 1px solid rgba(0,0,0,0.1);` | border-bottom |
| Row left border | None | `border-left: 3px solid transparent;` | border-left |
| Row hover background | `rgba(0,0,0,0.02)` | `rgba(191,10,48,0.04)` | background |
| Row hover left border | None | `border-left-color: var(--red);` | border-left-color |
| Row animation | None | `table-row-cascade` with 50ms stagger | New animation |
| Row font-size | `0.75rem` (12px) | `12px` | font-size |
| Architect column font-size | `11px bold` | `11px` normal (mockup shows lighter) | font-size, font-weight |
| Architect opacity | `1` | `0.6` | opacity |
| Star icon size | `10px` | `16px` | width, height |
| Star icon opacity | `1` (for inactive) | `0.4` inactive, `1` active | opacity |
| Star icon hover | None | `opacity: 1; transform: scale(1.2);` | opacity, transform |
| Badge padding | `4px 8px` | `4px 10px` | padding |
| Badge font-size | `0.5625rem` (9px) | `9px` | font-size |
| Price alignment | `md:text-right` | `text-align: right;` | text-align |

### 3.5 Status Badge Refinements

| Status | Before Background | After Background |
|--------|-------------------|------------------|
| FOR SALE | `var(--red)` | `var(--red)` (keep) |
| SOLD | `var(--navy)` | `var(--navy)` (keep) |
| MUSEUM | `var(--gold)` | `var(--gold)` (keep) |

---

## 4. ADD List

### 4.1 Hero Skew Entry Animation

**File:** `src/app/globals.css`

```css
@keyframes hero-skew-enter {
  from {
    opacity: 0;
    transform: translateX(-60px) skewY(-2deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewY(0);
  }
}

.animate-hero-skew {
  animation: hero-skew-enter 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### 4.2 Stats Cascade Animation

**File:** `src/app/globals.css`

```css
@keyframes stats-cascade {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-stats-cascade {
  opacity: 0;
  animation: stats-cascade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.stat-cascade-1 { animation-delay: 0.3s; }
.stat-cascade-2 { animation-delay: 0.38s; }
.stat-cascade-3 { animation-delay: 0.46s; }
.stat-cascade-4 { animation-delay: 0.54s; }
```

### 4.3 Filter Tab Press Animation

**File:** `src/app/globals.css`

```css
@keyframes filter-press {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(0.95); }
  100% { transform: scaleX(1); }
}

.filter-tab:active {
  animation: filter-press 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 4.4 Table Row Cascade Animation

**File:** `src/app/globals.css`

```css
@keyframes table-row-cascade {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.property-row {
  opacity: 0;
  animation: table-row-cascade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Stagger delays - generate dynamically for first 20 rows */
.property-row:nth-child(1) { animation-delay: 0.5s; }
.property-row:nth-child(2) { animation-delay: 0.55s; }
.property-row:nth-child(3) { animation-delay: 0.6s; }
.property-row:nth-child(4) { animation-delay: 0.65s; }
.property-row:nth-child(5) { animation-delay: 0.7s; }
.property-row:nth-child(6) { animation-delay: 0.75s; }
.property-row:nth-child(7) { animation-delay: 0.8s; }
.property-row:nth-child(8) { animation-delay: 0.85s; }
.property-row:nth-child(9) { animation-delay: 0.9s; }
.property-row:nth-child(10) { animation-delay: 0.95s; }
```

### 4.5 Pagination Component

**New File:** `src/components/ui/Pagination.tsx`

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Implementation with page buttons, ellipsis, arrows
}
```

**CSS for Pagination:**

```css
.pagination-section {
  padding: 32px 0 60px;
  border-top: 1px solid var(--black);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.page-btn:hover {
  color: var(--red);
}

.page-btn.active {
  font-weight: 700;
}

.page-btn.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--red);
  animation: page-underline 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes page-underline {
  from { transform: translateX(-50%) scaleX(0); }
  to { transform: translateX(-50%) scaleX(1); }
}

.page-arrow {
  font-size: 14px;
  opacity: 0.6;
}

.page-arrow:hover {
  opacity: 1;
}

.page-ellipsis {
  width: 40px;
  text-align: center;
  opacity: 0.4;
}
```

### 4.6 Star Icon Interactive Toggle

**Update:** `src/components/icons/StarIcon.tsx`

Add click handler prop and hover animation:

```tsx
interface StarIconProps {
  size?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StarIcon({ size = 16, active = false, onClick, className = "" }: StarIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`star-icon-btn ${active ? 'active' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </button>
  );
}
```

**CSS:**

```css
.star-icon-btn {
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: none;
  border: none;
  padding: 0;
}

.star-icon-btn:hover {
  opacity: 1;
  transform: scale(1.2);
}

.star-icon-btn.active {
  opacity: 1;
}

.star-icon-btn.active svg path {
  fill: var(--gold);
  stroke: var(--gold);
}
```

---

## 5. Component Mapping

| Mockup Section | Mockup Class/Element | Production Component | Production File | Action |
|----------------|---------------------|---------------------|-----------------|--------|
| Header | `header` | Shared Header | `src/components/layout/Header.tsx` | NONE (separate spec) |
| Hero | `.hero h1` | H1 in page.tsx | `page.tsx:65` | REFINE - add skew animation, add red period |
| Hero subtitle | N/A (does not exist) | `p.text-xs` | `page.tsx:66-70` | CUT |
| Prairie Lines | N/A (does not exist) | `PrairieLines` | `page.tsx:74-77` | CUT |
| Stats Grid | `.stats-section .stats-grid` | data-grid in page.tsx | `page.tsx:80-98` | REFINE - add cascade animation, adjust spacing |
| Stats Cell | `.stat-cell` | `.data-cell` | `page.tsx:82-97` | REFINE - add stagger delays |
| Filter Bar | `.filter-section .filter-bar` | `PropertyFilters` | `PropertyFilters.tsx` | REFINE - joined tab borders, remove clutter |
| Filter Tabs | `.filter-tabs .filter-tab` | STATUS_TABS buttons | `PropertyFilters.tsx:79-101` | REFINE - remove counts, add press animation |
| Filter Dropdowns | `.filter-dropdowns select` | `FilterDropdown` | `PropertyFilters.tsx:107-122` | REFINE - use native select with custom styling |
| Table Header | `.table-header` | Hidden grid header | `PropertyList.tsx:39-47` | REFINE - adjust column widths, padding |
| Table Row | `.table-row` | `.property-row Link` | `PropertyList.tsx:59-111` | REFINE - add cascade animation, hover border |
| Star Icon | `.star-icon` | `StarIcon` | `PropertyList.tsx:67` | ADD - click toggle, hover scale |
| Status Badge | `.status-badge` | `Badge` | `PropertyList.tsx:99` | REFINE - padding adjustment |
| Pagination | `.pagination-section` | N/A (does not exist) | N/A | ADD - new component |
| Newsletter CTA | N/A (not in mockup) | `NewsletterCTA` | `page.tsx:117` | KEEP (separate from listing page spec) |

---

## 6. Animation Specs

| Element | Keyframe Name | Easing | Duration | Delay | Trigger |
|---------|--------------|--------|----------|-------|---------|
| Hero H1 | `hero-skew-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.9s | 0ms | Page load |
| Stats Cell 1 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6s | 300ms | Page load |
| Stats Cell 2 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6s | 380ms | Page load |
| Stats Cell 3 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6s | 460ms | Page load |
| Stats Cell 4 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6s | 540ms | Page load |
| Filter Tab | `filter-press` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.2s | 0ms | On click (:active) |
| Table Row 1 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.5s | 500ms | Page load |
| Table Row 2 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.5s | 550ms | Page load |
| Table Row N | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.5s | 500ms + (N-1)*50ms | Page load |
| Nav Underline | `nav-underline-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.4s | 0ms | Active state |
| Page Active Underline | `page-underline` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.3s | 0ms | Page button active |
| Star Icon Hover | N/A (CSS transition) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.2s | 0ms | On hover |
| Star Icon Toggle | N/A (CSS transition) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.2s | 0ms | On click |
| Row Hover Border | N/A (CSS transition) | `ease` | 0.2s | 0ms | On hover |

**Bounce Easing Variable:**
```css
:root {
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 7. New Component Specs

### 7.1 StatsGrid Component

**File:** `src/components/ui/StatsGrid.tsx`

```tsx
interface Stat {
  label: string;
  value: string | number;
  accent?: boolean;  // Apply red color to value
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className = "" }: StatsGridProps) {
  return (
    <section className={`stats-section ${className}`}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-cell animate-stats-cascade stat-cascade-${index + 1}`}
            >
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-value ${stat.accent ? 'accent' : ''}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| stats | `Stat[]` | required | Array of stat objects |
| className | `string` | `""` | Additional CSS classes |

**Stat Object:**
| Field | Type | Description |
|-------|------|-------------|
| label | `string` | Uppercase label text |
| value | `string \| number` | Display value |
| accent | `boolean?` | If true, value is red |

**CSS:**
```css
.stats-section {
  padding: 40px 0;
  border-bottom: 1px solid var(--black);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--black);
}

.stat-cell {
  background: var(--white);
  padding: 32px 24px;
}

.stat-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  opacity: 0.6;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-value.accent {
  color: var(--red);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 7.2 FilterBar Component

**File:** `src/components/ui/FilterBar.tsx`

```tsx
interface FilterTab {
  value: string;
  label: string;
}

interface FilterDropdownOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  dropdowns?: Array<{
    placeholder: string;
    options: FilterDropdownOption[];
    value: string | null;
    onChange: (value: string | null) => void;
  }>;
}

export function FilterBar({ tabs, activeTab, onTabChange, dropdowns = [] }: FilterBarProps) {
  return (
    <section className="filter-section">
      <div className="container">
        <div className="filter-bar">
          <div className="filter-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`filter-tab ${activeTab === tab.value ? 'active' : ''}`}
                onClick={() => onTabChange(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {dropdowns.length > 0 && (
            <div className="filter-dropdowns">
              {dropdowns.map((dropdown, index) => (
                <select
                  key={index}
                  className="filter-dropdown"
                  value={dropdown.value || ''}
                  onChange={(e) => dropdown.onChange(e.target.value || null)}
                >
                  <option value="">{dropdown.placeholder}</option>
                  {dropdown.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**CSS:**
```css
.filter-section {
  padding: 24px 0;
  border-bottom: 1px solid var(--black);
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.filter-tabs {
  display: flex;
  gap: 0;
}

.filter-tab {
  padding: 12px 20px;
  font-size: 11px;
  letter-spacing: 0.1em;
  font-weight: 500;
  font-family: var(--font-mono);
  background: transparent;
  border: 1px solid var(--black);
  border-right: none;
  cursor: pointer;
  transition: all 0.2s var(--ease-bounce);
  text-transform: uppercase;
}

.filter-tab:last-child {
  border-right: 1px solid var(--black);
}

.filter-tab:hover {
  background: rgba(0, 0, 0, 0.05);
}

.filter-tab.active {
  background: var(--black);
  color: var(--white);
}

.filter-tab:active {
  animation: filter-press 0.2s var(--ease-bounce);
}

.filter-dropdowns {
  display: flex;
  gap: 12px;
}

.filter-dropdown {
  padding: 12px 16px;
  padding-right: 36px;
  font-size: 11px;
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: var(--white);
  cursor: pointer;
  min-width: 140px;
  appearance: none;
  text-transform: uppercase;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.filter-dropdown:focus-visible {
  outline: 2px solid var(--red);
  outline-offset: -2px;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-tabs {
    flex-wrap: wrap;
  }

  .filter-dropdowns {
    flex-wrap: wrap;
    width: 100%;
  }

  .filter-dropdown {
    flex: 1;
    min-width: 120px;
  }
}
```

### 7.3 Pagination Component

**File:** `src/components/ui/Pagination.tsx`

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className={`pagination-section ${className}`}>
      <div className="container">
        <nav className="pagination" aria-label="Pagination">
          <button
            className="page-btn page-arrow"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &larr;
          </button>

          {getPageNumbers().map((page, index) => (
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}

          <button
            className="page-btn page-arrow"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &rarr;
          </button>
        </nav>
      </div>
    </section>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentPage | `number` | required | Active page (1-indexed) |
| totalPages | `number` | required | Total number of pages |
| onPageChange | `(page: number) => void` | required | Callback when page changes |
| className | `string` | `""` | Additional CSS classes |

**CSS:** (See Section 4.5)

---

## 8. Implementation Checklist

### Phase 1: CUT (30 min)
- [ ] Remove PrairieLines from page.tsx
- [ ] Remove hero subtitle paragraph
- [ ] Remove "Filter:" label from PropertyFilters
- [ ] Remove vertical dividers from PropertyFilters
- [ ] Remove "Clear All" button
- [ ] Remove count badges from status tabs
- [ ] Remove "SHOWING X OF Y" section
- [ ] Remove FiltersSkeleton

### Phase 2: REFINE (2 hours)
- [ ] Update hero padding and add red period
- [ ] Add hero skew animation keyframe and class
- [ ] Adjust StatsGrid cell sizing and add cascade animation
- [ ] Update FilterBar styling (joined borders, no background)
- [ ] Replace FilterDropdown with native select styling
- [ ] Update property table column widths
- [ ] Add row cascade animation with stagger
- [ ] Add row hover left border effect
- [ ] Update star icon sizing and add hover effect

### Phase 3: ADD (2 hours)
- [ ] Create Pagination component
- [ ] Add pagination state to HomesClient
- [ ] Integrate pagination with filtered results
- [ ] Add star icon click toggle functionality
- [ ] Add focus-visible styles to all interactive elements

### Phase 4: TEST (1 hour)
- [ ] Test all animations with reduced motion preference
- [ ] Test responsive behavior at all breakpoints
- [ ] Test keyboard navigation (tabs, pagination)
- [ ] Test filter combinations
- [ ] Visual QA against mockup

---

## 9. Design Tokens Reference

```css
:root {
  /* Colors */
  --red: #BF0A30;
  --navy: #002868;
  --gold: #D4B270;
  --black: #000000;
  --white: #FFFFFF;

  /* Typography */
  --font-mono: 'JetBrains Mono', monospace;

  /* Animation */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

*"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs*

This spec removes the unnecessary, refines the essential, and adds only what makes the experience more powerful. No decoration for decoration's sake. Every pixel earns its place.
