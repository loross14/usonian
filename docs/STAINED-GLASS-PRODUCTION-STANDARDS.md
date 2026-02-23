# FLW Stained Glass Production Standards

**Production Manager Document**
**Version 1.0 | February 2026**

---

## Overview

This document establishes production-level quality standards for the coordinated design production effort across 4 design agents creating FLW-inspired stained glass transom variations.

### Design Assignments

| Agent | Design | Description |
|-------|--------|-------------|
| Agent 1 | Geometric Tulip Transom | Stylized tulip motifs with Art Deco geometry |
| Agent 2 | Martin Horizontal Transom | Darwin Martin House inspired horizontal bands |
| Agent 3 | Desert Saguaro Transom | Southwest desert landscape with cacti |
| Agent 4 | Celebration Balloons Transom | Coonley Playhouse inspired balloon forms |

---

## 1. SVG Technical Standards

### 1.1 Viewbox and Dimensions

```svg
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
```

| Property | Value | Notes |
|----------|-------|-------|
| Width | 320 units | Transom horizontal format |
| Height | 100 units | 3.2:1 aspect ratio |
| Viewbox | `0 0 320 100` | Required on all SVGs |
| xmlns | `http://www.w3.org/2000/svg` | Required for standalone SVG |

### 1.2 Lead Caming Simulation (Stroke Weights)

Authentic stained glass uses lead came (metal strips) to hold glass pieces. Simulate this with consistent stroke weights:

| Element | Stroke Width | Usage |
|---------|-------------|-------|
| **Outer Frame** | `3px` | Primary border around entire design |
| **Major Divisions** | `2px` | Primary structural lines |
| **Secondary Divisions** | `1.5px` | Panel subdivisions |
| **Detail Lines** | `1px` | Decorative detail work |
| **Fine Detail** | `0.75px` | Minimal detail, accent lines |

**Standard stroke color:** `#2C2C2C` (charcoal, simulating zinc came)
**Alternative:** `#3D3D3D` (lighter zinc) or `#1A1A1A` (dark lead)

```svg
<!-- CORRECT: Consistent caming hierarchy -->
<rect x="2" y="2" width="316" height="96" fill="none" stroke="#2C2C2C" stroke-width="3"/>
<line x1="80" y1="2" x2="80" y2="98" stroke="#2C2C2C" stroke-width="2"/>
<line x1="40" y1="50" x2="40" y2="72" stroke="#2C2C2C" stroke-width="1.5"/>
```

### 1.3 Color Format Requirements

All colors MUST use 6-digit hex codes for consistency and tooling compatibility.

#### Brand Color Palette (Primary)

```css
--v2-red: #BF0A30;    /* Usonian accent red */
--v2-navy: #002868;   /* Deep navy blue */
--v2-gold: #D4B270;   /* Warm gold */
--v2-black: #000000;  /* True black */
--v2-white: #FFFFFF;  /* True white */
```

#### FLW Stained Glass Palette (Extended)

| Category | Color | Hex | Usage |
|----------|-------|-----|-------|
| **Clear Glass** | Off-white | `#FAF6EF` | Clear/frosted glass |
| | Warm cream | `#F5F0E6` | Warm clear glass |
| | Pure white | `#FFFFFF` | Maximum light |
| **Blues** | Sky blue | `#A8D4D8` | Light water/sky |
| | Steel blue | `#7BA7BC` | Medium blue glass |
| | Deep blue | `#4A7F98` | Rich blue accent |
| | Navy | `#002868` | Brand navy |
| **Greens** | Forest | `#4A7C59` | Deep nature green |
| | Sage | `#3D6B4F` | Muted green |
| | Light green | `#D4E8D4` | Pale green glass |
| **Earth Tones** | Amber | `#C9A227` | Rich amber glass |
| | Gold | `#D4B270` | Brand gold |
| | Warm gold | `#C4A84B` | Classic FLW gold |
| | Terracotta | `#C2724E` | Southwest clay |
| | Brown | `#8B4513` | Wood/earth |
| | Dark brown | `#5C4033` | Trunk/deep earth |
| **Accents** | Red | `#BF0A30` | Brand red accent |
| | Coral | `#E63946` | Warm accent |
| | Orange | `#F4A261` | Sunset accent |
| | Teal | `#2A9D8F` | Cool accent |
| | Yellow | `#F5E6B8` | Pale yellow |
| | Lemon | `#E9C46A` | Bright yellow |

### 1.4 Gradient Definitions

When gradients are needed for light effects or depth, define them in a `<defs>` block:

```svg
<defs>
  <!-- Sky/water gradient -->
  <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#A8D4D8" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="#7BA7BC" stop-opacity="0.8"/>
  </linearGradient>

  <!-- Ambient light glow -->
  <radialGradient id="light-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>

  <!-- Gold highlight -->
  <linearGradient id="gold-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#F5E6B8"/>
    <stop offset="50%" stop-color="#D4B270"/>
    <stop offset="100%" stop-color="#C9A227"/>
  </linearGradient>
</defs>
```

### 1.5 Accessibility Considerations

#### Color Contrast
- All stroke lines must have minimum 3:1 contrast ratio against adjacent fills
- Text elements (if any) require 4.5:1 contrast ratio
- Avoid pure red/green combinations for colorblind users

#### Semantic Markup
```svg
<!-- Add title and desc for screen readers -->
<svg viewBox="0 0 320 100" role="img" aria-labelledby="title desc">
  <title id="title">Geometric Tulip Transom</title>
  <desc id="desc">A Frank Lloyd Wright inspired stained glass design featuring stylized tulip motifs in warm amber and green tones</desc>
  <!-- Design content -->
</svg>
```

#### Focus States (when interactive)
```css
.stained-glass-cta:focus-visible {
  outline: 2px solid var(--v2-red);
  outline-offset: 4px;
}
```

---

## 2. Animation Guidelines (CSS)

### 2.1 Design System Integration

Reference the project's existing animation tokens from `/src/styles/tokens.css`:

```css
/* Timing functions */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Durations */
--duration-instant: 0.08s;
--duration-fast: 0.2s;
--duration-normal: 0.4s;
--duration-slow: 0.6s;
--duration-dramatic: 0.9s;
```

### 2.2 Hover Effects (Subtle)

#### Glow Effect
```css
@keyframes glass-glow {
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
  }
  50% {
    filter: brightness(1.05) drop-shadow(0 0 8px rgba(212, 178, 112, 0.3));
  }
}

.stained-glass-cta:hover {
  animation: glass-glow 2s ease-in-out infinite;
}
```

#### Subtle Lift
```css
.stained-glass-cta {
  transition: transform var(--duration-fast) var(--ease-spring),
              filter var(--duration-fast) var(--ease-out);
}

.stained-glass-cta:hover {
  transform: translateY(-2px);
  filter: brightness(1.02);
}
```

### 2.3 Ambient Animations (Shimmer, Light Play)

#### Light Shimmer
```css
@keyframes light-shimmer {
  0% {
    opacity: 0.4;
    transform: translateX(-100%);
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.4;
    transform: translateX(100%);
  }
}

.stained-glass-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: light-shimmer 8s ease-in-out infinite;
  pointer-events: none;
}
```

#### Glass Panel Pulse
```css
@keyframes panel-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.92;
  }
}

.glass-panel-animated {
  animation: panel-pulse 6s ease-in-out infinite;
}
```

#### Color Shift (Time of Day)
```css
@keyframes daylight-shift {
  0%, 100% {
    filter: hue-rotate(0deg) saturate(1);
  }
  25% {
    filter: hue-rotate(-5deg) saturate(1.1);
  }
  75% {
    filter: hue-rotate(5deg) saturate(0.95);
  }
}

.stained-glass-cta.ambient {
  animation: daylight-shift 20s ease-in-out infinite;
}
```

### 2.4 Performance Considerations

#### DO:
- Use `transform` and `opacity` for animations (GPU accelerated)
- Use `will-change` sparingly and only when needed
- Keep animations under 60fps (test on low-end devices)
- Use `animation-play-state: paused` when off-screen

#### DON'T:
- Animate `width`, `height`, `top`, `left` (causes reflow)
- Use complex `filter` animations on large elements
- Run multiple heavy animations simultaneously
- Forget to test on mobile devices

```css
/* Performance-optimized animation */
.stained-glass-cta {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
}

/* Pause when not visible */
.stained-glass-cta:not(:hover):not(:focus) {
  animation-play-state: paused;
}
```

### 2.5 Reduced Motion Fallbacks

**REQUIRED:** All animated designs must include reduced motion fallbacks.

```css
@media (prefers-reduced-motion: reduce) {
  .stained-glass-cta,
  .stained-glass-cta::after,
  .glass-panel-animated {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }

  .stained-glass-cta:hover {
    transform: none;
    filter: brightness(1.02); /* Keep subtle feedback */
  }
}
```

---

## 3. Variation Framework

For each of the 4 designs, agents must create 4 variations:

### 3.1 Variation A: Refined Original

**Objective:** Polish the existing design to production quality.

**Checklist:**
- [ ] Clean up any rough geometry (perfect alignment)
- [ ] Ensure consistent stroke weights per hierarchy
- [ ] Verify color hex codes match palette
- [ ] Add proper accessibility attributes
- [ ] Optimize SVG (remove unnecessary groups, decimal precision)
- [ ] Add descriptive comments for major sections

### 3.2 Variation B: Color Palette Variation

**Objective:** Create alternate mood/time of day version.

**Options:**

| Mood | Description | Key Colors |
|------|-------------|------------|
| **Dawn** | Soft pinks, pale oranges, light blues | `#FFB5BA`, `#FFDAB9`, `#B0E0E6` |
| **Midday** | High contrast, vivid saturation | Standard palette, +10% saturation |
| **Dusk** | Warm oranges, deep purples, rich golds | `#FF6B35`, `#7B4B94`, `#DAA520` |
| **Night** | Deep blues, silver, cool moonlight | `#1E3A5F`, `#C0C0C0`, `#2C3E50` |
| **Monochrome** | Grayscale with single accent | `#F5F5F5`, `#9CA3AF`, `#D4B270` |
| **Earth** | Warm terracotta, sage, natural | `#C2724E`, `#87856A`, `#D4A574` |

**Requirements:**
- Maintain same geometry as Variation A
- Change only fill colors (keep stroke colors consistent)
- Document the mood/theme in comments

### 3.3 Variation C: Density Variation

**Objective:** Create more or less detailed version.

**High Density (More Detail):**
- Add additional geometric subdivisions
- Include more decorative accent elements
- Add texture patterns within panels
- Increase complexity of central motif

**Low Density (Less Detail):**
- Simplify to essential forms only
- Remove decorative accents
- Merge small panels into larger ones
- Create bold, minimal interpretation

**Requirements:**
- Maintain recognizable design intent
- Keep same overall proportions
- Document whether high or low density

### 3.4 Variation D: Animated Version

**Objective:** Production-ready animated CTA component.

**Required Animations:**
1. **Entrance Animation** - How the design appears on load
2. **Idle/Ambient Animation** - Subtle continuous motion
3. **Hover Animation** - Response to mouse interaction
4. **Focus Animation** - Keyboard navigation feedback

**Deliverable Structure:**
```html
<!-- Component structure -->
<div class="stained-glass-cta stained-glass-cta--tulip">
  <svg viewBox="0 0 320 100" role="img" aria-labelledby="tulip-title">
    <title id="tulip-title">Geometric Tulip Design</title>
    <!-- SVG content with animation-ready class names -->
  </svg>
  <style>
    /* Scoped animation CSS */
  </style>
</div>
```

---

## 4. Production Checklist

### 4.1 SVG Quality Checklist

#### Structure
- [ ] Correct viewBox: `0 0 320 100`
- [ ] xmlns attribute present
- [ ] `<title>` and `<desc>` for accessibility
- [ ] `role="img"` and aria-labelledby

#### Geometry
- [ ] All coordinates use max 2 decimal places
- [ ] No overlapping paths (z-order correct)
- [ ] Consistent stroke alignment (inside/outside/center)
- [ ] Paths closed properly (no gaps)

#### Strokes
- [ ] Outer frame: 3px stroke
- [ ] Major divisions: 2px stroke
- [ ] Secondary divisions: 1.5px stroke
- [ ] Detail lines: 1px stroke
- [ ] All strokes use `#2C2C2C` or approved alternative

#### Colors
- [ ] All fills use 6-digit hex codes
- [ ] Colors from approved palette only
- [ ] No magic numbers (document any custom colors)
- [ ] Minimum 3:1 contrast on strokes

#### Optimization
- [ ] Remove empty groups
- [ ] Combine redundant paths
- [ ] Remove editor metadata
- [ ] File size under 10KB (typical)

### 4.2 Animation Quality Checklist

- [ ] Uses design system timing tokens
- [ ] GPU-accelerated properties only
- [ ] Reduced motion fallback included
- [ ] No layout thrashing (transform/opacity only)
- [ ] Animation loops smoothly (no jumps)
- [ ] Hover state feels responsive (<200ms)
- [ ] Focus state clearly visible

### 4.3 Code Quality Checklist

- [ ] Descriptive class names (BEM preferred)
- [ ] Comments for complex sections
- [ ] Consistent indentation
- [ ] No inline styles (use classes)
- [ ] Valid HTML/SVG/CSS

---

## 5. CSS Template

### 5.1 Base Component Styles

```css
/* ===========================================
 * STAINED GLASS CTA COMPONENT
 * Production styles for FLW-inspired designs
 * =========================================== */

/* Container */
.stained-glass-cta {
  position: relative;
  display: block;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 320 / 100;
  background: #FFFFFF;
  border: 1px solid var(--v2-black);
  overflow: hidden;
  cursor: pointer;

  /* Performance optimization */
  will-change: transform, filter;
  transform: translateZ(0);

  /* Smooth transitions */
  transition:
    transform var(--duration-fast) var(--ease-spring),
    filter var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

/* SVG fills container */
.stained-glass-cta svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ===========================================
 * HOVER STATES
 * =========================================== */

/* Subtle lift and glow */
.stained-glass-cta:hover {
  transform: translateY(-3px);
  filter: brightness(1.03);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Diagonal hover (V2 style) */
.stained-glass-cta--diagonal:hover {
  transform: translateX(4px) translateY(-4px);
  box-shadow: var(--shadow-hover);
}

/* ===========================================
 * FOCUS STATES
 * =========================================== */

.stained-glass-cta:focus {
  outline: none;
}

.stained-glass-cta:focus-visible {
  outline: 2px solid var(--v2-red);
  outline-offset: 4px;
}

/* ===========================================
 * ANIMATION KEYFRAMES
 * =========================================== */

/* Entrance: Fade and scale in */
@keyframes glass-entrance {
  from {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Ambient: Subtle light shimmer */
@keyframes glass-shimmer {
  0%, 100% {
    background-position: -100% 0;
  }
  50% {
    background-position: 200% 0;
  }
}

/* Ambient: Gentle glow pulse */
@keyframes glass-glow-pulse {
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
  }
  50% {
    filter: brightness(1.02) drop-shadow(0 0 12px rgba(212, 178, 112, 0.2));
  }
}

/* Hover: Quick brightness boost */
@keyframes glass-hover-flash {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.08);
  }
  100% {
    filter: brightness(1.03);
  }
}

/* ===========================================
 * ANIMATION CLASSES
 * =========================================== */

/* Apply entrance animation */
.stained-glass-cta--animate-in {
  animation: glass-entrance var(--duration-slow) var(--ease-spring) forwards;
}

/* Apply ambient shimmer */
.stained-glass-cta--shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 75%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: glass-shimmer 12s ease-in-out infinite;
  pointer-events: none;
}

/* Apply ambient glow */
.stained-glass-cta--glow {
  animation: glass-glow-pulse 8s ease-in-out infinite;
}

/* ===========================================
 * RESPONSIVE BEHAVIOR
 * =========================================== */

/* Tablet */
@media (max-width: 768px) {
  .stained-glass-cta {
    max-width: 100%;
  }
}

/* Mobile - disable complex hover effects */
@media (max-width: 480px) {
  .stained-glass-cta:hover {
    transform: none;
    box-shadow: none;
  }
}

/* Touch devices */
@media (hover: none) {
  .stained-glass-cta:hover {
    transform: none;
  }

  .stained-glass-cta:active {
    transform: scale(0.99);
    filter: brightness(1.05);
  }
}

/* ===========================================
 * REDUCED MOTION
 * =========================================== */

@media (prefers-reduced-motion: reduce) {
  .stained-glass-cta {
    transition-duration: 0.01ms !important;
    animation: none !important;
  }

  .stained-glass-cta--shimmer::after {
    animation: none !important;
    display: none;
  }

  .stained-glass-cta--glow {
    animation: none !important;
  }

  .stained-glass-cta:hover {
    transform: none;
    filter: brightness(1.02);
  }
}

/* ===========================================
 * DESIGN VARIANTS (Apply to specific designs)
 * =========================================== */

/* Tulip design specific overrides */
.stained-glass-cta--tulip {
  /* Custom properties for this design */
}

/* Martin Horizontal specific overrides */
.stained-glass-cta--martin {
  /* Custom properties for this design */
}

/* Desert Saguaro specific overrides */
.stained-glass-cta--saguaro {
  /* Custom properties for this design */
}

/* Celebration Balloons specific overrides */
.stained-glass-cta--balloons {
  /* Custom properties for this design */
}
```

### 5.2 SVG Internal Animation (for Variation D)

```svg
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Inline SVG animations for self-contained component */

    /* Panel shimmer effect */
    .glass-panel {
      transition: opacity 0.3s ease;
    }

    .glass-panel:hover {
      opacity: 0.9;
    }

    /* Accent element pulse */
    @keyframes accent-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }

    .accent-element {
      animation: accent-pulse 4s ease-in-out infinite;
      transform-origin: center;
      transform-box: fill-box;
    }

    /* Staggered panel fade */
    .panel-1 { animation-delay: 0s; }
    .panel-2 { animation-delay: 0.5s; }
    .panel-3 { animation-delay: 1s; }
    .panel-4 { animation-delay: 1.5s; }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .glass-panel,
      .accent-element {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>

  <!-- SVG content with animation classes applied -->
  <rect class="glass-panel panel-1" x="4" y="4" width="74" height="92" fill="#FAF6EF"/>
  <rect class="glass-panel panel-2" x="82" y="4" width="74" height="92" fill="#A8D4D8"/>
  <rect class="glass-panel panel-3" x="164" y="4" width="74" height="92" fill="#A8D4D8"/>
  <rect class="glass-panel panel-4" x="242" y="4" width="74" height="92" fill="#FAF6EF"/>

  <circle class="accent-element" cx="160" cy="50" r="8" fill="#D4B270"/>
</svg>
```

---

## 6. File Naming Convention

```
stained-glass-{design}-{variation}.svg
stained-glass-{design}-{variation}.css (for animated versions)
```

**Examples:**
- `stained-glass-tulip-a-refined.svg`
- `stained-glass-tulip-b-dusk.svg`
- `stained-glass-tulip-c-minimal.svg`
- `stained-glass-tulip-d-animated.svg`
- `stained-glass-tulip-d-animated.css`

---

## 7. Quality Assurance

### Browser Testing

Test all designs in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome Android

### Performance Testing

- Lighthouse performance score > 90
- No layout shifts during animation
- Smooth 60fps animations
- Total SVG size < 15KB per design

### Accessibility Testing

- WAVE tool: 0 errors
- axe DevTools: 0 violations
- Keyboard navigation works
- Screen reader announces title/desc

---

## 8. Delivery Format

Each agent should deliver:

```
/agent-{n}-{design}/
  ├── variation-a-refined.svg
  ├── variation-b-{mood}.svg
  ├── variation-c-{density}.svg
  ├── variation-d-animated.svg
  ├── variation-d-animated.css
  └── NOTES.md (design decisions, learnings)
```

---

## Appendix: Quick Reference

### Stroke Weight Hierarchy
| Level | Width | Usage |
|-------|-------|-------|
| Frame | 3px | Outer border |
| Primary | 2px | Major divisions |
| Secondary | 1.5px | Subdivisions |
| Detail | 1px | Fine lines |
| Accent | 0.75px | Minimal detail |

### Core Colors
| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#2C2C2C` | All strokes |
| Off-white | `#FAF6EF` | Clear glass |
| Gold | `#D4B270` | Accent |
| Red | `#BF0A30` | Accent |
| Navy | `#002868` | Accent |

### Animation Timing
| Type | Duration | Easing |
|------|----------|--------|
| Hover | 0.2s | spring |
| Entrance | 0.6s | spring |
| Ambient | 6-12s | ease-in-out |

---

*Document prepared by Production Design Manager*
*Last updated: February 2026*
