# Architect Detail Page Specification

**Version:** V2 Alignment
**Date:** February 21, 2026
**Status:** Engineering Ready
**Reviewed By:** Steve Jobs Design Audit

---

## Executive Summary

The production architect detail page has accumulated unnecessary complexity and deviates significantly from the V2 mockup's pure, dramatic vision. **CUT** the 4-column stats grid, PrairieLines component, and NewsletterCTA from this page. **REFINE** the hero typography scale, animation timing, and quote block styling to match V2's bold monospace aesthetic. **ADD** the missing dark stats section with gold numbers, quote border draw animation, and cascading table row entrance effects.

---

## CUT List

**NO CUTS WITHOUT EXPLICIT APPROVAL**

The following elements are preserved:
- PrairieLines component
- Stats grid (all columns)
- NewsletterCTA component
- "BIOGRAPHY" heading
- Portrait in biography section
- Wikipedia "Learn More" section
- Explore More section

Any removal requires direct user approval.

---

## 2. REFINE List

These elements exist but need precise adjustments to match V2.

### 2.1 Hero Name Typography

| Property | Current | V2 Target | File |
|----------|---------|-----------|------|
| font-size | `clamp(3rem, 10vw, 7.5rem)` | `clamp(4rem, 15vw, 10rem)` | `globals.css:91-94` |
| line-height | `0.85` | `0.85` | OK |
| letter-spacing | `-0.04em` | `-0.04em` | OK |

**Production h1 definition needs update:**

```css
/* globals.css - CHANGE */
h1 {
  font-size: clamp(4rem, 15vw, 10rem);  /* was clamp(3rem, 10vw, 7.5rem) */
  line-height: 0.85;
  letter-spacing: -0.04em;
}
```

### 2.2 Hero Name Animation

| Property | Current | V2 Target |
|----------|---------|-----------|
| animation | `fade-up 0.6s ease-out` | `name-stagger-enter 0.6s var(--ease-spring)` with stagger |
| transform | `translateY(20px)` | `translateX(-80px) skewY(-2deg)` |
| first name delay | `0s` | `0.1s` |
| last name delay | `0s` | `0.2s` |

**Add to globals.css:**

```css
/* V2 Spring Easing */
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Hero Name Stagger Animation */
@keyframes name-stagger-enter {
  from {
    opacity: 0;
    transform: translateX(-80px) skewY(-2deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewY(0);
  }
}

.name-line {
  display: block;
  opacity: 0;
}

.name-line:nth-child(1) {
  animation: name-stagger-enter 0.6s var(--ease-spring) 0.1s forwards;
}

.name-line:nth-child(2) {
  animation: name-stagger-enter 0.6s var(--ease-spring) 0.2s forwards;
}
```

### 2.3 Fellowship Badge

| Property | Current | V2 Target |
|----------|---------|-----------|
| background | none (border only) | `var(--gold)` solid fill |
| color | inherit | `var(--black)` |
| padding | `4px 10px` | `8px 16px` |
| border | `1px solid var(--black)` | none |
| icon | StarIcon component | Unicode star `★` inline |

**Update globals.css:**

```css
/* CHANGE fellowship-badge */
.fellowship-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--gold);
  color: var(--black);
  font-size: 11px;
  letter-spacing: 0.1em;
  font-weight: 700;
  border: none;
  opacity: 1;  /* was 0.6 */
}
```

### 2.4 Breadcrumb Separator

| Property | Current | V2 Target |
|----------|---------|-----------|
| separator | `/` | `>` |
| current item color | inherit | `var(--red)` |

**Update page.tsx line 86:**

```tsx
// CHANGE from "/" to ">"
<li className="breadcrumb-separator opacity-40">{">"}</li>
<li className="text-red font-bold">{architect.name.toUpperCase()}</li>
```

### 2.5 Hero Meta Spacing

| Property | Current | V2 Target |
|----------|---------|-----------|
| gap between items | `gap-4` | `gap-8` (32px) |
| separator | `//` | none (use gap only) |
| font-size dates | `text-xs` | `14px` |
| font-size birthplace | `text-xs` | `11px` |

### 2.6 Properties Table Hover State

| Property | Current | V2 Target |
|----------|---------|-----------|
| hover background | `rgba(0,0,0,0.02)` | `rgba(191, 10, 48, 0.04)` (red tint) |

**Update globals.css:**

```css
.property-row:hover {
  background-color: rgba(191, 10, 48, 0.04);  /* was rgba(0,0,0,0.02) */
}
```

### 2.7 Container Max Width

| Property | Current | V2 Target |
|----------|---------|-----------|
| max-width | `1400px` | `1200px` |

**Update globals.css line 131:**

```css
.container {
  max-width: 1200px;  /* was 1400px */
}
```

---

## 3. ADD List

### 3.1 Dark Stats Section

**Location:** After biography section, before properties table
**Background:** `var(--black)`
**Text color:** `var(--white)`

```tsx
{/* Dark Stats Section - ADD after biography */}
<section className="stats-section">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-cell" data-animate="stats">
        <div className="stat-number">{propertyCount}</div>
        <div className="stat-label">PROPERTIES INDEXED</div>
      </div>
      <div className="stat-cell" data-animate="stats">
        <div className="stat-number">{activeYears || "—"}</div>
        <div className="stat-label">ACTIVE YEARS</div>
      </div>
      <div className="stat-cell" data-animate="stats">
        <div className="stat-number">{notableWorks}</div>
        <div className="stat-label">NOTABLE WORKS</div>
      </div>
    </div>
  </div>
</section>
```

**CSS for Dark Stats:**

```css
/* Dark Stats Section */
.stats-section {
  padding: 60px 0;
  background: var(--black);
  color: var(--white);
  border-bottom: 1px solid var(--black);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-cell {
  background: var(--black);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  text-align: center;
  opacity: 0;
  transform: translateX(-30px);
}

.stat-number {
  font-size: 64px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  opacity: 0.4;
}
```

### 3.2 Quote Block with Border Animation

**Location:** Right column of 2-column biography grid
**Feature:** Gold vertical border that draws on scroll

```tsx
{/* Quote Block - ADD in bio section */}
<div className="quote-block">
  <div
    className="quote-border"
    ref={quoteBorderRef}
    style={{ transform: isQuoteVisible ? 'scaleY(1)' : 'scaleY(0)' }}
  />
  <p className="quote-text">
    {architect.quote || "The purpose of architecture is to create an atmosphere in which man can live, work, and enjoy."}
  </p>
  <p className="quote-attribution">- {architect.name.toUpperCase()}</p>
</div>
```

**CSS for Quote Block:**

```css
.quote-block {
  position: relative;
  padding-left: 32px;
}

.quote-border {
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--gold);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s var(--ease-spring);
}

.quote-border.animate {
  transform: scaleY(1);
}

.quote-text {
  font-size: 18px;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 16px;
}

.quote-text::before {
  content: '"';
  color: var(--gold);
  font-size: 48px;
  line-height: 0;
  vertical-align: -0.25em;
  margin-right: 4px;
}

.quote-text::after {
  content: '"';
  color: var(--gold);
  font-size: 48px;
  line-height: 0;
  vertical-align: -0.25em;
  margin-left: 4px;
}

.quote-attribution {
  font-size: 11px;
  letter-spacing: 0.1em;
  opacity: 0.4;
}
```

### 3.3 Hero Image Placeholder

**Location:** Bottom of hero section
**Purpose:** Visual indication that architect portrait is needed

```tsx
{/* Hero Image Placeholder */}
{!portraitUrl && (
  <div className="hero-image-placeholder">
    <div className="hero-image-placeholder-text">ARCHITECT PORTRAIT REQUIRED</div>
    <div className="hero-image-placeholder-subtext">1200 x 800 minimum</div>
  </div>
)}
```

**CSS:**

```css
.hero-image-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border: 3px dashed var(--red);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.hero-image-placeholder-text {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--red);
}

.hero-image-placeholder-subtext {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--black);
  opacity: 0.4;
  margin-top: 8px;
}
```

### 3.4 Cascading Table Row Animation

**Trigger:** Intersection Observer at 20% threshold
**Effect:** Rows slide in from left with stagger

```tsx
// Add to page.tsx as client component or hook
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('[data-animate="table"]').forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

**CSS:**

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

.table-row-animate {
  opacity: 0;
  transform: translateX(-40px);
}

.table-row-animate.animate:nth-child(1) { animation: table-row-cascade 0.5s var(--ease-spring) 0s forwards; }
.table-row-animate.animate:nth-child(2) { animation: table-row-cascade 0.5s var(--ease-spring) 0.1s forwards; }
.table-row-animate.animate:nth-child(3) { animation: table-row-cascade 0.5s var(--ease-spring) 0.2s forwards; }
.table-row-animate.animate:nth-child(4) { animation: table-row-cascade 0.5s var(--ease-spring) 0.3s forwards; }
.table-row-animate.animate:nth-child(5) { animation: table-row-cascade 0.5s var(--ease-spring) 0.4s forwards; }
.table-row-animate.animate:nth-child(6) { animation: table-row-cascade 0.5s var(--ease-spring) 0.5s forwards; }
```

### 3.5 Stats Cascade Animation

**Trigger:** Intersection Observer when stats section enters viewport
**Effect:** 3 stat cells slide in from left with 100ms stagger

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

.stat-cell.animate:nth-child(1) { animation: stats-cascade 0.6s var(--ease-spring) 0s forwards; }
.stat-cell.animate:nth-child(2) { animation: stats-cascade 0.6s var(--ease-spring) 0.1s forwards; }
.stat-cell.animate:nth-child(3) { animation: stats-cascade 0.6s var(--ease-spring) 0.2s forwards; }
```

### 3.6 Explore More CTA (Simplified)

**Replace** the current gray explore section with V2's centered black-button CTA.

```tsx
{/* Explore More CTA */}
<section className="explore-section">
  <div className="container">
    <div className="explore-title">DISCOVER MORE</div>
    <h2 className="explore-heading">
      Explore the Masters of<br />Mid-Century Design
    </h2>
    <Link href="/architects" className="btn-primary">
      BROWSE ALL ARCHITECTS
    </Link>
  </div>
</section>
```

**CSS:**

```css
.explore-section {
  padding: 100px 0;
  border-bottom: 1px solid var(--black);
  text-align: center;
}

.explore-title {
  font-size: 11px;
  letter-spacing: 0.1em;
  opacity: 0.4;
  margin-bottom: 24px;
}

.explore-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
  line-height: 1.1;
}

.btn-primary {
  display: inline-block;
  padding: 16px 48px;
  background: var(--black);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s var(--ease-spring);
}

.btn-primary:hover {
  background: var(--red);
}

.btn-primary:active {
  transform: scaleX(0.95);
}
```

---

## 4. Component Mapping

| V2 Mockup Section | Production Component | File | Action |
|-------------------|---------------------|------|--------|
| Header w/ breadcrumb | Inline nav element | `page.tsx:79-89` | REFINE separator to `>`, add red current color |
| Hero stacked name | Inline h1 | `page.tsx:100-103` | REFINE animation, ADD name-line classes |
| Hero meta (dates/birthplace/fellowship) | Inline divs | `page.tsx:106-116` | REFINE spacing, styling |
| Hero fellowship badge | StarIcon + badge | `page.tsx:92-97` | REFINE to gold background |
| Hero image placeholder | None | - | ADD when no portrait |
| Bio 2-column grid | 3-column grid | `page.tsx:153` | REFINE to 2-column |
| Quote block w/ border anim | accent-border div | `page.tsx:168-171` | REFINE styling, ADD border animation |
| Dark stats section | data-grid white | `page.tsx:125-148` | REPLACE with dark 3-column |
| Properties table | property-row grid | `page.tsx:196-257` | ADD cascade animation |
| Explore CTA | flex layout | `page.tsx:261-279` | REPLACE with centered design |
| PrairieLines | PrairieLines component | `page.tsx:120-123` | CUT |
| Newsletter CTA | NewsletterCTA | `page.tsx:281-282` | CUT |

---

## 5. Animation Specs

| Element | Keyframe Name | Easing | Duration | Delay | Trigger |
|---------|---------------|--------|----------|-------|---------|
| First name | `name-stagger-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 100ms | Page load |
| Last name | `name-stagger-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 200ms | Page load |
| Hero dates | `hero-meta-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 500ms | Page load |
| Hero birthplace | `hero-meta-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 500ms | Page load |
| Fellowship badge | `badge-enter` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 600ms | Page load |
| Quote border | `quote-border-draw` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 800ms | 0ms | Scroll into view (20%) |
| Stat cell 1 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 0ms | Scroll into view (20%) |
| Stat cell 2 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 100ms | Scroll into view (20%) |
| Stat cell 3 | `stats-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 600ms | 200ms | Scroll into view (20%) |
| Table row 1 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 0ms | Scroll into view (20%) |
| Table row 2 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 100ms | Scroll into view (20%) |
| Table row 3 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 200ms | Scroll into view (20%) |
| Table row 4 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 300ms | Scroll into view (20%) |
| Table row 5 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 400ms | Scroll into view (20%) |
| Table row 6 | `table-row-cascade` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 500ms | 500ms | Scroll into view (20%) |
| Primary button | inline `transform` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 300ms | - | On hover |
| Primary button press | inline `transform` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 200ms | - | On mousedown |

### Keyframe Definitions

```css
@keyframes name-stagger-enter {
  from { opacity: 0; transform: translateX(-80px) skewY(-2deg); }
  to { opacity: 1; transform: translateX(0) skewY(0); }
}

@keyframes hero-meta-enter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 0.6; transform: translateY(0); }
}

@keyframes badge-enter {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes quote-border-draw {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes stats-cascade {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes table-row-cascade {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

## 6. Layout Specs

### 6.1 Hero Section

```
+------------------------------------------------------------------+
| ARCHITECTS > LAUTNER (breadcrumb, 11px, red current)             |
+------------------------------------------------------------------+
| [★ TALIESIN FELLOW badge - gold bg, black text]                  |
|                                                                   |
| JOHN                        (first name: 10rem, black)           |
| LAUTNER                     (last name: 10rem, red)              |
|                                                                   |
| 1911 - 1994    MARQUETTE, MICHIGAN    [★ TALIESIN FELLOW badge]  |
| (14px, 0.6op)  (11px, 0.6op)          (gold bg)                  |
|                                                                   |
| +--------------------------------------------------------------+ |
| |                                                              | |
| |          [ARCHITECT PORTRAIT - or dashed placeholder]        | |
| |                  1200 x 800 minimum                          | |
| |                                                              | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**CSS Values:**
- Hero padding: `100px 0 80px`
- Hero min-height: `60vh`
- Container max-width: `1200px`
- Container padding: `0 40px`
- Name margin-bottom: `40px`
- Meta gap: `32px`

### 6.2 Bio Section (2-Column)

```
+------------------------------------------------------------------+
| BIOGRAPHY (11px, 0.4 opacity, letter-spacing: 0.1em)             |
+------------------------------------------------------------------+
| [BIO TEXT]                        | [QUOTE BLOCK]                |
|                                   |                              |
| John Lautner was an American      | | "The purpose of           |
| architect known for his           | |  architecture is to       |
| innovative and futuristic         | |  create an atmosphere     |
| designs...                        | |  in which man can live,   |
|                                   | |  work, and enjoy."        |
| (14px, line-height 1.8, 0.6 op)   | |                           |
|                                   | | - JOHN LAUTNER            |
|                                   | | (11px, 0.4 opacity)       |
|                                   |                              |
| [1fr]                             | [1fr]                        |
+------------------------------------------------------------------+
```

**CSS Values:**
- Section padding: `80px 0`
- Grid gap: `60px`
- Grid columns: `1fr 1fr`
- Bio text font-size: `14px`
- Bio text line-height: `1.8`
- Bio text opacity: `0.6`
- Quote padding-left: `32px`
- Quote border width: `3px`
- Quote text font-size: `18px`
- Quote marks font-size: `48px`
- Quote marks color: `var(--gold)`

### 6.3 Dark Stats Section

```
+==================================================================+
|                    BLACK BACKGROUND                              |
+------------------------------------------------------------------+
| +------------------+------------------+------------------+        |
| |       31         |       55         |        4        |        |
| | (64px, gold)     | (64px, gold)     | (64px, gold)    |        |
| |                  |                  |                  |        |
| | PROPERTIES       | ACTIVE YEARS     | NOTABLE WORKS   |        |
| | INDEXED          |                  |                  |        |
| | (11px, 0.4 op)   | (11px, 0.4 op)   | (11px, 0.4 op)  |        |
| +------------------+------------------+------------------+        |
+==================================================================+
```

**CSS Values:**
- Section padding: `60px 0`
- Background: `var(--black)`
- Grid columns: `repeat(3, 1fr)`
- Grid gap: `2px`
- Cell padding: `40px`
- Cell border: `1px solid rgba(255,255,255,0.1)`
- Number font-size: `64px`
- Number color: `var(--gold)`
- Label font-size: `11px`
- Label letter-spacing: `0.1em`
- Label opacity: `0.4`

### 6.4 Properties Table

```
+------------------------------------------------------------------+
| INDEXED PROPERTIES (11px, 0.4 opacity)                           |
+------------------------------------------------------------------+
| PROPERTY      | YEAR | LOCATION    | STATUS     | PRICE          |
| (2fr)         | 80px | 140px       | 100px      | 140px          |
+------------------------------------------------------------------+
| ★ Chemosphere | 1960 | Los Angeles | [FOR SALE] | $18,500,000    |
| ★ Silvertop   | 1963 | Los Angeles | [SOLD]     | -              |
| ★ Elrod House | 1968 | Palm Springs| [MUSEUM]   | -              |
| ★ Sheats-Gold | 1963 | Los Angeles | [MUSEUM]   | -              |
|   Garcia House| 1962 | Los Angeles | [FOR SALE] | $4,900,000     |
|   Wolff House | 1961 | Los Angeles | [SOLD]     | -              |
+------------------------------------------------------------------+
```

**CSS Values:**
- Section padding: `80px 0`
- Table border: `1px solid var(--black)`
- Header border-bottom: `2px solid var(--black)`
- Header padding: `16px 20px`
- Header font-size: `11px`
- Row padding: `20px`
- Row border-bottom: `1px solid rgba(0,0,0,0.1)`
- Row font-size: `12px`
- Row hover bg: `rgba(191, 10, 48, 0.04)`
- Star color: `var(--gold)`
- Price color (active): `var(--red)`

### 6.5 Explore CTA

```
+------------------------------------------------------------------+
|                          CENTERED                                |
|                                                                   |
|                       DISCOVER MORE                              |
|                    (11px, 0.4 opacity)                           |
|                                                                   |
|                  Explore the Masters of                          |
|                   Mid-Century Design                             |
|              (clamp 2rem-3.5rem, bold)                           |
|                                                                   |
|                 [BROWSE ALL ARCHITECTS]                          |
|                   (black bg, white text)                         |
|                   (hover: red bg)                                |
|                                                                   |
+------------------------------------------------------------------+
```

**CSS Values:**
- Section padding: `100px 0`
- Text-align: `center`
- Title font-size: `11px`
- Title opacity: `0.4`
- Title margin-bottom: `24px`
- Heading font-size: `clamp(2rem, 5vw, 3.5rem)`
- Heading margin-bottom: `40px`
- Button padding: `16px 48px`
- Button font-size: `11px`
- Button bg: `var(--black)`
- Button hover bg: `var(--red)`

---

## 7. Implementation Priority

### Phase 1: CUT (30 min)
1. Remove PrairieLines import and usage
2. Remove NewsletterCTA import and usage
3. Remove 4-column stats grid section
4. Remove Wikipedia section

### Phase 2: REFINE (1 hour)
1. Update h1 typography scale in globals.css
2. Add --ease-spring CSS variable
3. Update fellowship badge styling
4. Update breadcrumb separator and current color
5. Update container max-width
6. Update property row hover color

### Phase 3: ADD (2 hours)
1. Add name-stagger-enter animation and .name-line classes
2. Add hero-meta-enter and badge-enter animations
3. Restructure hero for V2 layout
4. Add 2-column bio grid with quote block
5. Add quote-border-draw animation with Intersection Observer
6. Add dark stats section with stats-cascade animation
7. Add table-row-cascade animation with Intersection Observer
8. Replace explore section with V2 centered CTA
9. Add hero image placeholder for architects without portraits

### Phase 4: POLISH (30 min)
1. Test all animations with prefers-reduced-motion
2. Verify mobile responsive breakpoints
3. Cross-browser testing
4. Lighthouse performance check

---

## 8. Files to Modify

| File | Changes |
|------|---------|
| `src/app/architects/[slug]/page.tsx` | Major restructure - CUT sections, ADD new sections, REFINE markup |
| `src/app/globals.css` | ADD animations, REFINE values, ADD new component styles |
| `src/components/ui/QuoteBlock.tsx` | CREATE new component with border animation |
| `src/components/ui/StatsSection.tsx` | CREATE dark stats section component |
| `src/components/ui/ExploreCTA.tsx` | CREATE centered CTA component |
| `src/hooks/useScrollAnimation.ts` | CREATE Intersection Observer hook for animations |

---

**End of Specification**

*"Design is not just what it looks like and feels like. Design is how it works."*
*This page should work like a symphony - each element entering at precisely the right moment, creating an experience that feels inevitable.*
