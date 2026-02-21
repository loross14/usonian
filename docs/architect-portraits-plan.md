# Architect Portrait/Spotlight Image System

## Overview

This document outlines the plan for creating geometric portrait illustrations of Taliesin Fellowship architects for use in the Usonian MVP heroes. These portraits will follow the V2 style from the FLW Design System, featuring abstracted, geometric silhouettes on clean white backgrounds.

---

## Design System Reference

### V2 Style Principles (from FLW Design Guide)

1. **Abstraction Over Literalism** - Capture the essence through simplified geometric forms rather than detailed representations
2. **Geometric Purity** - Honor Wright's design language: hexagons, triangles, bold horizontal lines
3. **Chromatic Restraint** - Maximum 5 colors per icon from the unified palette
4. **Clean White Background** - Consistent `white` or `rgb(252, 250, 247)` warm-white base

### Color Palette

| Color Name | RGB Value | Usage |
|------------|-----------|-------|
| Terracotta | `rgb(194, 114, 84)` | Primary accent, highlights |
| Terracotta Dark | `rgb(156, 88, 64)` | Shadows, depth |
| Cypress | `rgb(168, 132, 98)` | Primary structure color |
| Cypress Dark | `rgb(138, 105, 75)` | Structure shadows |
| Charcoal | `rgb(55, 52, 50)` | Lines, details, outlines |
| Gold | `rgb(212, 178, 112)` | Accent elements, glasses |
| Slate | `rgb(82, 90, 100)` | Secondary elements |
| Sand | `rgb(232, 218, 195)` | Subtle backgrounds |

---

## Architects Requiring Portraits

### Tier 1: Primary Architects (High Property Count)

| Priority | Architect | Properties | Signature Building | Portrait Concept |
|----------|-----------|------------|-------------------|------------------|
| 1 | **John Lautner** | 10 | Chemosphere | Angular face with octagonal framing, Chemosphere silhouette integrated |
| 2 | **E. Fay Jones** | 8 | Thorncrown Chapel | Profile with chapel's glass spires as background pattern |
| 3 | **Alden B. Dow** | 8 | Dow Home & Studio | Face composed of interlocking geometric blocks |
| 4 | **Edgar Tafel** | 3 | First Church NYC | Classic geometric portrait with drafting tools |
| 5 | **Arthur Dyson** | 3 | Various residences | Dynamic angular composition reflecting organic forms |
| 6 | **Eric Lloyd Wright** | 3 | Malibu residences | Profile with strong horizontal lines (prairie influence) |

### Tier 2: Secondary Architects (2 Properties)

| Priority | Architect | Properties | Portrait Concept |
|----------|-----------|------------|------------------|
| 7 | Paolo Soleri | 2 | Dome/arcology forms integrated into composition |
| 8 | William Wesley Peters | 2 | Strong geometric lines, Taliesin connection |
| 9 | Aaron Green | 2 | West Coast organic style |
| 10 | Cornelia Brierly | 2 | First woman in Fellowship - distinctive angular portrait |
| 11 | Elizabeth Wright Ingraham | 2 | Wright family lineage reference |
| 12 | John Rattenbury | 2 | Minimal geometric portrait |

### Tier 3: Single Property Architects

| Architect | Properties | Portrait Concept |
|-----------|------------|------------------|
| Vernon Swaback | 1 | Youngest apprentice - youthful geometric form |
| Shao Fang Sheng | 1 | Chinese influence, geometric East-West fusion |
| Allan Gelbin | 1 | Simple Connecticut-style portrait |
| Robert Miller Green | 1 | Southern organic architecture style |

---

## File Naming Convention

```
/public/architect-portraits/
├── [architect-slug]-portrait.svg          # Main portrait (400x400)
├── [architect-slug]-portrait-wide.svg     # Hero banner version (800x400)
└── [architect-slug]-portrait-small.svg    # Thumbnail version (200x200)
```

### Examples:
- `john-lautner-portrait.svg`
- `john-lautner-portrait-wide.svg`
- `e-fay-jones-portrait.svg`
- `alden-b-dow-portrait.svg`

---

## SVG Structure Standards

### Base Template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.85; }
      }
      .accent { animation: pulse 4s ease-in-out infinite; }
    </style>
    <!-- Gradients for depth -->
    <linearGradient id="face-grad-[architect]" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(168, 132, 98);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(138, 105, 75);stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="400" fill="white"/>

  <!-- Portrait Composition Group -->
  <g class="portrait-main">
    <!-- Face geometric base -->
    <!-- Architectural integration elements -->
    <!-- Detail accents -->
  </g>

  <!-- Signature building silhouette (optional background) -->
  <g class="building-accent" opacity="0.15">
    <!-- Simplified building form -->
  </g>
</svg>
```

---

## Sample SVG: John Lautner Portrait

This sample demonstrates the geometric abstraction approach, integrating Lautner's signature Chemosphere with a stylized portrait.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.85; }
      }
      .accent { animation: pulse 4s ease-in-out infinite; }
    </style>
    <linearGradient id="face-grad-lautner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(168, 132, 98);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(138, 105, 75);stop-opacity:1" />
    </linearGradient>
    <linearGradient id="hair-grad-lautner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(82, 90, 100);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(55, 52, 50);stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="400" fill="white"/>

  <!-- Subtle Chemosphere silhouette in background -->
  <g class="building-accent" opacity="0.1">
    <!-- Octagonal form representing Chemosphere -->
    <polygon
      points="200,40 260,70 280,130 260,190 200,220 140,190 120,130 140,70"
      fill="rgb(168, 132, 98)"
    />
    <!-- Support column hint -->
    <rect x="190" y="220" width="20" height="60" fill="rgb(168, 132, 98)"/>
  </g>

  <!-- Portrait Composition -->
  <g class="portrait-main">

    <!-- Face - Geometric hexagonal base -->
    <polygon
      points="200,120 260,150 260,230 200,280 140,230 140,150"
      fill="url(#face-grad-lautner)"
      stroke="rgb(55, 52, 50)"
      stroke-width="2"
    />

    <!-- Hair - Angular geometric form -->
    <polygon
      points="140,150 200,100 260,150 250,130 200,90 150,130"
      fill="url(#hair-grad-lautner)"
    />

    <!-- Eyes - Bold geometric rectangles (Lautner's intense gaze) -->
    <g class="eyes">
      <rect x="155" y="170" width="30" height="12" fill="rgb(55, 52, 50)" rx="2"/>
      <rect x="215" y="170" width="30" height="12" fill="rgb(55, 52, 50)" rx="2"/>
      <!-- Eye gleam -->
      <rect x="158" y="172" width="8" height="4" fill="rgb(212, 178, 112)" class="accent"/>
      <rect x="218" y="172" width="8" height="4" fill="rgb(212, 178, 112)" class="accent"/>
    </g>

    <!-- Nose - Simple angular line -->
    <polygon
      points="200,185 210,220 190,220"
      fill="rgb(138, 105, 75)"
    />

    <!-- Glasses - Distinctive geometric frames -->
    <g class="glasses" fill="none" stroke="rgb(55, 52, 50)" stroke-width="3">
      <rect x="148" y="165" width="42" height="22" rx="3"/>
      <rect x="210" y="165" width="42" height="22" rx="3"/>
      <line x1="190" y1="176" x2="210" y2="176"/>
      <line x1="148" y1="176" x2="135" y2="170"/>
      <line x1="252" y1="176" x2="265" y2="170"/>
    </g>

    <!-- Mouth - Minimal horizontal line -->
    <line x1="175" y1="250" x2="225" y2="250" stroke="rgb(55, 52, 50)" stroke-width="3"/>

    <!-- Collar/Shirt - Architectural angular form -->
    <polygon
      points="140,280 200,320 260,280 260,350 140,350"
      fill="rgb(82, 90, 100)"
    />
    <polygon
      points="175,280 200,310 225,280"
      fill="white"
    />

  </g>

  <!-- Architect name baseline -->
  <line x1="100" y1="370" x2="300" y2="370" stroke="rgb(55, 52, 50)" stroke-width="1"/>

</svg>
```

---

## Composition Guidelines

### Portrait Elements

1. **Face Shape**: Use hexagons, octagons, or angular forms - never circles or ovals
2. **Eyes**: Rectangular or triangular, with gold accent highlights
3. **Glasses** (when applicable): Bold geometric frames matching architect's era
4. **Hair**: Angular blocks suggesting hair, not realistic strands
5. **Clothing**: Simple geometric collar/shoulders, architectural angles

### Building Integration

Each portrait should subtly incorporate the architect's signature building:

| Architect | Building Integration |
|-----------|---------------------|
| Lautner | Octagonal Chemosphere framing |
| E. Fay Jones | Thorncrown's vertical glass spires as background |
| Alden B. Dow | Interlocking cube pattern |
| Soleri | Dome/sphere elements |
| Peters | Marin County curves |
| Brierly | Usonian horizontal lines |

### Sizing Specifications

| Format | Dimensions | Use Case |
|--------|------------|----------|
| Standard | 400x400 | Property detail heroes, architect pages |
| Wide | 800x400 | Homepage hero, feature banners |
| Small | 200x200 | Navigation thumbnails, cards |

---

## Implementation Phases

### Phase 1: MVP (6 portraits)
- John Lautner
- E. Fay Jones
- Alden B. Dow
- Edgar Tafel
- Arthur Dyson
- Eric Lloyd Wright

### Phase 2: Extended Set (6 portraits)
- Paolo Soleri
- William Wesley Peters
- Aaron Green
- Cornelia Brierly
- Elizabeth Wright Ingraham
- John Rattenbury

### Phase 3: Complete Collection (4 portraits)
- Vernon Swaback
- Shao Fang Sheng
- Allan Gelbin
- Robert Miller Green

---

## Usage in Components

### Homepage Hero
```jsx
<HeroSection
  architect={architect}
  portraitSrc={`/architect-portraits/${architect.slug}-portrait-wide.svg`}
/>
```

### Property Detail Hero
```jsx
<PropertyHero
  property={property}
  architectPortrait={`/architect-portraits/${property.architect.slug}-portrait.svg`}
/>
```

### Architect Page Header
```jsx
<ArchitectHeader
  architect={architect}
  portrait={`/architect-portraits/${architect.slug}-portrait.svg`}
  building={`/generated-houses/${architect.signatureBuilding}.svg`}
/>
```

---

## Quality Checklist

Before finalizing each portrait:

- [ ] Uses only colors from V2 palette
- [ ] Maximum 5 colors used
- [ ] White background (`white` or `rgb(252, 250, 247)`)
- [ ] Includes subtle pulse animation on accent elements
- [ ] Building integration is recognizable but not distracting
- [ ] Works at all three size variants
- [ ] SVG is optimized (no unnecessary paths)
- [ ] Consistent stroke widths (1, 2, or 3px)
- [ ] Follows naming convention

---

## Notes

- All portraits should feel cohesive as a collection, similar to how the house SVGs work together
- The geometric abstraction should be recognizable as "a person" but not attempt photorealism
- Building elements should be Easter eggs for architecture enthusiasts, not dominant features
- Consider creating a unified "framing element" that appears in all portraits (like a subtle Wright-style border pattern)
