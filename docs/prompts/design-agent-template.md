# Design Exploration Agent Prompt Template

## Overview

This template defines the prompt structure for agents participating in parallel design exploration. Each agent receives one reference and produces one original adaptation with documented learnings.

---

## Prompt Template

```markdown
## Design Exploration Agent

You are a design agent tasked with creating an original adaptation inspired by a reference image. Your goal is NOT to copy, but to understand the underlying principles and create something new in the same spirit.

### Your Reference

**Name:** {{REFERENCE_NAME}}
**Context:** {{HISTORICAL_CONTEXT}}
**Image URL:** {{IMAGE_URL}}

### Your Task

1. **Study the reference** - Analyze the image for patterns, colors, composition, and underlying design principles

2. **Create an original adaptation** - Generate {{OUTPUT_FORMAT}} code that:
   - Captures the ESSENCE of the style
   - Uses similar vocabulary (shapes, rhythms, proportions)
   - Is clearly original, not a copy
   - Works at the specified dimensions: {{DIMENSIONS}}

3. **Document your learnings** - Provide detailed analysis in three sections:

#### Pattern Analysis
- Identify recurring motifs and shapes
- Note symmetry types (bilateral, radial, translational)
- Describe the geometric vocabulary
- Document rhythm and repetition patterns

#### Color Extraction
- List primary colors with hex codes
- Identify accent colors
- Note color relationships (complementary, analogous, etc.)
- Describe how color creates hierarchy

#### Design Principles
- What makes this design work?
- What are the underlying rules or "grammar"?
- How does it achieve balance and harmony?
- What techniques can be reused in other contexts?

### Output Format

Return your response as a JSON object:

```json
{
  "design_name": "Your adaptation's name",
  "code": "Full {{OUTPUT_FORMAT}} code here",
  "learnings": {
    "pattern_analysis": "Detailed pattern analysis...",
    "color_extraction": {
      "palette": [
        { "name": "Primary Gold", "hex": "#D4A843" },
        { "name": "Accent Green", "hex": "#5B7C4A" }
      ],
      "notes": "Color relationship analysis..."
    },
    "design_principles": "Key principles extracted..."
  }
}
```

### Quality Criteria

Your adaptation will be evaluated on:

1. **Style Fidelity** - Does it feel like part of the same family?
2. **Originality** - Is it clearly your own creation?
3. **Technical Quality** - Is the code clean and well-structured?
4. **Learning Depth** - Are the documented learnings insightful and actionable?

### Constraints

- Output must be valid {{OUTPUT_FORMAT}}
- Dimensions: {{DIMENSIONS}}
- Do NOT include external dependencies
- Code must be self-contained
```

---

## Variable Substitutions

| Variable | Description | Example |
|----------|-------------|---------|
| `{{REFERENCE_NAME}}` | Name of the reference work | "Robie House Clerestory Window" |
| `{{HISTORICAL_CONTEXT}}` | Brief context about the reference | "Designed by FLW in 1910 for the Frederick C. Robie House" |
| `{{IMAGE_URL}}` | Direct URL to reference image | "https://example.com/robie.jpg" |
| `{{OUTPUT_FORMAT}}` | Code format for the adaptation | "SVG", "CSS", "HTML" |
| `{{DIMENSIONS}}` | Size constraints | "320x100 viewBox" |

---

## Theme-Specific Additions

### For FLW Stained Glass

Add to the prompt:

```markdown
### Style Guide: Frank Lloyd Wright Stained Glass

Key characteristics to capture:
- **Grammar of the Straight Line**: Geometric abstraction using only straight lines and angles
- **Horizontal Emphasis**: Strong horizontal bands reflecting Prairie School philosophy
- **Nature Abstraction**: Organic forms reduced to geometric essence
- **Lead Lines as Design**: Zinc caming is integral to the composition, not hidden
- **Layered Depth**: Multiple overlapping planes create visual depth
- **Earth Tones + Accents**: Amber, sage, brown base with iridescent highlights

Common motifs:
- Chevrons and arrows
- Wheat sheaf patterns
- Abstracted trees and plants
- Interlocking rectangles
- Diamond grids

Format: Transom window (wide, short rectangle)
```

### For Art Deco

Add to the prompt:

```markdown
### Style Guide: Art Deco

Key characteristics:
- **Sunburst/Fountain motifs**
- **Stepped/ziggurat forms**
- **Bold geometric shapes**
- **Metallic colors**: Gold, silver, bronze
- **Strong symmetry**
- **Luxury materials**: Chrome, lacquer, exotic woods
```

---

## Agent Coordination Notes

### Launching Multiple Agents

When launching N agents in parallel:

```javascript
// Pseudocode for parallel agent launch
const agents = references.map((ref, index) => ({
  prompt: fillTemplate(PROMPT_TEMPLATE, {
    REFERENCE_NAME: ref.name,
    HISTORICAL_CONTEXT: ref.context,
    IMAGE_URL: ref.url,
    OUTPUT_FORMAT: "SVG",
    DIMENSIONS: "320x100 viewBox"
  }),
  id: `design-agent-${index + 1}`
}));

// Launch all in single message with multiple Task tool calls
launchParallel(agents);
```

### Collecting Results

After all agents complete:

1. Parse JSON response from each agent
2. Extract `code` and `learnings`
3. Compile into HTML report
4. Generate color swatches from extracted palettes

---

## Example: Complete Filled Template

```markdown
## Design Exploration Agent

You are a design agent tasked with creating an original adaptation inspired by a reference image.

### Your Reference

**Name:** Tree of Life Window
**Context:** Designed by FLW for the Darwin D. Martin House in Buffalo, NY (1904). One of FLW's most celebrated art glass designs, featuring an abstracted tree motif.
**Image URL:** https://maclinstudio.com/tree-of-life.jpg

### Your Task

1. **Study the reference** - Analyze the image for patterns, colors, composition...

[Rest of template with SVG format and 320x100 dimensions]
```

---

## Quality Checklist

Before using this template, verify:

- [ ] All variables are properly substituted
- [ ] Theme-specific additions are included
- [ ] Dimensions match the intended output
- [ ] Output format is specified correctly
- [ ] Historical context is accurate
- [ ] Image URL is accessible
