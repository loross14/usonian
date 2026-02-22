# Designer Agent Brief

You're doing a full site refresh. Go wild with the design - but don't break the data layer.

---

## HARD REQUIREMENTS: Data Contract

These fields exist in the database and must have somewhere to live in the UI. You can display them however you want, but they need to be displayable.

### Properties (294 in database)
```
home_name          # The title
year_built         # 4-digit year
parsed_city        # City
parsed_state       # 2-letter state code
status             # One of: active, sold, archived, museum, donated
last_sale_price    # Number or null (show "Price Upon Request" when null)
architect_id       # Links to an architect
```

**Optional fields** (show if present, hide if null):
```
square_footage, bedrooms, bathrooms, preservation_status,
description, significance, curator_notes, client_owner, current_owner
```

### Architects (25 in database)
```
name               # Full name
birth_year         # 4-digit year
death_year         # Year or null (means still living)
fellowship_years   # Taliesin fellowship "YYYY-YYYY" or null
property_count     # Calculated from properties
```

**Optional:** biography, birthplace, wikipedia_url

### Status Types (5 total - need distinct visual treatment)
| Status | Meaning |
|--------|---------|
| `active` | Currently for sale |
| `sold` | Recently sold |
| `archived` | Off market, not actively tracked |
| `museum` | Now a public museum |
| `donated` | Donated to an institution |

---

## SOFT REQUIREMENTS: Design Philosophy

### The Vibe
This is a brutalist, terminal-inspired platform celebrating mid-century modern architecture. Think: Steve Jobs minimalism meets Frank Lloyd Wright's prairie aesthetic.

**Constraints as features:**
- Monospace typography (JetBrains Mono)
- Limited color palette (red, navy, gold, black, white)
- Harsh borders, no rounded corners
- Uppercase headings
- Dense information display

### FLW Heritage
Prairie lines, horizontal emphasis, earth tones for illustrations. The Taliesin Fellowship is significant - architects who studied under Wright get a special indicator (star icon, badge, whatever feels right).

### Information Architecture
- Properties are the core content
- Architects provide context and credibility
- Filtering helps users find what they want (by status, architect, state)
- Detail pages go deep, listing pages go wide

### Interactions Worth Preserving
1. **Property alerts** - Users can sign up to be notified when off-market properties come available. Needs some kind of email capture.
2. **Newsletter** - Site-wide email signup for updates.
3. **Filtering** - Status, architect, and state filters on property listings.

### What Can Change
- Layout, grid systems, card designs
- Animation styles
- Section ordering
- Visual hierarchy
- How data is grouped or displayed
- Navigation patterns
- Typography scale
- Decorative elements

### What Shouldn't Change
- The data fields (they come from the database)
- Route structure: `/homes/[slug]`, `/architects/[slug]`
- The 5 status types and their meanings
- The concept of Taliesin fellowship as a distinction

---

## Quick Reference: Current Routes

```
/                    → Homepage
/homes               → All properties
/homes/[slug]        → Property detail
/architects          → All architects
/architects/[slug]   → Architect detail
```

---

## TL;DR

1. Don't lose any data fields - they all need a home somewhere
2. Keep the 5 status types visually distinct
3. Preserve property alerts + newsletter + filtering concepts
4. Everything else is fair game - make it beautiful
