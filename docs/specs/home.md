# HOMEPAGE SPECIFICATION: V2 ALIGNMENT AUDIT

**Author:** Steve Jobs Methodology Audit
**Date:** 2025-02-21
**Files Analyzed:**
- Mockup: `/public/mockups/v2-home.html`
- Production: `/src/app/page.tsx`, `/src/app/HomeClient.tsx`
- Components: `NewsletterCTA.tsx`, `PrairieLines.tsx`, `PropertyFilters.tsx`, `Badge.tsx`, `Header.tsx`
- Styles: `/src/app/globals.css`

---

## 1. EXECUTIVE SUMMARY

**The production homepage is overengineered with complexity that dilutes the V2 mockup's surgical precision.** The V2 design delivers a cinematic, scroll-driven experience with six distinct sections; production fragments this into 9+ micro-sections with unnecessary filter UI that competes with content. The animations exist but lack the V2's specific timings and easing; the typography hierarchy is muddied by inconsistent opacity values. Production must be stripped to essentials, animations must match exact V2 keyframes, and the architect index must be elevated to its intended black-background prominence.

---

## 2. CUT LIST

**NO CUTS WITHOUT EXPLICIT APPROVAL**

The following elements are preserved:
- PrairieLines component
- Newsletter CTA
- Terminal styling ("> USONIAN", cursor, SYS.ACTIVE)
- All existing navigation and filtering
- StarIcon indicators
- All badge styles

Any removal requires direct user approval.

---

## 3. REFINE LIST

Elements that exist but need adjustment to match V2 specifications.

### 3.1 Hero Section

| Property | Current (Production) | Target (V2) | File:Line |
|----------|---------------------|-------------|-----------|
| Hero padding-top | `py-16 md:py-24` (64px/96px) | `120px` fixed | `page.tsx:65` |
| Hero min-height | Not set | `min-height: 100vh` | `page.tsx:64` |
| Title animation | `animate-fade-up` (translateY) | `translateX(-60px) skewY(-2deg)` | `page.tsx:67` |
| Title line-height | `line-height: 0.85` | `line-height: 1.0` | `globals.css:91-94` |
| Subtitle delay | `animate-delay-1` (0.1s) | `0.3s delay` | `page.tsx:74` |
| Subtitle color | `opacity-50` black | `color: var(--navy)` full opacity | `page.tsx:74` |
| Subtitle letter-spacing | `tracking-[0.15em]` | `tracking-[0.1em]` | `page.tsx:74` |

**CSS Changes for Hero:**
```css
/* globals.css - Add new keyframe */
@keyframes hero-title-enter {
  0% {
    transform: translateX(-60px) skewY(-2deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) skewY(0);
    opacity: 1;
  }
}

.animate-hero-enter {
  animation: hero-title-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### 3.2 Featured Properties Cards

| Property | Current | Target (V2) | File:Line |
|----------|---------|-------------|-----------|
| Card padding | `p-4` (16px) | `padding: 24px` | `HomeClient.tsx:120` |
| Card hover transform | `translateY(-4px)` | `translateX(6px) translateY(-6px)` | `globals.css:466-467` |
| Card hover shadow | `8px 8px 0 black` | `-6px 6px 0 black` (offset left) | `globals.css:468` |
| Card active state | None | `transform: translateX(3px) translateY(-3px)` | Missing |
| Image height | `h-[200px]` | `height: 200px` (same, OK) | `HomeClient.tsx:108` |
| Property name size | `text-sm` (14px) | `font-size: 18px` | `HomeClient.tsx:121` |
| Architect name case | `uppercase` | `normal case` (not uppercase) | `HomeClient.tsx:124` |
| Price color | conditional red | Always `color: var(--red)` | `HomeClient.tsx:129` |

**CSS Changes for Cards:**
```css
/* globals.css - Update card-hover */
.card-hover {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-hover:hover {
  transform: translateX(6px) translateY(-6px);
  box-shadow: -6px 6px 0 var(--black);
}

.card-hover:active {
  transform: translateX(3px) translateY(-3px);
  transition: transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 3.3 Properties Table

| Property | Current | Target (V2) | File:Line |
|----------|---------|-------------|-----------|
| Section title | Inline with star icon | Clean uppercase, no icon | `HomeClient.tsx:151-158` |
| Row hover background | `rgba(0,0,0,0.02)` | Same (OK) | `globals.css:563-564` |
| Status display | Badge component | Dot indicator + text | `HomeClient.tsx:223-225` |
| Row animation | `animate-fade-up` | `translateX(-40px)` cascade | Missing |
| Header border | `border-b-2` | `border-bottom: 2px solid black` (same, OK) | `HomeClient.tsx:170` |

**CSS Changes for Table:**
```css
/* globals.css - Add table row cascade */
@keyframes table-row-cascade {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.table-row-cascade {
  animation: table-row-cascade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.table-row-cascade:nth-child(1) { animation-delay: 0s; }
.table-row-cascade:nth-child(2) { animation-delay: 0.1s; }
.table-row-cascade:nth-child(3) { animation-delay: 0.1s; }
.table-row-cascade:nth-child(4) { animation-delay: 0.3s; }
```

### 3.4 Newsletter Section

| Property | Current | Target (V2) | File:Line |
|----------|---------|-------------|-----------|
| Background | `var(--navy)` solid | `linear-gradient(135deg, navy 0%, black 100%)` | `globals.css:609-610` |
| Layout | Two-column grid | Single centered column | `NewsletterCTA.tsx:58` |
| Title size | `0.6875rem` (11px) | `32px` (font-size-2xl) | `globals.css:616` |
| Title color | `var(--gold)` | `var(--white)` | `globals.css:619` |
| Input border | `1px solid rgba(255,255,255,0.3)` | `2px solid rgba(255,255,255,0.3)` | `globals.css:630` |
| Button background | `var(--gold)` | `var(--red)` | `globals.css:651` |
| Button hover | `var(--white)` | `#9A0826` (darker red) | `globals.css:658` |
| Form max-width | None (full column) | `max-width: 500px` centered | Missing |
| Text alignment | Left | Center | `NewsletterCTA.tsx:56` |

**CSS Changes for Newsletter:**
```css
/* globals.css - Update CTA section */
.cta-section {
  background: linear-gradient(135deg, var(--navy) 0%, var(--black) 100%);
  color: var(--white);
  padding: 5rem 2.5rem;
  text-align: center;
}

.cta-heading {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: none;
  color: var(--white);
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.6;
  margin-bottom: 3rem;
}

.cta-form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.cta-input {
  flex: 1;
  padding: 1rem 1.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--white);
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-input:focus {
  border-color: var(--gold);
}

.cta-btn {
  padding: 1rem 2rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--red);
  border: none;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-btn:hover {
  background: #9A0826;
}

.cta-btn:active {
  transform: scaleX(0.98) scaleY(1.02);
  transition: transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 3.5 Header Navigation

| Property | Current | Target (V2) | File:Line |
|----------|---------|-------------|-----------|
| Header position | `sticky top-0` | `position: fixed` | `Header.tsx:14` |
| Header border | `border-b border-black` | `border-bottom: 1px solid rgba(0,0,0,0.1)` | `Header.tsx:14` |
| Logo size | `text-xs` (12px) | `font-size: 20px` | `Header.tsx:19` |
| Logo prefix | `> ` terminal style | None | `Header.tsx:20` |
| Nav link size | `text-[11px]` | `font-size: 12px` | `Header.tsx:28` |
| Nav link underline | None | Animated red underline on hover | Missing |
| Nav gap | `gap-10` (40px) | `gap: 40px` (same, OK) | `Header.tsx:25` |

**CSS for Nav Link Underline:**
```css
/* globals.css - Add nav link underline animation */
.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--red);
  transition: width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-link:hover::after {
  width: 100%;
}
```

---

## 4. ADD LIST

Features in V2 mockup that are completely missing from production.

### 4.1 Architect Index Section (Black Background)

**V2 Spec:** Full-width black section with white text, gold accents. Displays all architects as inline tags with counts.

**Current State:** Production has a light-background architect bar that conflicts with V2 vision.

**Implementation:**

```tsx
// New component: /src/components/home/ArchitectIndex.tsx
interface ArchitectIndexProps {
  architects: Array<{
    id: string;
    name: string;
    slug: string;
    property_count: number;
  }>;
}

export function ArchitectIndex({ architects }: ArchitectIndexProps) {
  return (
    <section className="architect-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">ARCHITECT INDEX</h2>
          <span className="section-count">{architects.length} ARCHITECTS</span>
        </div>
        <div className="architect-tags">
          {architects.map((architect) => (
            <Link
              key={architect.id}
              href={`/architects/${architect.slug}`}
              className="architect-tag"
            >
              {architect.name}
              <span className="tag-count">({architect.property_count})</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**CSS:**
```css
/* globals.css - Architect Index Section */
.architect-section {
  padding: 5rem 3rem;
  background: var(--black);
  color: var(--white);
}

.architect-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.architect-section .section-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--white);
}

.architect-section .section-count {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--gold);
  opacity: 0.6;
}

.architect-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.architect-tag {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--white);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  cursor: pointer;
  transition: color 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.architect-tag::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.architect-tag:hover {
  color: var(--gold);
}

.architect-tag:hover::after {
  width: 100%;
}

.architect-tag .tag-count {
  font-size: 0.6875rem;
  opacity: 0.6;
  margin-left: 6px;
}
```

### 4.2 Status Dot Indicator (For Sale Table)

**V2 Spec:** Colored dots indicating status instead of badges.

```tsx
// New component: /src/components/ui/StatusDot.tsx
interface StatusDotProps {
  status: 'active' | 'pending' | 'sold' | 'off-market';
}

export function StatusDot({ status }: StatusDotProps) {
  const getColor = () => {
    switch (status) {
      case 'active': return 'bg-[#22C55E]'; // Green
      case 'pending': return 'bg-gold';
      case 'sold':
      case 'off-market': return 'bg-red';
      default: return 'bg-red';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'active': return 'Available';
      case 'pending': return 'Pending';
      case 'sold': return 'Sold';
      case 'off-market': return 'Off Market';
      default: return status;
    }
  };

  return (
    <div className="status-cell">
      <span className={`status-dot ${getColor()}`} />
      <span>{getLabel()}</span>
    </div>
  );
}
```

**CSS:**
```css
/* globals.css - Status Dot */
.status-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

### 4.3 Section Headers with Count Badge

**V2 Spec:** Each section has a header with title + count in consistent format.

```tsx
// New component: /src/components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  title: string;
  count: number;
  countLabel?: string;
}

export function SectionHeader({ title, count, countLabel = 'LISTINGS' }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <span className="section-count">
        {String(count).padStart(2, '0')} {countLabel}
      </span>
    </div>
  );
}
```

**CSS:**
```css
/* globals.css - Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--black);
}

.section-count {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--navy);
  opacity: 0.6;
}
```

### 4.4 Footer (V2 Specification)

**V2 Spec:** Black background, three-column layout (logo, links, copyright).

**Current State:** Footer exists in `/src/components/layout/Footer.tsx` but needs verification against V2.

**CSS Refinement:**
```css
/* globals.css - Footer per V2 */
.site-footer {
  padding: 3rem;
  background: var(--black);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--white);
  text-decoration: none;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.footer-link:hover {
  opacity: 1;
}

.footer-copy {
  font-size: 0.6875rem;
  opacity: 0.4;
}
```

---

## 5. COMPONENT MAPPING

| V2 Mockup Section | Line Range | Production Component | File | Action |
|-------------------|------------|---------------------|------|--------|
| Header | 597-603 | `Header.tsx` | `/src/components/layout/Header.tsx` | REFINE - Remove terminal style, add nav underlines |
| Hero | 605-613 | `page.tsx` hero section | `/src/app/page.tsx:63-83` | REFINE - Add hero-title-enter animation, remove PrairieLines |
| Featured Properties | 615-653 | `HomeClient.tsx` featured section | `/src/app/HomeClient.tsx:90-144` | REFINE - Update card styles, remove badges |
| Architect Index | 655-675 | Missing (light bar exists) | N/A | ADD - Create ArchitectIndex component |
| For Sale Table | 677-724 | `HomeClient.tsx` table section | `/src/app/HomeClient.tsx:146-249` | REFINE - Add status dots, cascade animation |
| Newsletter CTA | 726-734 | `NewsletterCTA.tsx` | `/src/components/ui/NewsletterCTA.tsx` | REFINE - Single column, red button |
| Footer | 736-745 | `Footer.tsx` | `/src/components/layout/Footer.tsx` | VERIFY - Match V2 layout |

---

## 6. ANIMATION SPECS

| Element | Keyframe Name | Easing | Duration | Delay | Trigger |
|---------|--------------|--------|----------|-------|---------|
| Hero Title | `hero-title-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 0ms | Page load |
| Hero Subtitle | `hero-title-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 300ms | Page load |
| Property Card 1 | `badge-slide-in` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 0ms | In viewport |
| Property Card 2 | `badge-slide-in` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 100ms | In viewport |
| Property Card 3 | `badge-slide-in` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 200ms | In viewport |
| Table Row 1 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 0ms | In viewport |
| Table Row 2 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 100ms | In viewport |
| Table Row 3 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 200ms | In viewport |
| Table Row 4 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 300ms | In viewport |
| Nav Link Underline | width transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 200ms | 0ms | Hover |
| Architect Tag Underline | width transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 200ms | 0ms | Hover |
| Card Hover | transform/shadow | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 200ms | 0ms | Hover |
| Card Active | transform | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 80ms | 0ms | Click |
| Button Active | scaleX/scaleY | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 80ms | 0ms | Click |

### Keyframe Definitions

```css
/* V2 Animation Variables */
:root {
  --easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-entrance: 0.6s;
  --duration-hover: 0.2s;
  --duration-click: 0.08s;
}

/* Hero Title Entrance */
@keyframes hero-title-enter {
  0% {
    transform: translateX(-60px) skewY(-2deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) skewY(0);
    opacity: 1;
  }
}

/* Badge/Card Slide In */
@keyframes badge-slide-in {
  0% {
    transform: translateX(-12px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Table Row Cascade */
@keyframes table-row-cascade {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## 7. CSS CLASS CHANGES

### Classes to Add

```css
/* ============================================
   V2 HERO STYLES
   ============================================ */

.hero-v2 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 3rem 5rem;
}

.hero-title-v2 {
  font-size: clamp(48px, 10vw, 120px);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--black);
  animation: hero-title-enter 0.6s var(--easing) forwards;
}

.hero-title-v2 span {
  display: block;
}

.hero-subtitle-v2 {
  margin-top: 2rem;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--navy);
  opacity: 0;
  animation: hero-title-enter 0.6s var(--easing) 0.3s forwards;
}

/* ============================================
   V2 FEATURED PROPERTIES
   ============================================ */

.property-grid-v2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .property-grid-v2 {
    grid-template-columns: 1fr;
  }
}

.property-card-v2 {
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s var(--easing);
  animation: badge-slide-in 0.6s var(--easing) forwards;
  opacity: 0;
}

.property-card-v2:nth-child(1) { animation-delay: 0s; }
.property-card-v2:nth-child(2) { animation-delay: 0.1s; }
.property-card-v2:nth-child(3) { animation-delay: 0.2s; }

.property-card-v2:hover {
  transform: translateX(6px) translateY(-6px);
  box-shadow: -6px 6px 0 var(--black);
}

.property-card-v2:active {
  transform: translateX(3px) translateY(-3px);
  transition: transform 0.08s var(--easing);
}

.property-image-v2 {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--black) 100%);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
}

.property-name-v2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--black);
}

.property-meta-v2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.property-architect-v2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--navy);
}

.property-year-v2 {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--black);
  opacity: 0.6;
}

.property-location-v2 {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--black);
  opacity: 0.6;
}

.property-price-v2 {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--red);
}

/* ============================================
   V2 FOR SALE TABLE
   ============================================ */

.sale-table-v2 {
  width: 100%;
  border-collapse: collapse;
  margin-top: 3rem;
}

.sale-table-v2 thead {
  border-bottom: 2px solid var(--black);
}

.sale-table-v2 th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: left;
  padding: 1rem 0;
  color: var(--black);
}

.sale-table-v2 tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  animation: table-row-cascade 0.6s var(--easing) forwards;
  opacity: 0;
  transition: background 0.2s var(--easing);
}

.sale-table-v2 tbody tr:hover {
  background: rgba(0, 0, 0, 0.02);
}

.sale-table-v2 tbody tr:nth-child(1) { animation-delay: 0s; }
.sale-table-v2 tbody tr:nth-child(2) { animation-delay: 0.1s; }
.sale-table-v2 tbody tr:nth-child(3) { animation-delay: 0.2s; }
.sale-table-v2 tbody tr:nth-child(4) { animation-delay: 0.3s; }

.sale-table-v2 td {
  padding: 1.25rem 0;
  font-size: 0.875rem;
  vertical-align: middle;
}

.sale-table-v2 .property-cell {
  font-weight: 500;
}

.sale-table-v2 .year-cell {
  font-weight: 400;
  opacity: 0.6;
}

.sale-table-v2 .price-cell {
  font-weight: 600;
  color: var(--navy);
}

/* ============================================
   V2 NEWSLETTER CTA
   ============================================ */

.newsletter-v2 {
  padding: 5rem 3rem;
  background: linear-gradient(135deg, var(--navy) 0%, var(--black) 100%);
  color: var(--white);
  text-align: center;
}

.newsletter-title-v2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.newsletter-subtitle-v2 {
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.6;
  margin-bottom: 3rem;
}

.newsletter-form-v2 {
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input-v2 {
  flex: 1;
  padding: 1rem 1.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--white);
  outline: none;
  transition: border-color 0.2s var(--easing);
}

.newsletter-input-v2::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.newsletter-input-v2:focus {
  border-color: var(--gold);
}

.newsletter-button-v2 {
  padding: 1rem 2rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--red);
  color: var(--white);
  border: none;
  cursor: pointer;
  transition: all 0.2s var(--easing);
}

.newsletter-button-v2:hover {
  background: #9A0826;
}

.newsletter-button-v2:active {
  transform: scaleX(0.98) scaleY(1.02);
  transition: transform 0.08s var(--easing);
}

@media (max-width: 768px) {
  .newsletter-form-v2 {
    flex-direction: column;
  }
}
```

### Classes to Modify

| Class | Current Value | New Value |
|-------|--------------|-----------|
| `.card-hover:hover transform` | `translateY(-4px)` | `translateX(6px) translateY(-6px)` |
| `.card-hover:hover box-shadow` | `8px 8px 0 var(--black)` | `-6px 6px 0 var(--black)` |
| `.cta-section background` | `var(--navy)` | `linear-gradient(135deg, var(--navy) 0%, var(--black) 100%)` |
| `.cta-btn background` | `var(--gold)` | `var(--red)` |
| `.cta-btn:hover background` | `var(--white)` | `#9A0826` |
| `h1 line-height` | `0.85` | `1.0` |

### Classes to Remove

| Class | File | Reason |
|-------|------|--------|
| `.prairie-lines` usage | `page.tsx` | V2 hero has no decorative lines |
| `.grid-overlay` | `layout.tsx` | V2 has no grid overlay |
| `.cursor` usage | `HomeClient.tsx` | V2 has no terminal cursor in content |

---

## 8. IMPLEMENTATION PRIORITY

1. **Phase 1: CUT** (30 min)
   - Remove grid overlay from layout
   - Remove PrairieLines from hero
   - Remove terminal cursor from pagination
   - Remove SYS.ACTIVE from header
   - Remove StarIcon from homepage

2. **Phase 2: ADD** (2 hours)
   - Create ArchitectIndex component
   - Create StatusDot component
   - Create SectionHeader component
   - Add V2 CSS variables and keyframes

3. **Phase 3: REFINE** (2 hours)
   - Update hero animation to hero-title-enter
   - Update card hover/active states
   - Refactor NewsletterCTA to single column
   - Add nav link underline animations
   - Update table row animations

4. **Phase 4: VERIFY** (30 min)
   - Test all animations at 60fps
   - Verify responsive breakpoints
   - Check accessibility (focus states, reduced motion)
   - Compare side-by-side with V2 mockup

---

**"Design is not just what it looks like and feels like. Design is how it works."**

The V2 mockup works. Production has lost that purity. Strip it back. Ship it clean.
