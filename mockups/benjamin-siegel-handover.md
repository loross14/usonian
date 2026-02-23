# Agent Handover: Benjamin Siegel House Image Generation

**Status:** BLOCKED - xAI Grok API temporarily unavailable
**Date:** 2026-02-22
**Resume when:** xAI image API returns 200 status

---

## Mission

Generate 6 variations of the Benjamin Siegel House hero image in Arthur Heurtley watercolor style, then let the user select the best one for production.

---

## User Decisions (All Confirmed)

| Decision | Choice |
|----------|--------|
| **Style** | Arthur Heurtley watercolor (warm, loose, vignette to white) |
| **Style Scope** | Both styles available (not changing platform default) |
| **Variations** | 6 images ($0.12 total at $0.02/image) |
| **Output** | `/public/ai-images/hero/benjamin-siegel-house.jpg` |
| **Aspect Ratio** | 16:9 |
| **Architecture** | Subtle adaptation toward Prairie feel (keep limestone + arches, add warm colors) |
| **Motor Court** | Focus on building only, no fountain |
| **Execution** | Direct curl API call |

---

## Ready-to-Execute Command

Run this from `/Users/loganross/Desktop/eng/arcitecture/mcm-platform/`:

```bash
export XAI_API_KEY=$(grep XAI_API_KEY .env.local | cut -d'=' -f2) && \
curl -s -X POST "https://api.x.ai/v1/images/generations" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-2-image",
    "prompt": "Traditional architectural watercolor illustration of the Benjamin Siegel House, a three-story limestone mansion with subtle Prairie influence. Warm cream and buff-colored limestone facade with elegant arched windows, entry portico with classical columns, hipped roof with warm terracotta tiles. Adapted with organic Prairie feeling - horizontal emphasis in landscape, warm earth-tone palette with russet brown shadows, honey oak wood accents, soft sage green impressionistic foliage. Rendered in loose controlled watercolor technique with visible brushstrokes. 3/4 elevated perspective approximately 15 degrees above eye level, showing corner view of two facades. Soft warm morning light from upper left creating gentle highlights and cool gray-brown shadows. Vignette fading to pure white paper at all edges, building floating on white background, dissolved ground plane, impressionistic trees with soft lost edges. Focus on building architecture only. Warm intimate handcrafted watercolor painting feel.",
    "n": 6
  }' | tee /tmp/grok-response.json
```

---

## After API Call Succeeds

### 1. Parse the response
The response will contain an array of image URLs. Extract them:
```bash
cat /tmp/grok-response.json | jq -r '.data[].url'
```

### 2. Download all 6 images
```bash
cd /Users/loganross/Desktop/eng/arcitecture/mcm-platform/public/ai-images/hero/

# Download each URL (URLs are temporary - do immediately)
curl -o benjamin-siegel-house-1.jpg "[URL_1]"
curl -o benjamin-siegel-house-2.jpg "[URL_2]"
# ... through -6.jpg
```

### 3. Present to user for review
Show all 6 images to the user and ask which one they want as the production image.

### 4. Set production image
```bash
cp benjamin-siegel-house-[SELECTED].jpg benjamin-siegel-house.jpg
```

### 5. Clean up variations (optional)
```bash
rm benjamin-siegel-house-{1,2,3,4,5,6}.jpg
```

---

## Reference: Arthur Heurtley Target Style

**Source Image:** `/public/ai-images/hero/arthur-heurtley-summer-cottage.jpg`

### Key Visual Characteristics
- **Palette:** Warm russet (#8B6B5A), honey oak (#B88B5A), sage green (#A8B898)
- **Technique:** Loose controlled watercolor with visible brushwork
- **Edges:** Soft lost edges on foliage, crisp on architecture
- **Background:** Pure white paper vignette fade
- **Light:** Soft morning, upper left direction
- **Shadows:** Cool gray-brown, never pure black
- **Feel:** Warm, intimate, handcrafted

---

## Reference: Current Benjamin Siegel Mockup

**Current Image:** `/public/ai-images/hero/benjamin-siegel-house.jpg`

### Architectural Facts
- **Architect:** Albert Kahn (with Ernest Wilby), 1913-1915
- **Style:** Italian Renaissance Revival (to be subtly adapted toward Prairie)
- **Location:** 150 West Boston Blvd, Detroit, MI
- **Materials:** All-limestone construction
- **Features:** Arched windows, entry portico, hipped roof, wrought iron balconies

---

## Files Changed

| File | Status |
|------|--------|
| `/mockups/benjamin-siegel-style-transformation.md` | Created - contains full style guide and Grok prompt |
| `/mockups/benjamin-siegel-handover.md` | This file - handover document |
| `/public/ai-images/hero/benjamin-siegel-house.jpg` | TO BE REPLACED after generation |

---

## Troubleshooting

### API returns 503 "temporarily unavailable"
Wait and retry. This was the blocker on 2026-02-22.

### API returns 401 "unauthorized"
Check XAI_API_KEY in `.env.local` - may have expired.

### URLs in response expire
Grok returns temporary URLs. Download immediately after generation.

### Wrong aspect ratio
Add `"aspect_ratio": "16:9"` to the JSON payload (may not be supported by all models).

---

## Multi-Agent Context

This task was orchestrated using:
- **Multi-agent-orchestration skill** (from qodex-ai/ai-agent-skills)
- **Style Analyst Agent** - extracted Heurtley visual characteristics
- **Research Agent** - documented Siegel House architecture (found it's Albert Kahn, not Wright)
- **Prompt Engineer Agent** - created optimized prompts
- **Quality Review Agent** - validated deliverables

All agent outputs are preserved in `/mockups/benjamin-siegel-style-transformation.md`.

---

## Resume Instructions

1. Check API status: `curl -s https://api.x.ai/v1/models | head -20`
2. If 200 OK, run the command in "Ready-to-Execute Command" section
3. Download images immediately (URLs expire)
4. Present all 6 to user for selection
5. Replace production image with selected version
