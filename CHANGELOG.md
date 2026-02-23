# Changelog

## 2026-02-23 - Universal SiteHeader Component & Hero Redesign

### New Components

#### `SiteHeader` (`/src/components/layout/SiteHeader.tsx`)
A universal header component used across all pages with a 3-column layout:
- **Left**: Logo linking to home
- **Center**: Breadcrumb navigation with clickable slashes between segments
- **Right**: Animated American flag SVG with subtitle "THE ARCHIVE OF AMERICAN ARCHITECTURE."

**Usage:**
```tsx
// Auto-generate breadcrumbs from URL pathname
<SiteHeader title="Archive" />

// Or provide custom breadcrumbs
<SiteHeader
  breadcrumbs={[
    { label: "USONIAN", href: "/" },
    { label: "HOMES", href: "/homes" },
    { label: "PROPERTY NAME" },
  ]}
/>
```

#### `B2Bomber` (`/src/components/ui/B2Bomber.tsx`)
Mouse-following B-2 stealth bomber animation component. Currently disabled but available for future use.

### Updated Pages

All pages now use the unified `SiteHeader` component:
- `/homes` - Archive listing page
- `/homes/[slug]` - Individual property detail pages
- `/architects` - Architects directory
- `/architects/[slug]` - Individual architect detail pages

### CSS Additions (`/src/app/globals.css`)

New CSS classes for the site header system:
- `.site-header-grid` - 3-column responsive grid layout
- `.site-breadcrumb` - Breadcrumb navigation styling with clickable slashes
- `.site-header-flag` - Container for animated flag SVG
- `.site-header-subtitle` - Subtitle text styling

Property card improvements:
- `.property-card-title` - Fixed min-height (2 lines) with line-clamp truncation
- `.property-card-location` - Fixed min-height for consistent alignment
- `.property-card-price` - Smaller font size to fit on single line with ellipsis

### Flag SVG Features
- Animated waving effect
- 50 five-pointed stars (replaced circles)
- Firework explosion animation (left side)
- Optional B-2 stealth bomber animation (right side, currently disabled)

### Property Card Standardization
- All cards now align consistently regardless of title length
- Prices always include explanatory text ("Listed for", "Sold for", "Last sold for", "Price unavailable")
- Font sizes adjusted to prevent text overflow
