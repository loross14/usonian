# Property Detail Page - V2 Specification

**Spec Version:** 1.0
**Date:** 2026-02-21
**Status:** Ready for Implementation

---

## 1. Executive Summary

The current property detail page suffers from visual clutter, inconsistent animation timing, and missing signature V2 design elements that define the Usonian brand. We must CUT the dual-column newsletter section and redundant data displays, REFINE the hero animation to use dramatic skew-based entrance with proper cubic-bezier easing, and ADD the preservation badge component, inquire CTA button, and proper 5-column data grid with cascading animations. The page should feel like viewing an architectural masterpiece in a museum - singular focus, dramatic reveals, and nothing extraneous.

---

## 2. CUT List

**NO CUTS WITHOUT EXPLICIT APPROVAL**

The following elements are preserved:
- Newsletter/Property Alerts CTA
- Preservation status display
- Fellowship badges
- Curator notes
- References card
- All data grid cells
- Table headers

Any removal requires direct user approval.

---

## 3. REFINE List

Elements that need improvement. God is in the details.

### 3.1 Hero Section Animation

| Property | Current | Target | File | Line |
|----------|---------|--------|------|------|
| Animation keyframes | `fade-up` (translateY only) | `hero-title-enter` (translateX + skewY) | `globals.css` | 160-169 |
| Title animation | `animation: fade-up 0.6s ease-out` | `animation: hero-title-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` | `globals.css` | NEW |
| Title transform origin | None | `translateX(-80px) skewY(-2deg)` to `translateX(0) skewY(0)` | `globals.css` | NEW |
| Hero meta animation | Same as title | Delayed `hero-subtitle-enter` at 0.15s | `globals.css` | NEW |

**New keyframes to add to `globals.css`:**
```css
@keyframes hero-title-enter {
  from {
    opacity: 0;
    transform: translateX(-80px) skewY(-2deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewY(0);
  }
}

@keyframes hero-subtitle-enter {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### 3.2 Prairie Lines

| Property | Current | Target | File | Line |
|----------|---------|--------|------|------|
| Line height | `1px` | `3px` | `globals.css` | 294-296 |
| Direction | `flex-direction: column` | `flex-direction: row` | `globals.css` | 287 |
| Gap | `4px` | `6px` | `globals.css` | 288 |
| Line flex values | All equal | `flex: 3`, `flex: 1`, `flex: 2` | `globals.css` | 299-309 |
| Animation | `prairie-draw` (width) | `line-draw` (scaleX from left) | `globals.css` | 296 |
| Padding | `2.5rem 0` | `20px 40px` | `globals.css` | 289 |
| Border bottom | None | `1px solid var(--black)` | `globals.css` | NEW |

### 3.3 Data Grid

| Property | Current | Target | File | Line |
|----------|---------|--------|------|------|
| Grid columns | `repeat(2/4/6, 1fr)` responsive | `repeat(5, 1fr)` | `page.tsx` | 131 |
| Gap | `1px` | `0` (use border-right) | `globals.css` | 511 |
| Cell border | None | `border-right: 1px solid var(--black)` | `globals.css` | NEW |
| Outer border | None (bg-black creates lines) | `border: 1px solid var(--black)` | `globals.css` | NEW |
| Cell padding | `2rem 1.5rem` | `32px 24px` | `globals.css` | 517 |
| Animation | `fade-up` | `data-cascade` (translateX) | `globals.css` | NEW |

### 3.4 Typography Refinements

| Element | Current | Target | File |
|---------|---------|--------|------|
| h1 font-size | `clamp(3rem, 10vw, 7.5rem)` | `clamp(5rem, 14vw, 12rem)` | `globals.css:91` |
| h1 line-height | `0.85` | `0.85` | (unchanged) |
| h1 letter-spacing | `-0.04em` | `-0.04em` | (unchanged) |
| h1 margin-bottom | `1.5rem` (mb-6) | `32px` | `page.tsx:105` |
| Data label font-size | `0.5625rem` (9px) | `11px` | `globals.css:522` |
| Data label letter-spacing | `0.2em` | `0.2em` | (unchanged) |
| Data label margin-bottom | `0.75rem` | `8px` | `globals.css:525` |
| Data value font-size | `1.5rem` | `16px` | `globals.css:529` |
| Breadcrumb font-size | `10px` | `11px` | `page.tsx:79` |
| Breadcrumb letter-spacing | `0.15em` | `0.15em` | (unchanged) |

### 3.5 Hero Meta Styling

| Property | Current | Target | File | Line |
|----------|---------|--------|------|------|
| Divider element | `//` text | `<div class="divider">` (40px x 1px line) | `page.tsx` | 110, 112 |
| Architect link | Plain text | Red color, underline on hover | `page.tsx` | 92-102 |
| Meta gap | `1rem` (gap-4) | `24px` | `page.tsx` | 108 |
| Font-size | `0.75rem` (12px) | `11px` | `page.tsx` | 108 |

### 3.6 Related Properties Section

| Property | Current | Target | File |
|----------|---------|--------|------|
| Layout | 6-column table | 5-column row: `200px 1fr 120px 120px 140px` | `page.tsx:320-327, 338` |
| Row padding | `1rem 0` | `24px 0` | `globals.css:555` |
| Hover arrow | None | Animated `&rarr;` on hover | NEW |
| Thumbnail | None | 200x120px placeholder | NEW |
| Animation | None | `related-cascade` triggered on scroll | NEW |

---

## 4. ADD List

Missing elements from V2 mockup. Innovation distinguishes leaders from followers.

### 4.1 Preservation Badge Component

**Location:** `src/components/ui/PreservationBadge.tsx` (update existing)

```tsx
interface PreservationBadgeProps {
  status: string;
  className?: string;
}

export function PreservationBadge({ status, className = "" }: PreservationBadgeProps) {
  return (
    <div
      className={`preservation-badge ${className}`}
      data-animate="scroll"
    >
      <div className="badge-icon">*</div>
      <div className="badge-text">{status}</div>
    </div>
  );
}
```

**CSS (add to globals.css):**
```css
@keyframes badge-slide-in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.preservation-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: var(--navy);
  color: var(--white);
  padding: 16px 24px;
  margin-top: 40px;
  opacity: 0;
}

.preservation-badge.animate {
  animation: badge-slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.badge-icon {
  width: 24px;
  height: 24px;
  border: 2px solid var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--gold);
}

.badge-text {
  font-size: 11px;
  letter-spacing: 0.15em;
  font-weight: 700;
}
```

### 4.2 Inquire CTA Button Section

**Add after story section, before related properties:**

```tsx
{/* Inquire Section */}
<section className="inquire-section">
  <button className="inquire-btn">
    INQUIRE ABOUT THIS PROPERTY
  </button>
  <p className="inquire-subtitle">Private showings available by appointment</p>
</section>
```

**CSS (add to globals.css):**
```css
.inquire-section {
  padding: 80px 40px;
  border-bottom: 1px solid var(--black);
  text-align: center;
}

.inquire-btn {
  display: inline-block;
  background: var(--red);
  color: var(--white);
  padding: 28px 80px;
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(191, 10, 48, 0.25);
}

.inquire-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(191, 10, 48, 0.4);
}

.inquire-btn:active {
  transform: translateY(2px) scale(0.98);
  box-shadow: 0 2px 8px rgba(191, 10, 48, 0.2);
}

.inquire-btn:focus-visible {
  outline: 3px solid var(--navy);
  outline-offset: 4px;
}

.inquire-subtitle {
  margin-top: 16px;
  font-size: 11px;
  letter-spacing: 0.1em;
  opacity: 0.4;
}
```

### 4.3 Blueprint Grid Overlay

**Add to property image section:**

```tsx
<section className="blueprint-section">
  <div className="blueprint-container">
    <div className="blueprint-image">
      <div className="blueprint-grid"></div>
      <img src={generatedSvgUrl} alt={property.home_name} />
    </div>
  </div>
</section>
```

**CSS:**
```css
@keyframes blueprint-reveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 0.15;
    transform: scale(1);
  }
}

.blueprint-section {
  padding: 80px 40px;
  border-bottom: 1px solid var(--black);
  position: relative;
  overflow: hidden;
}

.blueprint-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.blueprint-image {
  position: relative;
  width: 100%;
  height: 600px;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.blueprint-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(var(--navy) 1px, transparent 1px),
    linear-gradient(90deg, var(--navy) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0;
  animation: blueprint-reveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
  pointer-events: none;
}
```

### 4.4 Scroll-Triggered Animation Hook

**Create:** `src/hooks/useScrollAnimation.ts`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

### 4.5 Related Properties Row Component

**Create:** `src/components/property/RelatedPropertyRow.tsx`

```tsx
"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { formatPrice, formatLocation } from "@/types";

interface RelatedPropertyRowProps {
  property: {
    slug: string;
    home_name: string;
    year_built: number;
    parsed_city: string | null;
    parsed_state: string | null;
    last_sale_price: number | null;
  };
  index: number;
}

export function RelatedPropertyRow({ property, index }: RelatedPropertyRowProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <Link
      href={`/homes/${property.slug}`}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`related-row ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="related-thumb">
        <span className="related-thumb-placeholder">[ IMAGE ]</span>
      </div>
      <div className="related-info">
        <div className="related-name">{property.home_name}</div>
        <div className="related-meta">
          {formatLocation(property.parsed_city, property.parsed_state)}
        </div>
      </div>
      <div className="related-meta">{property.year_built}</div>
      <div className="related-meta">
        {property.last_sale_price ? formatPrice(property.last_sale_price) : "Upon Request"}
      </div>
      <div className="related-arrow">&rarr;</div>
    </Link>
  );
}
```

---

## 5. Component Mapping

| V2 Mockup Section | Production Component | File | Action |
|-------------------|---------------------|------|--------|
| Header with Breadcrumb | Inline in page | `page.tsx:78-88` | REFINE - update breadcrumb styling |
| Hero Title | Inline h1 | `page.tsx:105` | REFINE - add hero-title-enter animation |
| Hero Meta | Inline div | `page.tsx:108-120` | REFINE - add divider lines, architect link styling |
| Prairie Lines | `PrairieLines` | `PrairieLines.tsx` | REFINE - horizontal layout, varied widths |
| Data Grid (5-col) | Inline data-grid | `page.tsx:130-169` | REFINE - fixed 5 columns, cascade animation |
| Blueprint Image | Inline section | `page.tsx:171-182` | ADD - blueprint grid overlay |
| Story Section | Inline section | `page.tsx:184-211` | Keep mostly as-is |
| Preservation Badge | `PreservationBadge` | `Badge.tsx:35-49` | REFINE - new scroll-triggered design |
| Inquire Button | Not present | - | ADD - new section |
| Related Properties | Inline section | `page.tsx:305-356` | REFINE - new row layout with thumbnails |
| Newsletter CTA | `NewsletterCTA` | `NewsletterCTA.tsx` | CUT - remove from page |

---

## 6. Animation Specs

| Element | Keyframe Name | Easing | Duration | Delay | Trigger |
|---------|--------------|--------|----------|-------|---------|
| Hero Title (h1) | `hero-title-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0s` | Page load |
| Hero Meta | `hero-subtitle-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.15s` | Page load |
| Prairie Line 1 | `line-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.7s` | `0.2s` | Page load |
| Prairie Line 2 | `line-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.7s` | `0.35s` | Page load |
| Prairie Line 3 | `line-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.7s` | `0.5s` | Page load |
| Data Cell 1 | `data-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.1s` | Page load |
| Data Cell 2 | `data-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.2s` | Page load |
| Data Cell 3 | `data-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.3s` | Page load |
| Data Cell 4 | `data-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.4s` | Page load |
| Data Cell 5 | `data-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.5s` | Page load |
| Blueprint Grid | `blueprint-reveal` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `1.2s` | `0.5s` | Page load |
| Preservation Badge | `badge-slide-in` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0s` | Scroll into view |
| Inquire Button (hover) | N/A (transition) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.15s` | `0s` | Hover |
| Inquire Button (active) | N/A (transition) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.15s` | `0s` | Click |
| Related Row 1 | `related-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.1s` | Scroll into view |
| Related Row 2 | `related-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.2s` | Scroll into view |
| Related Row 3 | `related-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.6s` | `0.3s` | Scroll into view |
| Related Arrow | N/A (transition) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `0.3s` | `0s` | Row hover |

**Global Easing Variable:**
```css
:root {
  --easing: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 7. Layout Specs

### 7.1 Data Grid Layout

```
+----------------+----------------+----------------+----------------+----------------+
|     YEAR       |   LOCATION     |    STATUS      |     PRICE      |      SIZE      |
|     1960       |  Los Angeles   |   FOR SALE     |  $18,500,000   |   2,200 sq ft  |
+----------------+----------------+----------------+----------------+----------------+

Grid: grid-template-columns: repeat(5, 1fr)
Cell padding: 32px 24px
Cell border: border-right: 1px solid var(--black) (except last)
Outer border: 1px solid var(--black)
Max-width: 1400px
```

### 7.2 Breadcrumb Layout

```
HOMES > CHEMOSPHERE                          USONIAN                    HOMES  ARCHITECTS  ABOUT
[link]   [current - bold]                    [logo]                     [nav links]

Position: sticky top: 0
Padding: 20px 40px
Border-bottom: 1px solid var(--black)
Font-size: 11px
Letter-spacing: 0.15em
```

### 7.3 Related Properties Layout

```
+-------------+---------------------------+----------+------------+-----------+
| [THUMBNAIL] |    Property Name          |   Year   |   Price    |    ->     |
|  200x120    |    Location               |          |            |           |
+-------------+---------------------------+----------+------------+-----------+

Grid: grid-template-columns: 200px 1fr 120px 120px 140px
Gap: 24px
Row padding: 24px 0
Border-bottom: 1px solid rgba(0,0,0,0.1)
```

### 7.4 Story Section Layout (2:1 Grid)

```
+------------------------------------------+--------------------+
|                                          |                    |
|  THE STORY                               |  ARCHITECTURAL     |
|  --------------------------------------- |  STYLE             |
|  |  Story text paragraph 1...           |  Mid-Century Modern|
|  |                                       |                    |
|  |  Story text paragraph 2...           |  CONSTRUCTION      |
|  |                                       |  Steel frame...    |
|  |  Story text paragraph 3...           |                    |
|  |                                       |  LOT SIZE          |
|  |  [PRESERVATION BADGE]                |  0.24 acres        |
|                                          |                    |
+------------------------------------------+--------------------+

Grid: grid-template-columns: 2fr 1fr
Gap: 80px
Story border-left: 4px solid var(--red)
Story padding-left: 40px
```

### 7.5 Responsive Breakpoints

| Breakpoint | Data Grid | Related | Story |
|------------|-----------|---------|-------|
| Desktop (>1024px) | 5 columns | 5-column row | 2:1 grid |
| Tablet (768-1024px) | 3 columns | Stack vertically | 1 column |
| Mobile (<768px) | 2 columns | Stack vertically | 1 column |

---

## 8. Implementation Checklist

- [ ] Add new keyframes to `globals.css` (hero-title-enter, hero-subtitle-enter, data-cascade, badge-slide-in, related-cascade, blueprint-reveal)
- [ ] Add `--easing` CSS variable to `:root`
- [ ] Update `PrairieLines.tsx` for horizontal layout with varied flex values
- [ ] Update `.prairie-lines` CSS for row direction, 3px height, staggered delays
- [ ] Update `.data-grid` CSS for 5-column fixed layout with borders
- [ ] Update `.data-cell` animation to use data-cascade
- [ ] Create `useScrollAnimation` hook
- [ ] Update `PreservationBadge` component with new design
- [ ] Add preservation badge CSS
- [ ] Add inquire section to page.tsx
- [ ] Add inquire button CSS
- [ ] Add blueprint grid overlay to image section
- [ ] Add blueprint CSS
- [ ] Create `RelatedPropertyRow` component
- [ ] Update related properties section layout
- [ ] Add related properties CSS
- [ ] Remove NewsletterCTA from page
- [ ] Remove redundant data displays
- [ ] Update hero meta with divider elements
- [ ] Update breadcrumb font-size to 11px
- [ ] Test all animations with prefers-reduced-motion

---

*"Design is not just what it looks like and feels like. Design is how it works."*
- Steve Jobs
