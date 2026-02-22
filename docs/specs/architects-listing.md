# Architects Listing Page - V2 Specification

**Author:** Steve Jobs Design Audit
**Date:** 2026-02-21
**Status:** Implementation Ready

---

## 1. Executive Summary

The current production architects listing page dilutes the V2 vision through unnecessary decorative elements (PrairieLines), inferior animation timing, and missing signature components (StatsGrid with staggered cells, row cascade animations, fellowship stars with gold "T" badges). The hero section requires a dramatic skew-entry animation with an inline accent number, not the current flat fade-up treatment. Most critically, we must remove the NewsletterCTA from this page entirely - it breaks the flow and belongs only on dedicated conversion pages.

---

## 2. CUT List

**NO CUTS WITHOUT EXPLICIT APPROVAL**

The following elements are preserved:
- PrairieLines component
- NewsletterCTA component
- Hero subtitle text
- All existing layout elements

Any removal requires direct user approval.

---

## 3. REFINE List

| Element | Property | Current Value | V2 Target | File | Line |
|---------|----------|---------------|-----------|------|------|
| Hero padding | `py-*` | `py-16 md:py-24` | `py-20 md:py-32` (80px) | `page.tsx` | 52 |
| Stats section padding | `padding` | implicit via `data-cell` | `60px 0` on section | `page.tsx` | 67-86 |
| Letter marker font-size | `font-size` | `7.5rem` | `3rem` (48px) | `globals.css` | 585-586 |
| Letter marker color | `color` | `var(--red)` | `var(--red)` | OK | - |
| Letter marker margin-bottom | `margin-bottom` | `2.5rem` | `1.5rem` (24px) | `globals.css` | 591 |
| Letter marker line position | `bottom` | `1.25rem` | `0` (full-width underline) | `globals.css` | 598 |
| Letter marker line left | `left` | `6.25rem` | `0` | `globals.css` | 599 |
| Architect row padding | `py-*` | `py-5` | `py-4` (16px 20px) | `page.tsx` | 109 |
| Architect row hover bg | `hover:bg-*` | `hover:bg-black/[0.02]` | `hover:bg-[rgba(191,10,48,0.08)]` | `page.tsx` | 109 |
| Architect row hover padding-left | `hover:pl-*` | `hover:pl-5` | `hover:pl-8` (32px) | `page.tsx` | 109 |
| Architect name font-size | `text-*` | `text-sm` | `text-sm` (14px) | OK | - |
| Stats grid gap | `gap` | `gap: 1px` | `gap: 1px` | OK | - |
| Stats cell padding | `padding` | `2rem 1.5rem` | `32px 24px` | `globals.css` | 518 |
| Stats number color | `color` | mixed | All `var(--red)` | `page.tsx` | 71-84 |
| Stats number font-size | `font-size` | `1.5rem` | `2.5rem` (40px) | `globals.css` | 529 |
| Directory section padding | `py-*` | `py-10` | `py-16` (60px 0) | `page.tsx` | 90 |

**CSS Changes Required:**

```css
/* globals.css - Letter Marker Refinements */
.letter-marker {
  font-size: 3rem; /* was 7.5rem - V2 uses smaller markers */
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: var(--red);
  margin-bottom: 1.5rem; /* was 2.5rem */
  position: relative;
}

.letter-marker::after {
  content: '';
  position: absolute;
  bottom: 0; /* was 1.25rem */
  left: 0; /* was 6.25rem */
  right: 0;
  height: 2px; /* was 1px */
  background-color: var(--black);
  transform: scaleX(0);
  transform-origin: left;
  animation: draw-line 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

/* Stats Cell Refinements */
.data-value {
  font-size: 2.5rem; /* was 1.5rem */
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--red); /* All stat numbers in red */
}
```

---

## 4. ADD List

### 4.1 Hero Skew-Entry Animation

**Keyframe Definition (add to globals.css):**

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

**Hero JSX (replace current):**

```tsx
<section className="hero border-b border-black">
  <div className="container py-20 md:py-32 overflow-hidden">
    <h1 className="animate-hero-skew flex items-baseline gap-6">
      ARCHITECTS
      <span className="hero-accent-number">{totalArchitects}</span>
    </h1>
  </div>
</section>
```

**Hero Accent Number CSS:**

```css
.hero-accent-number {
  font-size: clamp(2rem, 6vw, 4rem);
  color: var(--red);
  font-weight: 700;
}
```

### 4.2 StatsGrid with Staggered Cell Animation

**Keyframe Definition:**

```css
@keyframes stat-cell-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-cell {
  opacity: 0;
  animation: stat-cell-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.stat-cell:nth-child(1) { animation-delay: 0.2s; }
.stat-cell:nth-child(2) { animation-delay: 0.3s; }
.stat-cell:nth-child(3) { animation-delay: 0.4s; }
.stat-cell:nth-child(4) { animation-delay: 0.5s; }
```

**StatsGrid JSX:**

```tsx
<section className="stats-section border-b border-black py-16">
  <div className="container">
    <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-black border border-black">
      <div className="stat-cell bg-white p-8 text-center">
        <div className="stat-number">{totalArchitects}</div>
        <div className="stat-label">Architects</div>
      </div>
      <div className="stat-cell bg-white p-8 text-center">
        <div className="stat-number">{taliesinCount}</div>
        <div className="stat-label">Taliesin Fellows</div>
      </div>
      <div className="stat-cell bg-white p-8 text-center">
        <div className="stat-number">{totalProperties}</div>
        <div className="stat-label">Properties</div>
      </div>
      <div className="stat-cell bg-white p-8 text-center">
        <div className="stat-number">1936-1970</div>
        <div className="stat-label">Years Active</div>
      </div>
    </div>
  </div>
</section>
```

### 4.3 Row Cascade Animation

**Keyframe Definition:**

```css
@keyframes architect-row-cascade {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.architect-row {
  opacity: 0;
  animation: architect-row-cascade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Dynamic stagger - 50ms increments */
.architect-row:nth-child(1) { animation-delay: 0.05s; }
.architect-row:nth-child(2) { animation-delay: 0.10s; }
.architect-row:nth-child(3) { animation-delay: 0.15s; }
.architect-row:nth-child(4) { animation-delay: 0.20s; }
.architect-row:nth-child(5) { animation-delay: 0.25s; }
```

### 4.4 Fellowship Star (Taliesin "T" Badge)

**Replace current StarIcon with FellowshipStar component:**

Create new file `src/components/ui/FellowshipStar.tsx`:

```tsx
interface FellowshipStarProps {
  className?: string;
}

export function FellowshipStar({ className = "" }: FellowshipStarProps) {
  return (
    <span
      className={`fellowship-star ${className}`}
      aria-label="Taliesin Fellow"
    >
      T
    </span>
  );
}
```

**CSS for FellowshipStar:**

```css
.fellowship-star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--gold);
  color: var(--black);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
```

### 4.5 LetterSection Component

Create new file `src/components/architects/LetterSection.tsx`:

```tsx
import Link from "next/link";
import { FellowshipStar } from "@/components/ui/FellowshipStar";
import { type Architect } from "@/types";

interface LetterSectionProps {
  letter: string;
  architects: Architect[];
  index: number;
}

export function LetterSection({ letter, architects, index }: LetterSectionProps) {
  return (
    <div
      className="letter-section mb-16 last:mb-0"
      style={{ '--section-index': index } as React.CSSProperties}
    >
      {/* Letter Marker */}
      <div className="letter-marker">
        <span className="letter">{letter}</span>
        <div className="letter-line" />
      </div>

      {/* Architect List */}
      <div className="architect-list pl-10">
        {architects.map((architect, rowIndex) => {
          const isTaliesin = architect.fellowship_years !== null;
          const yearStr = architect.birth_year
            ? `${architect.birth_year}${architect.death_year ? `-${architect.death_year}` : '-present'}`
            : '';
          const propertyCount = architect.property_count || 0;

          return (
            <Link
              key={architect.id}
              href={`/architects/${architect.slug}`}
              className="architect-row"
              style={{ '--row-index': rowIndex } as React.CSSProperties}
              tabIndex={0}
            >
              <div className="architect-name">
                {architect.name}
                {isTaliesin && <FellowshipStar />}
              </div>
              <div className="architect-years">{yearStr}</div>
              <div className="architect-properties">
                <strong>{propertyCount}</strong> {propertyCount === 1 ? 'property' : 'properties'}
              </div>
              <div className="row-arrow">&rarr;</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

**LetterSection CSS:**

```css
/* Letter Section Container */
.letter-section {
  margin-bottom: 64px;
}

.letter-section:last-child {
  margin-bottom: 0;
}

/* Letter Marker with Animation */
.letter-marker {
  position: relative;
  margin-bottom: 24px;
}

.letter-marker .letter {
  font-size: 3rem;
  font-weight: 700;
  color: var(--red);
  line-height: 0.9;
  display: block;
  opacity: 0;
  animation: letter-marker-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes letter-marker-reveal {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.letter-marker .letter-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--black);
  transform-origin: left;
  transform: scaleX(0);
  animation: letter-line-draw 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

@keyframes letter-line-draw {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Architect List Container */
.architect-list {
  padding-left: 40px;
}

/* Architect Row */
.architect-row {
  display: grid;
  grid-template-columns: 1fr 140px 120px 100px;
  gap: 24px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  opacity: 0;
  animation: architect-row-cascade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--row-index, 0) * 0.05s);
  transition: background 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              padding-left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.architect-row:hover {
  background: rgba(191, 10, 48, 0.08);
  padding-left: 32px;
}

.architect-row:hover .architect-name {
  color: var(--red);
}

.architect-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
}

.architect-row:focus-visible {
  outline: 2px solid var(--red);
  outline-offset: -2px;
  background: rgba(191, 10, 48, 0.08);
}

/* Row Elements */
.architect-name {
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color 0.2s ease;
}

.architect-years {
  font-size: 12px;
  opacity: 0.6;
}

.architect-properties {
  font-size: 12px;
}

.architect-properties strong {
  color: var(--red);
}

.row-arrow {
  font-size: 14px;
  opacity: 0.4;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateX(-4px);
}

/* Responsive */
@media (max-width: 900px) {
  .architect-row {
    grid-template-columns: 1fr 100px;
  }

  .architect-years,
  .architect-properties {
    display: none;
  }
}

@media (max-width: 600px) {
  .letter-marker .letter {
    font-size: 2.5rem;
  }

  .architect-list {
    padding-left: 16px;
  }
}
```

### 4.6 Directory Footer Legend

Add footer legend after architect sections:

```tsx
<div className="directory-footer">
  <div className="footer-legend">
    <div className="legend-item">
      <FellowshipStar />
      <span>Taliesin Fellow</span>
    </div>
    <div className="legend-item">
      <span className="fellowship-badge-display">TALIESIN</span>
      <span>Frank Lloyd Wright apprentice</span>
    </div>
  </div>
  <p className="footer-note">
    Data includes architects with verified mid-century modern residential work
    in the Usonian registry. Years active: 1936-1970.
  </p>
</div>
```

**Footer Legend CSS:**

```css
.directory-footer {
  margin-top: 60px;
  padding: 32px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-legend {
  display: flex;
  gap: 40px;
  margin-bottom: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.fellowship-badge-display {
  display: inline-block;
  padding: 4px 8px;
  font-size: 9px;
  letter-spacing: 0.1em;
  background: var(--gold);
  color: var(--black);
  font-weight: 700;
}

.footer-note {
  font-size: 11px;
  opacity: 0.4;
  letter-spacing: 0.05em;
}
```

---

## 5. Component Mapping

| Mockup Section | Production Component | File | Action |
|----------------|---------------------|------|--------|
| Header | Shared layout header | `layout.tsx` | KEEP |
| Hero (ARCHITECTS + 21) | `<section>` inline | `page.tsx:51-59` | REFINE - add skew animation, accent number |
| Stats Grid (4 cells) | `data-grid` section | `page.tsx:67-86` | REFINE - add stagger animation, fix number colors |
| Prairie Lines | `<PrairieLines />` | `page.tsx:62-64` | CUT - not in V2 |
| Letter Section (A-Z) | inline map | `page.tsx:91-141` | REFINE - extract to `<LetterSection />` component |
| Letter Marker | `.letter-marker` div | `page.tsx:94` | REFINE - add line-draw animation |
| Architect Row | `<Link>` component | `page.tsx:106-137` | REFINE - add cascade animation, row-arrow |
| Fellowship Star | `<StarIcon />` | `page.tsx:113` | REPLACE - use `<FellowshipStar />` with gold "T" |
| Fellowship Badge | `.fellowship-badge` | `page.tsx:118-120` | KEEP - but move after name |
| Directory Footer Legend | - | - | ADD - new legend component |
| Newsletter CTA | `<NewsletterCTA />` | `page.tsx:146` | CUT - remove from this page |

---

## 6. Animation Specs

| Element | Keyframe Name | Easing | Duration | Delay | Trigger |
|---------|---------------|--------|----------|-------|---------|
| Hero Title | `hero-skew-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 900ms | 0ms | Page load |
| Stats Cell 1 | `stat-cell-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 200ms | Page load |
| Stats Cell 2 | `stat-cell-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 300ms | Page load |
| Stats Cell 3 | `stat-cell-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 400ms | Page load |
| Stats Cell 4 | `stat-cell-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 500ms | Page load |
| Letter (A, B, C...) | `letter-marker-reveal` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 0ms | Scroll into view |
| Letter Line | `letter-line-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 800ms | 300ms | After letter reveal |
| Architect Row n | `architect-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | n * 50ms | After letter line |
| Row Hover BG | transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 300ms | - | Mouse enter |
| Row Hover Padding | transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 300ms | - | Mouse enter |
| Row Arrow | transition | `ease` | 200ms | - | Mouse enter |
| Nav Indicator | `nav-indicator` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 400ms | 0ms | Active state |

**Easing Function Reference:**

```css
--easing: cubic-bezier(0.34, 1.56, 0.64, 1);
```

This is a custom "overshoot" easing that creates a slight bounce/elastic feel, giving the interface an organic, living quality - fitting for architecture inspired by natural forms.

---

## 7. LetterSection Component Spec

### 7.1 Component Interface

```typescript
interface LetterSectionProps {
  /** Single uppercase letter (A-Z) */
  letter: string;
  /** Array of architects whose names start with this letter */
  architects: Architect[];
  /** Zero-based index for section, used for stagger calculations */
  index: number;
}
```

### 7.2 Visual Breakdown

```
+------------------------------------------+
|  A                                       |  <- .letter (3rem, red, scale-in)
|  ========================================|  <- .letter-line (2px black, draw left-to-right)
|                                          |
|    Alden B. Dow [T] 1904-1983  3 props ->|  <- .architect-row (cascade)
|    Aaron Green      1917-2012  5 props ->|
+------------------------------------------+
     ^40px padding-left
```

### 7.3 CSS Variables

```css
.letter-section {
  --letter-size: 3rem;
  --letter-color: var(--red);
  --line-height: 2px;
  --line-color: var(--black);
  --row-gap: 0;
  --row-padding-y: 16px;
  --row-padding-x: 20px;
  --hover-bg: rgba(191, 10, 48, 0.08);
  --hover-indent: 32px;
  --cascade-delay-increment: 50ms;
}
```

### 7.4 Accessibility

- Each `.architect-row` must have `tabindex="0"` for keyboard navigation
- On focus, apply same visual treatment as hover
- Use `role="list"` on `.architect-list` and `role="listitem"` on rows if not using `<ul>/<li>`
- Arrow key visible on hover/focus to indicate actionability
- Reduced motion: disable animations, show elements immediately

```css
@media (prefers-reduced-motion: reduce) {
  .letter-marker .letter,
  .letter-marker .letter-line,
  .architect-row {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### 7.5 Full CSS (Copy-Paste Ready)

```css
/* ============================================
   LETTER SECTION COMPONENT
   V2 Architects Listing
   ============================================ */

.letter-section {
  margin-bottom: 64px;
}

.letter-section:last-child {
  margin-bottom: 0;
}

/* Letter Marker */
.letter-marker {
  position: relative;
  margin-bottom: 24px;
}

.letter-marker .letter {
  font-size: 3rem;
  font-weight: 700;
  color: var(--red);
  line-height: 0.9;
  display: block;
  opacity: 0;
  animation: letter-marker-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.letter-marker .letter-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--black);
  transform-origin: left;
  transform: scaleX(0);
  animation: letter-line-draw 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

/* Letter Animations */
@keyframes letter-marker-reveal {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes letter-line-draw {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Architect List */
.architect-list {
  padding-left: 40px;
}

/* Architect Row */
.architect-row {
  display: grid;
  grid-template-columns: 1fr 140px 120px 100px;
  gap: 24px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  opacity: 0;
  animation: architect-row-cascade 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--row-index, 0) * 0.05s);
  transition:
    background 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    padding-left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

@keyframes architect-row-cascade {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.architect-row:hover {
  background: rgba(191, 10, 48, 0.08);
  padding-left: 32px;
}

.architect-row:hover .architect-name {
  color: var(--red);
}

.architect-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
}

.architect-row:focus-visible {
  outline: 2px solid var(--red);
  outline-offset: -2px;
  background: rgba(191, 10, 48, 0.08);
}

/* Row Content */
.architect-name {
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color 0.2s ease;
}

.architect-years {
  font-size: 12px;
  opacity: 0.6;
}

.architect-properties {
  font-size: 12px;
}

.architect-properties strong {
  color: var(--red);
}

.row-arrow {
  font-size: 14px;
  opacity: 0.4;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateX(-4px);
}

/* Fellowship Star (Gold T Badge) */
.fellowship-star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--gold);
  color: var(--black);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .architect-row {
    grid-template-columns: 1fr 100px;
  }

  .architect-years,
  .architect-properties {
    display: none;
  }
}

@media (max-width: 600px) {
  .letter-marker .letter {
    font-size: 2.5rem;
  }

  .architect-list {
    padding-left: 16px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .letter-marker .letter,
  .letter-marker .letter-line,
  .architect-row {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .architect-row {
    transition: none;
  }
}
```

---

## 8. Implementation Checklist

- [ ] Remove PrairieLines component and import from `page.tsx`
- [ ] Remove NewsletterCTA component and import from `page.tsx`
- [ ] Remove hero subtitle paragraph
- [ ] Add hero-skew-enter animation to globals.css
- [ ] Add hero-accent-number class to globals.css
- [ ] Refactor hero section with new animation and accent number
- [ ] Add stat-cell-enter animation with stagger delays to globals.css
- [ ] Update data-value font-size to 2.5rem
- [ ] Create `src/components/ui/FellowshipStar.tsx`
- [ ] Create `src/components/architects/LetterSection.tsx`
- [ ] Update letter-marker styles in globals.css (smaller size, animated line)
- [ ] Add architect-row-cascade animation to globals.css
- [ ] Add row-arrow element with hover transitions
- [ ] Add directory-footer legend section
- [ ] Update responsive breakpoints for new grid
- [ ] Add reduced-motion media queries
- [ ] Test keyboard navigation and focus states

---

*"Design is not just what it looks like and feels like. Design is how it works."*

This specification removes complexity while adding purpose. Every animation serves wayfinding. Every element earns its place.
