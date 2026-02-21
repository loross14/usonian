# FLW V2 Style Specification

## Overview

This document defines the V2 visual style for the Frank Lloyd Wright (FLW) Michigan Architecture Icon Collection. It serves as the authoritative reference for generating consistent images across all asset types (houses, architects, and future assets).

The V2 style represents a refined evolution from V1, emphasizing **geometric abstraction** over literal representation, with a cohesive color palette and consistent visual grammar.

---

## Core Design Principles

### 1. Abstraction Over Literalism
- Capture architectural **essence** through simplified geometric forms
- Communicate the building's "soul", not its blueprint
- Avoid detailed miniature illustrations
- Each icon should be recognizable at 60px

### 2. Geometric Purity
- Honor Wright's design language: **hexagons, triangles, bold horizontal lines**
- Let geometry tell the story of each structure
- Use clean, mathematical shapes (rectangles, polygons, circles, ellipses)
- Avoid freeform organic shapes unless architecturally significant

### 3. Chromatic Restraint
- **Maximum 5 colors per icon** from the unified palette
- No muddy "realistic" tones
- Every color is intentionally designed and harmonious
- Maintain consistency across the entire collection

### 4. Bold Hierarchies
- **One signature element per structure dominates**
- Clear focal point at any size
- Examples:
  - Triangular wings (Palmer House)
  - Block grid patterns (Turkel House)
  - Hexagonal patterns (Snowflake/Wall House)
  - Curved dramatic rooflines (Lautner-style)

### 5. Generous Negative Space
- White background is **active, not empty**
- Icons "breathe" with intention
- Forms float with purpose
- Readability at 60px is non-negotiable

### 6. Consistent Visual Grammar
- Shared grid structure across all icons
- Consistent color relationships
- Unified rendering style
- Any icon must instantly belong to the set

---

## Color Palette

### Primary Colors (Exact RGB Values)

| Color Name | RGB Value | Hex | Usage |
|------------|-----------|-----|-------|
| **Terracotta** | `rgb(194, 114, 84)` | `#C27254` | Primary accent, signature elements, roof highlights |
| **Terracotta Dark** | `rgb(156, 88, 64)` | `#9C5840` | Darker accent variation |
| **Sand** | `rgb(232, 218, 195)` | `#E8DAC3` | Main structure bodies, light fills |
| **Sand Dark** | `rgb(205, 188, 162)` | `#CDBCA2` | Structure variations, ground planes |
| **Slate** | `rgb(82, 90, 100)` | `#525A64` | Roof elements, structural accents |
| **Slate Light** | `rgb(140, 155, 175)` | `#8C9BAF` | Secondary elements, hillsides, pools |
| **Cypress** | `rgb(168, 132, 98)` | `#A88462` | Main structure fills, roof gradients |
| **Cypress Dark** | `rgb(138, 105, 75)` | `#8A694B` | Darker structure variations |
| **Mahogany** | `rgb(120, 72, 56)` | `#784838` | Dark wood accents, roof gradients |
| **Gold** | `rgb(212, 178, 112)` | `#D4B270` | Windows, glass elements (with opacity) |
| **Sky** | `rgb(195, 215, 232)` | `#C3D7E8` | Water features, pools |
| **Charcoal** | `rgb(55, 52, 50)` | `#373432` | Outlines, structural lines, dark accents |
| **Warm White** | `rgb(252, 250, 247)` | `#FCFAF7` | Main body fills for modern structures |

### Color Usage Guidelines

- **Background**: Always pure white (`#FFFFFF` or `white`)
- **Windows/Glass**: Use Gold `rgb(212, 178, 112)` with `opacity="0.5"` to `opacity="0.8"`
- **Structural lines**: Always Charcoal `rgb(55, 52, 50)`
- **Ground planes**: Sand or Cypress colors with `opacity="0.3"` to `opacity="0.5"`
- **Accent elements**: Use `.accent` class for animated elements

---

## Line Weights & Stroke Specifications

### Standard Stroke Widths

| Purpose | Stroke Width | Usage |
|---------|-------------|-------|
| **Thin structural lines** | `1px` | Window mullions, subtle divisions |
| **Standard outlines** | `2px` | Primary structural outlines, window frames |
| **Bold accents** | `3px` | Roof edge lines, signature structural lines |
| **Heavy structural** | `4px` | Support columns, major vertical elements |

### Stroke Guidelines

```svg
<!-- Thin mullions -->
<line stroke="rgb(55, 52, 50)" stroke-width="1"/>

<!-- Standard structure -->
<line stroke="rgb(55, 52, 50)" stroke-width="2"/>

<!-- Bold roof edges -->
<line stroke="rgb(55, 52, 50)" stroke-width="3" class="line-draw"/>

<!-- Heavy supports -->
<line stroke="rgb(55, 52, 50)" stroke-width="4"/>
```

---

## Canvas & Composition

### Standard Canvas Size
- **ViewBox**: `0 0 400 300`
- **Width**: 400px
- **Height**: 300px
- **Aspect Ratio**: 4:3

### Composition Zones

```
+------------------------------------------+
|                                          |
|  SKY ZONE (y: 0-120)                    |
|  - Keep minimal or empty                 |
|                                          |
|------------------------------------------|
|                                          |
|  STRUCTURE ZONE (y: 120-240)            |
|  - Primary architectural elements        |
|  - Main focal point centered here        |
|                                          |
|------------------------------------------|
|  GROUND ZONE (y: 240-300)               |
|  - Ground plane, landscape hints         |
+------------------------------------------+
```

### Margin Guidelines
- **Left/Right margins**: Minimum 20-40px from edges
- **Top margin**: Structures typically start at y: 120-180
- **Bottom**: Ground line typically at y: 235-250

---

## SVG Structure Template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      /* Animation styles go here */
    </style>
    <!-- Optional gradients -->
    <linearGradient id="gradient-name" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(R,G,B);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(R,G,B);stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Ground plane (optional) -->
  <rect x="0" y="235" width="400" height="65" fill="rgb(168, 132, 98)" opacity="0.3"/>

  <g class="house-main">
    <!-- Primary structure elements -->

    <!-- Roof elements (use .accent class) -->
    <polygon points="..." fill="rgb(...)" class="accent"/>

    <!-- Main body -->
    <rect x="..." y="..." width="..." height="..." fill="rgb(...)"/>

    <!-- Windows group -->
    <g class="windows">
      <rect fill="rgb(212, 178, 112)" opacity="0.6"/>
      <!-- Window divisions -->
      <line stroke="rgb(55, 52, 50)" stroke-width="1"/>
    </g>

    <!-- Structural accents -->
    <line stroke="rgb(55, 52, 50)" stroke-width="2" class="line-draw"/>
  </g>

  <!-- Landscape hints (minimal) -->
  <circle fill="rgb(...)" opacity="0.3"/>
</svg>
```

---

## Animation Specifications

### Animation Types

The V2 style uses subtle, elegant CSS animations. Choose ONE animation per icon.

#### 1. Pulse Animation
```css
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
}
.accent { animation: pulse 4s ease-in-out infinite; }
```
**Use for**: General accent elements, roof highlights

#### 2. Breathe Animation
```css
@keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}
.house-main { animation: breathe 8s ease-in-out infinite; transform-origin: center bottom; }
```
**Use for**: Organic structures, Lautner-style houses

#### 3. Glow Animation
```css
@keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(212, 178, 112, 0.3)); }
    50% { filter: drop-shadow(0 0 8px rgba(212, 178, 112, 0.6)); }
}
.windows { animation: glow 5s ease-in-out infinite; }
```
**Use for**: Dramatic glass facades, evening ambiance

#### 4. Float Animation
```css
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
}
.house-main { animation: float 6s ease-in-out infinite; }
```
**Use for**: Cantilevered structures, floating elements

### Animation Guidelines
- **Duration**: 4-8 seconds for subtle effect
- **Easing**: Always `ease-in-out` for smooth loops
- **Iteration**: Always `infinite`
- **Subtlety**: Animations should enhance, not distract
- **One per icon**: Do not combine multiple animations

---

## Geometric Shapes Reference

### Rooflines

#### Flat Roof with Overhang
```svg
<rect x="20" y="160" width="270" height="8" fill="rgb(55, 52, 50)"/>
```

#### Angled/Butterfly Roof
```svg
<polygon
  points="40,190 200,175 200,185 40,195"
  fill="rgb(168, 132, 98)"
  class="accent"
/>
```

#### Curved/Dramatic Roof (Lautner-style)
```svg
<path
  d="M 40 200 Q 200 81 360 180 L 360 200 L 40 200 Z"
  fill="url(#roof-gradient)"
  class="accent"
/>
```

### Structural Elements

#### Main Body (Rectangular)
```svg
<rect x="60" y="170" width="280" height="70" fill="rgb(232, 218, 195)"/>
```

#### Angled Structure
```svg
<polygon
  points="60,200 340,185 350,240 50,240"
  fill="rgb(205, 188, 162)"
/>
```

#### Support Column (Organic)
```svg
<ellipse cx="330" cy="220" rx="8" ry="25" fill="rgb(55, 52, 50)"/>
```

### Windows

#### Horizontal Band
```svg
<rect x="80" y="180" width="72" height="25" fill="rgb(212, 178, 112)" opacity="0.8"/>
```

#### Circular Windows (Radial)
```svg
<circle cx="200" cy="139" r="8" fill="rgb(212, 178, 112)" opacity="0.7"/>
```

#### Window with Mullions
```svg
<g class="windows">
  <rect x="80" y="195" width="200" height="35" fill="rgb(212, 178, 112)" opacity="0.6"/>
  <line x1="120" y1="195" x2="120" y2="230" stroke="rgb(55, 52, 50)" stroke-width="1"/>
  <line x1="160" y1="195" x2="160" y2="230" stroke="rgb(55, 52, 50)" stroke-width="1"/>
</g>
```

### Landscape Elements (Minimal)

#### Ground Line
```svg
<line x1="20" y1="235" x2="380" y2="235" stroke="rgb(55, 52, 50)" stroke-width="1"/>
```

#### Ground Plane
```svg
<rect x="0" y="235" width="400" height="65" fill="rgb(168, 132, 98)" opacity="0.3"/>
```

#### Curved Hillside
```svg
<path d="M 0 180 Q 150 220 250 250 L 400 280 L 400 300 L 0 300 Z" fill="rgb(140, 155, 175)" opacity="0.4"/>
```

#### Abstract Vegetation (Optional, minimal)
```svg
<circle cx="370" cy="185" r="15" fill="rgb(168, 132, 98)" opacity="0.3"/>
```

---

## V1 vs V2 Key Differences

| Aspect | V1 (Avoid) | V2 (Target) |
|--------|------------|-------------|
| **Detail level** | High detail, cluttered | Simplified, essential shapes |
| **Color palette** | Inconsistent, muddy realistic | Unified, intentional palette |
| **Approach** | Literal representation | Geometric abstraction |
| **Colors per icon** | Many, variable | Maximum 5 from palette |
| **Landscape** | Trees, grass, distracting | Minimal hints, abstract |
| **Visual hierarchy** | Unclear at small sizes | One clear focal element |
| **Consistency** | Each icon different style | Unified visual grammar |

---

## Architectural Style Variations

### Prairie Style (FLW Michigan)
- Strong horizontal lines
- Geometric window bands
- Overhanging eaves
- Colors: Sand, Terracotta, Charcoal

### Usonian Style
- Flat roofs
- Clerestory windows
- L-shaped or grid compositions
- Colors: Cypress, Gold, Charcoal

### Organic Architecture (Lautner-style)
- Curved rooflines
- Dramatic cantilevers
- Integration with landscape
- Colors: Slate, Mahogany, Warm White

### Mid-Century Modern
- Butterfly roofs
- Floor-to-ceiling glass
- Minimalist geometry
- Colors: Warm White, Cypress, Slate

---

## Quality Checklist

Before finalizing any V2 style image, verify:

- [ ] **Canvas**: ViewBox is `0 0 400 300`
- [ ] **Background**: Pure white
- [ ] **Colors**: Maximum 5 from the official palette
- [ ] **Hierarchy**: One dominant signature element
- [ ] **Strokes**: Using standard weights (1-4px)
- [ ] **Animation**: Single, subtle animation applied
- [ ] **Negative space**: Icon has breathing room
- [ ] **60px test**: Recognizable at small size
- [ ] **Consistency**: Matches existing V2 collection style
- [ ] **Landscape**: Minimal, abstract (no detailed trees/grass)

---

## File Naming Convention

```
{subject-name}.svg
```

Examples:
- `palmer-house.svg`
- `lautner-house.svg`
- `chemosphere.svg`
- `architect-wright.svg`

---

## Appendix: Complete Color Reference

```css
:root {
    --terracotta: rgb(194, 114, 84);
    --terracotta-dark: rgb(156, 88, 64);
    --sand: rgb(232, 218, 195);
    --sand-dark: rgb(205, 188, 162);
    --slate: rgb(82, 90, 100);
    --slate-light: rgb(140, 155, 175);
    --cypress: rgb(168, 132, 98);
    --cypress-dark: rgb(138, 105, 75);
    --mahogany: rgb(120, 72, 56);
    --gold: rgb(212, 178, 112);
    --sky: rgb(195, 215, 232);
    --charcoal: rgb(55, 52, 50);
    --warm-white: rgb(252, 250, 247);
}
```

---

*Document Version: 1.0*
*Based on: FLW Michigan Icons Design System v2*
*Generated for: MCM Platform Asset Generation*
